<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import WalletDetail from './components/WalletDetail.vue'
import VestingTimeline from './components/VestingTimeline.vue'
import Footer from './components/Footer.vue'
import Toast from 'primevue/toast'

import provider from './scripts/provider'
</script>

<template>
    <div>
        <Toast></Toast>
    </div>
    <header>
        <NavBar></NavBar>
    </header>
    <main>
        <WalletDetail v-if="provider.isLoggedIn.value" class="margin-bottom-large"></WalletDetail>
        <VestingTimeline></VestingTimeline>
    </main>
    <Footer></Footer>
</template>

<style scoped>
@import './assets/main.css';
</style>