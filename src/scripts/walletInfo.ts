export default class WalletInfo {
    tokenAddress: string
    balance: number
    tokenVesting: number
    claimed: number

    constructor(
        tokenAddress: string, 
        balance: number,
        tokenVesting: number,
        claimed: number
    ) {
        this.tokenAddress = tokenAddress
        this.balance = balance
        this.tokenVesting = tokenVesting
        this.claimed = claimed
    }
}