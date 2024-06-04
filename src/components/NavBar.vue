<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'
import Menubar from 'primevue/menubar'
import { useToast } from 'primevue/usetoast'
import Avatar from 'primevue/avatar'

import AccountPreview from './AccountPreview.vue'
import Cheems from '../assets/cheems.jpg'
import provider from '../scripts/provider'

import { ref } from 'vue'

const _model: MenuItem[] = [
    {
        label: 'Project',
        url: 'https://youtube.com'
    },
    {
        label: 'Support',
        items: [
            {
                label: 'Buy more',
                url: 'https://github.com'
            },
            {
                label: 'Get involved',
                url: 'https://facebook.com'
            }
        ]
    },
    {
        label: 'Vesting',
        url: 'https://primevue.org'
    },
    {
        label: 'My Wallet',
        command: () => {
            if (provider.isLoggedIn.value)
                provider.showAccount()
            else
                show(ToastType.logInFirst)
        }
    }
]

enum ToastType {
    logInFirst
}
const toast = useToast()
function show(type: ToastType) {
    switch (type) {
        case ToastType.logInFirst:
            toast.add({
                severity: 'info',
                summary: 'Info',
                detail: 'Please log in first', 
                life: 3000
            })
            break
    }
}
const model = ref(_model)
</script>

<template>
    <Menubar :model="model" class="nav-bar">
        <template #start>
            <Avatar :image="Cheems" id="logo" size="large" shape="circle" class="center"></Avatar>
        </template>
        <template #end>
            <AccountPreview></AccountPreview>
        </template>
    </Menubar>
</template>