import { ref } from 'vue'
import {
    defaultConfig,
    createWeb3Modal,
} from '@web3modal/ethers5'
import type { Web3Modal } from '@web3modal/ethers5'
import WalletInfo from './walletInfo'

export class Provider {
    isLoggedIn = ref(false)

    private _modal: Web3Modal
    private _address: string | undefined
    private _walletInfo: WalletInfo | undefined
    constructor() {
        try {
            this._modal = createModal()
        } catch (e) {
            throw new Error(`Oops, an error happened: ${e}`)
        }
        this._addCallbacks()
    }

    async logIn() {
        await this._modal.open({
            view: 'Connect'
        })
    }

    async logOut() {
        await this._modal.open({
            view: 'Account'
        })
    }

    private async _logOutCleanup() {
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
        return this._walletInfo!
    }

    private _addCallbacks() {
        this._modal.subscribeEvents((ev) => {
            console.log(ev.data.event)
            if (ev.data.event == 'CONNECT_SUCCESS') {
                this._updateLogInAndFetchData()
            } else if (ev.data.event == 'MODAL_CLOSE') {
                if (!this._modal.getIsConnected()) {
                    this._logOutCleanup()
                }
            }
        })
    }

    private async _updateLogInAndFetchData() {
        this._address = this._modal.getAddress()!
        this._walletInfo = new WalletInfo(
            import.meta.env.VITE_TOKEN_ADDRESS,
            123213214324,
            2423423424,
            12312313
        )
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
        rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/l0Xj3OvM_MH6N5vH3qWrK48QZUCcGAIz'
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
        /*Required*/
        metadata,

        /*Optional*/
        enableEIP6963: true, // true by default
        enableInjected: true, // true by default
        enableCoinbase: true, // true by default
        rpcUrl: '...', // used for the Coinbase SDK
        defaultChainId: 1 // used for the Coinbase SDK
    })

    // 5. Create a Web3Modal instance
    return createWeb3Modal({
        ethersConfig,
        chains: [sepolia],
        projectId,
    })
}