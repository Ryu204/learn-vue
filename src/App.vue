<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import WalletDetail from './components/WalletDetail.vue'
import VestingTimeline from './components/VestingTimeline.vue'
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
    <WalletDetail v-if="provider.isLoggedIn.value"></WalletDetail>
    <VestingTimeline></VestingTimeline>
  </main>
</template>

<style scoped>
</style>