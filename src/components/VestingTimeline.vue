<script setup lang="ts">
import Button from 'primevue/button'
import provider from '../scripts/provider'
import { computed } from 'vue'
import { useToast } from 'primevue/usetoast';

const notLoggedIn = computed(() => !provider.isLoggedIn.value)
function claimStatus(period: 'FIRST' | 'SECOND') {
    const notWhitelist = provider.walletInfo.tokenVesting == 0
    if (notWhitelist)
        return 'DISABLED'
    const status = provider.walletInfo.isPeriodClaimed
    if (period == 'FIRST')
        return status.first
            ? 'CLAIMED'
            : 'OK'
    if (!status.first)
        return 'DISABLED'
    if (status.second) {
        return 'CLAIMED'
    }
    return 'OK'
}

const tooltip = {
    value: 'You must log in first',
    showDelay: 1000
}

const toast = useToast()
async function claim() {
    const res = await provider.claim()
    if (res != undefined) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: res,
        })
    }
}

provider.claimCallback = (claimed: number) => {
    toast.add({
        severity: 'success',
        summary: 'Success',
        detail: `Claimed ${claimed} ${import.meta.env.VITE_TOKEN_NAME} successfully`,
        life: 3000
    })
}

</script>

<template>
    <div id="timeline">
        <div class="timeline-edge"></div>
        <div class="timeline">
            <div class="timeline-left">
                <div class="card">
                    <p>First session. Only 35% of total available tokens will be released. The session will last for 3 days.</p>
                    <div v-if="notLoggedIn" v-tooltip="tooltip" class="no-flex">
                        <Button label="Claim" disabled="true"></Button>
                    </div>
                    <Button v-else-if="claimStatus('FIRST') == 'OK'" label="Claim" @click="claim" :loading="provider.isClaiming.value"></Button>
                    <Button v-else-if="claimStatus('FIRST') == 'DISABLED'" label="Claim" disabled="true"></Button>
                    <Button v-else label="Claimed" disabled="true"></Button>
                </div>
            </div>
            <div class="timeline-right">
                <div class="card">
                    <p>Second session. After the clift, all remaining tokens will be released to public. Be the first to gather them all!</p>
                    <div v-if="notLoggedIn" v-tooltip="tooltip" class="no-flex">
                        <Button label="Claim" disabled="true"></Button>
                    </div>
                    <Button v-else-if="claimStatus('SECOND') == 'OK'" label="Claim" @click="claim" :loading="provider.isClaiming.value"></Button>
                    <Button v-else-if="claimStatus('SECOND') == 'CLAIMED'" label="Claimed" disabled="true"></Button>
                    <Button v-else label="Claim" disabled="true"></Button>
                </div>
            </div>
        </div>
        <div class="timeline-edge"></div>
    </div>
</template>

<style scoped>
.no-flex {
    display: inline-flex;
    align-self: center;
}
</style>