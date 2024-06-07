<script setup lang="ts">
import { computed } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import provider from '../scripts/provider'
import metamaskIcon from '../assets/metamask.svg'
import trustwalletIcon from '../assets/trustwallet.svg'
import ConnectWalletButton from './ConnectWalletButton.vue'

const info = computed(() => provider.walletInfo)
const unit = import.meta.env.VITE_TOKEN_NAME
const tokenAddress = import.meta.env.VITE_TOKEN_ADDRESS
const toast = useToast()

async function copyTokenAddress() {
    await navigator.clipboard.writeText(tokenAddress)
    toast.add({
        severity: 'success',
        summary: 'Copied',
        detail: `"${tokenAddress.slice(0, 10) + '...'}" has been copied to clipboard.`,
        life: 3000
    })
}

</script>

<template>
    <Card>
        <template #title>Wallet information</template>
        <template #content>
            <div class="wallet-info flex-row align-space-between center">
                <div>
                    <p>
                        Token address: {{ tokenAddress }}
                        <Button icon="pi pi-clone" @click="copyTokenAddress" class="copy"></Button>
                    </p>
                    <p>Your balance: {{ info.balance }} {{ unit }}</p>
                    <p>Token vesting: {{ info.tokenVesting }} {{ unit }}</p>
                    <p>Claimed: {{ info.claimed }} {{ unit }}</p>
                </div>
                <div class="flex-column center">
                    <ConnectWalletButton :logo="metamaskIcon" name="MetaMask"></ConnectWalletButton>
                    <ConnectWalletButton :logo="trustwalletIcon" name="Trust Wallet"></ConnectWalletButton>
                </div>
            </div>
        </template>
    </Card>
</template>

<style scoped>
.copy {
    padding: 0;
    margin-left: 5px;
    background-color: transparent;
    color: white;
    max-width: 20px;
    border: none;
}
</style>