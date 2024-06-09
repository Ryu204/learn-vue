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

async function addToMetamask() {
    const res = await provider.addToMetamask()
    if (typeof res !== 'boolean') {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail:
                'Could not add token to wallet: ' + (
                    typeof res === 'string'
                        ? res
                        : res.message == undefined
                            ? JSON.stringify(res)
                            : res.message as string
                )
        })
    } else if (res == true) {
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: `${import.meta.env.VITE_TOKEN_NAME} was added to MetaMask`,
            life: 3000
        })
    } else {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: `Could not add ${import.meta.env.VITE_TOKEN_NAME} to MetaMask`
        })
    }
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
                    <ConnectWalletButton :logo="metamaskIcon" name="MetaMask" @click="addToMetamask" :loading="provider.isAddingToken.value">
                    </ConnectWalletButton>
                    <div v-tooltip="'Will be supported soon'">
                        <ConnectWalletButton :logo="trustwalletIcon" name="Trust Wallet" disabled="true">
                        </ConnectWalletButton>
                    </div>
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