export type WalletInfo = {
    balance: number
    tokenVesting: number
    claimed: number
    isPeriodClaimed: {
        first: boolean,
        second: boolean
    }
}