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
    <Menubar :model="items" class="main">
        <template #start>
            <img :src="Cheems" id="logo">
        </template>
        <template #item="{ item }">
            <div class="item">
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
.main {
    place-content: end space-between;
    padding: 0 60px;
    border-radius: 100px;
    margin: 0 auto;
    height: 80px;
}

#logo {
    border-radius: 100px;
    display: flex;
    align-items: center;
}

.item {
    padding: 10px;
}

</style>