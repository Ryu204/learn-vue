<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import provider from '../scripts/provider'
import metamaskIcon from '../assets/metamask.svg'
import trustwalletIcon from '../assets/trustwallet.svg'
import ConnectWalletButton from './ConnectWalletButton.vue'

const info = provider.walletInfo
const unit = import.meta.env.VITE_TOKEN_NAME
const toast = useToast()

async function copyTokenAddress() {
    await navigator.clipboard.writeText(info.tokenAddress)
    toast.add({
        severity: 'success',
        summary: 'Copied',
        detail: `"${info.tokenAddress.slice(0, 10) + '...'}" has been copied to clipboard.`,
        life: 3000
    })
}

</script>

<template>
    <Card>
        <template #title>Wallet information</template>
        <template #content>
            <div class="flex-row">
                <div>
                    <p>
                        Token address: {{ info.tokenAddress }}
                        <Button icon="pi pi-clone" @click="copyTokenAddress" class="copy"></Button>
                    </p>
                    <p>Balance: {{ info.balance }} {{ unit }}</p>
                    <p>Token vesting: {{ info.tokenVesting }} {{ unit }}</p>
                    <p>Claimed: {{ info.claimed }} {{ unit }}</p>
                </div>
                <div class="flex-column">
                    <ConnectWalletButton :logo="metamaskIcon" name="MetaMask" class="inline"></ConnectWalletButton>
                    <ConnectWalletButton :logo="trustwalletIcon" name="Trust Wallet" class="inline">
                    </ConnectWalletButton>
                </div>
            </div>
        </template>
    </Card>
</template>

<style scoped>
.flex-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
}

.flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.inline {
    display: inline-block;
    align-self: center;
    align-items: center;
}

.copy {
    padding: 0;
    margin-left: 5px;
    background-color: transparent;
    color: white;
    max-width: 20px;
    border: none;
}

@media screen and (max-width: 800px) {
    .flex-row {
        flex-direction: column;
        align-items: start;
    }

    .flex-column {
        flex-direction: row;
    }
}
</style>