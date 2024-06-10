<script setup lang="ts">
import { computed, ref } from 'vue'
import provider from '../scripts/provider'
import Button from 'primevue/button'
import type { MenuItem } from 'primevue/menuitem'
import Menu from 'primevue/menu'
import { useToast } from 'primevue/usetoast'

const address = computed(() => {
    return provider.isLoggedIn.value 
        ? provider.address.slice(0, 10) + '...'
        : 'Log in'
})

const menu = ref()
const _menuItems: MenuItem[] = [
    {
        label: 'Log out',
        command: async () => {
            await provider.tryLogOut()
        }
    }
]
const menuItems = ref(_menuItems)

function logInCallback(event: any) {
    if (provider.isLoggedIn.value) {
        menu.value.toggle(event)
    }
    else
        provider.tryLogIn()
}

const toast = useToast()
provider.logInFailedCallback = (msg: string) => {
    toast.add({
        severity: 'info',
        summary: 'Log in failed',
        detail: `${msg}. \nPlease switch to a supported network and log in again.`,
    })
}
</script>

<template>
    <Button class="main-preview" :label="address" @click="logInCallback" :loading="provider.isLoggingIn.value" rounded></Button>
    <Menu ref="menu" :model="menuItems" :popup="true"></Menu>
</template>