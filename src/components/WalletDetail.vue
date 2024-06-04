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
    import.meta.env.VITE_TOKEN_ADDRESS,
    122222,
    100,
    123
)

const unit = import.meta.env.VITE_TOKEN_NAME
</script>

<template>
    <div class="wrapper">
        <div>
            <p>Token address: {{ info.tokenAddress }}</p>
            <p>Balance: {{ info.balance }} {{ unit }}</p>
            <p>Token vesting: {{ info.tokenVesting }} {{ unit }}</p>
            <p>Claimed: {{ info.claimed }} {{ unit }}</p>
        </div>
        <button id="add-to-metamask">
            Add {{ unit }} to Metamask
        </button>
    </div>
</template>

<style scoped>
.wrapper {
    padding: 20px;
    background-color: black;
    color: white;
    border-radius: 3px;
    display: flex;
    place-content: end space-between;
}

.wrapper p {
    font-weight: bold;
}

#add-to-metamask {
    height: 40px;
    align-self: center;
}
</style>