<script setup lang="ts">
class WalletInfo {
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

const info = new WalletInfo(
    '0xsadfkjhsadfkjsadflkjasdfkljasdf',
    122222,
    100,
    123
)

const unit = 'LION'
</script>

<template>
    <div class="wrapper">
        <p>Token address: {{ info.tokenAddress }}</p>
        <p>Balance: {{ info.balance }} {{ unit }}</p>
        <p>Token vesting: {{ info.tokenVesting }} {{ unit }}</p>
        <p>Claimed: {{ info.claimed }} {{ unit }}</p>
    </div>
</template>

<style scoped>
.wrapper {
    background-color: blueviolet;
}
</style>