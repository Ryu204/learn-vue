import { ref } from 'vue'
import type { Ref } from 'vue'
import {
    defaultConfig,
    createWeb3Modal,
} from '@web3modal/ethers'
import { BrowserProvider, JsonRpcProvider, Contract } from 'ethers'
import type { Web3Modal } from '@web3modal/ethers'
import type { WalletInfo } from './walletInfo'
import abi from './abi'

const jsonRpcUrl = `https://eth-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`

export class Provider {
    isLoggedIn = ref(false)
    isClaiming = ref(false)
    isLoggingIn = ref(false)
    isAddingToken = ref(false)

    private _modal: Web3Modal
    private _address: string | undefined
    private _walletInfo: Ref<WalletInfo> | undefined
    private _tokenContract: Contract | undefined
    private _vestingContract: Contract

    constructor() {
        try {
            this._modal = createModal()
        } catch (e) {
            throw new Error(`Oops, an error happened: ${e}`)
        }
        this._addCallbacks()
        this._vestingContract = createVestingContract().contract
    }

    async tryLogIn() {
        this.isLoggingIn.value = true
        await this._modal.open({
            view: 'Connect'
        })
    }

    async tryLogOut() {
        await this._modal.open({
            view: 'Account'
        })
        // I would have used this thing if it actually emits DISCONNECT events :V
        // await this._modal.disconnect()
    }

    async claim() {
        try {
            this.isClaiming.value = true
            await this._vestingContract.claim()
            await this._fetchTokenStatus()
        } catch (e) {
            this.isClaiming.value = false
            return `An error occured: ${e}`
        }
    }
    
    async addToMetamask() {
        this.isAddingToken.value = true
        const res = await this._addToMetamask()
        this.isAddingToken.value = false
        return res
    }
    async _addToMetamask() {
        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const prom = this._modal.getWalletProvider()!.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20', // Initially only supports ERC20, but eventually more!
                    options: {
                        address: import.meta.env.VITE_TOKEN_ADDRESS, // The address that the token is at.
                        symbol: import.meta.env.VITE_TOKEN_NAME, // A ticker symbol or shorthand, up to 5 chars.
                        decimals: 18, // The number of decimals in the token
                        // image: , // A string url of the token logo
                    },
                }
            });
            async function returnWait<T>(timeToDelay: number, returnValue: T): Promise<T> {
                return new Promise((resolve) => setTimeout(() => resolve(returnValue), timeToDelay));
            }

            const wasAdded = await Promise.race([
                returnWait(15000, 'Timeout. Did you log in with MetaMask?'),
                prom
            ])
            
            if (wasAdded === true) {
                return true
            } else {
                return wasAdded
            }
        } catch (error) {
            return error as string
        }
    }

    private _logOutCleanup() {
        this.isLoggedIn.value = false
    }

    async showAccount() {
        await this._modal.open({
            view: 'Account'
        })
    }

    get address() {
        return this._address!
    }

    get walletInfo() {
        return this._walletInfo!.value
    }

    private _addCallbacks() {
        this._modal.subscribeEvents((ev) => {
            if (ev.data.event == 'CONNECT_SUCCESS') {
                // It turns out, this event is fired before modal's internal data is updated, so we do a stupid patch
                // this._updateLogInAndFetchData()
                setTimeout(async () => {
                    await this._updateLogInAndFetchData()
                    this.isLoggingIn.value = false
                }, 500)
            } else if(ev.data.event == 'MODAL_CLOSE') {
                this.isLoggingIn.value = false
                if (this.isLoggedIn.value && !this._modal.getIsConnected()) {
                    this._logOutCleanup()
                }
            }
        })
        this._modal.subscribeProvider(async (pr) => {
            if (pr.address != undefined && this._address != undefined && pr.address != this._address) {
                // Account changed
                this.isLoggingIn.value = true
                this._logOutCleanup()
                await this._updateLogInAndFetchData()
                this.isLoggingIn.value = false
            }
        })
    }

    private async _updateLogInAndFetchData() {
        // We should not do this check. However currently getAddress() returns undefined after reconnect
        if (this._modal.getAddress() != undefined) {
            this._address = this._modal.getAddress()
        } else {
            console.log('warning: no address found on web3modal')
        }
        const tokenContract = await createTokenContract(this._modal)
        // We also should not do this check. However, getWalletProvider() behaves very upexpectedly...
        if (tokenContract != undefined) {
            this._tokenContract = tokenContract.contract
            this._vestingContract = this._vestingContract.connect(tokenContract.signer) as Contract
            this._vestingContract.on('Claimed', async (user) => {
                if (this._address != undefined && user == this._address) {
                    await this._fetchTokenStatus()
                }
                this.isClaiming.value = false
            })
            await this._fetchTokenStatus()
        } else {
            console.log('warning: no wallet provider found on web3modal')
        }
        this.isLoggedIn.value = true;
    }

    private async _fetchTokenStatus() {
        const balance = await this._tokenContract!.balanceOf(this._address!) as number
        const claimStatus = await this._vestingContract.getClaimStatus(
            this._address
        )
        const tokenVesting = claimStatus.vested
        const claimed = claimStatus.firstPeriod + claimStatus.secondPeriod

        const info = {
            balance,
            tokenVesting,
            claimed,
            isPeriodClaimed: {
                first: claimStatus.firstPeriod > 0,
                second: claimStatus.secondPeriod > 0
            }
        }
        if (this._walletInfo == undefined)
            this._walletInfo = ref(info)
        else
            this._walletInfo!.value = info
    }
}

const provider = new Provider()
export default provider

function createModal() {
    // 1. Get projectId at https://cloud.walletconnect.com
    const projectId = import.meta.env.VITE_WC_PROJECT_ID

    // 2. Set chains
    const sepolia = {
        chainId: 11155111,
        name: 'Sepolia',
        currency: 'SepoliaETH',
        explorerUrl: 'https://sepolia.etherscan.io',
        rpcUrl: jsonRpcUrl
    }

    // 3. Create your application's metadata object
    const metadata = {
        name: `${import.meta.env.VITE_TOKEN_NAME} Vesting`,
        description: `Vesting page for ${import.meta.env.VITE_TOKEN_NAME} buyers`,
        url: 'http://localhost:5173', // url must match your domain & subdomain
        icons: ['']
    }

    // 4. Create Ethers config
    const ethersConfig = defaultConfig({
        metadata,

        enableEIP6963: true, // true by default
        enableInjected: true, // true by default
        enableCoinbase: true, // true by default
        rpcUrl: '...', // used for the Coinbase SDK
        defaultChainId: 1, // used for the Coinbase SDK
    })

    // 5. Create a Web3Modal instance
    return createWeb3Modal({
        ethersConfig,
        chains: [sepolia],
        projectId,
        tokens: {
            [import.meta.env.VITE_TOKEN_NAME]: import.meta.env.VITE_TOKEN_ADDRESS
        }
    })
}

async function createTokenContract(modal: Web3Modal) {
    const walletProvider = modal.getWalletProvider()
    if (walletProvider == undefined)
        return undefined
    const ethersProvider = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()

    const contract = new Contract(
        import.meta.env.VITE_TOKEN_ADDRESS,
        abi.token,
        signer
    )

    return { contract, signer }
}

function createVestingContract() {
    const contract = new Contract(
        import.meta.env.VITE_VESTING_ADDRESS,
        abi.vesting,
        new JsonRpcProvider(jsonRpcUrl)
    )

    return { contract }
}