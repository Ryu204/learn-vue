import { ref } from 'vue'
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

    private _modal: Web3Modal
    private _address: string | undefined
    private _walletInfo: WalletInfo | undefined
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

    private async _logOutCleanup() {
        this.isLoggedIn.value = false
        console.log('logged out')
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
        return this._walletInfo!
    }

    private _addCallbacks() {
        this._modal.subscribeEvents((ev) => {
            console.log(ev.data.event)
            if (ev.data.event == 'CONNECT_SUCCESS') {
                this._updateLogInAndFetchData()
            } else if (ev.data.event == 'MODAL_CLOSE') {
                if (this.isLoggedIn.value && !this._modal.getIsConnected()) {
                    this._logOutCleanup()
                }
            }
        })
    }

    private async _updateLogInAndFetchData() {
        // We should not do this check. However currently getAddress() returns undefined after reconnect
        if (this._modal.getAddress() != undefined) {
            this._address = this._modal.getAddress()
        }
        const tokenContract = await createTokenContract(this._modal)
        this._tokenContract = tokenContract.contract
        const balance = await this._tokenContract.balanceOf(this._address!) as number
        const claimStatus = await (this._vestingContract.connect(tokenContract.signer) as any).getClaimStatus(
            this._address
        )
        const tokenVesting = claimStatus.vested
        const claimed = claimStatus.firstPeriod + claimStatus.secondPeriod
        
        this._walletInfo = {
            balance,
            tokenVesting,
            claimed,
        }
        this.isLoggedIn.value = true;
    }
}

const provider = new Provider()
export default provider

function createModal() {
    // 1. Get projectId at https://cloud.walletconnect.com
    const projectId: string = import.meta.env.VITE_WC_PROJECT_ID

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
        name: 'My Website',
        description: 'My Website description',
        url: 'https://youtube.com', // url must match your domain & subdomain
        icons: ['']
    }

    // 4. Create Ethers config
    const ethersConfig = defaultConfig({
        metadata,
    })

    // 5. Create a Web3Modal instance
    return createWeb3Modal({
        ethersConfig,
        chains: [sepolia],
        projectId,
    })
}

async function createTokenContract(modal: Web3Modal) {
    const walletProvider = modal.getWalletProvider()!
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