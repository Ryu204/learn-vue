<script setup lang="ts">
import { computed, ref } from 'vue'
import provider from '../scripts/provider'
import Button from 'primevue/button'
import type { MenuItem } from 'primevue/menuitem'
import Menu from 'primevue/menu'

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
            await provider.logOut()
        }
    }
]
const menuItems = ref(_menuItems)

function callback(event: any) {
    if (provider.isLoggedIn.value) {
        menu.value.toggle(event)
    }
    else
        provider.logIn()
}
</script>

<template>
    <Button class="main-preview" :label="address" @click="callback"></Button>
    <Menu ref="menu" :model="menuItems" :popup="true"></Menu>
</template>

<style scoped>
.main-preview {
    border-radius: 100px;
    border: 3px solid green;
    background-color: black;
    margin: 10px;
    padding: 10px 70px;
    color: white;
}
</style>