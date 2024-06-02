<script setup lang="ts">
import Menubar from 'primevue/menubar'
import AccountPreview from './AccountPreview.vue'
import Cheems from '../assets/cheems.jpg'

const items = [
    {
        name: 'Home'
    },
    {
        name: 'Support',
        submenu: true
    },
    {
        name: 'Buy'
    },
    {
        name: 'Wallet'
    }
]
</script>

<template>
    <Menubar :model="items">
        <template #start>
            <img :src="Cheems" class="round">
        </template>
        <template #item="{ item }">
            <div class="menu-item">
                {{ item.name }}
                <span v-if="item.submenu" class="pi pi-angle-down"></span>
            </div>
        </template>
        <template #end>
            <AccountPreview></AccountPreview>
        </template>
    </Menubar>
</template>

<style scoped>
.menu-item {
    padding: 10px;
}

.round {
    border-radius: 10px;
}
</style>