<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import WalletDetail from './components/WalletDetail.vue'
import VestingTimeline from './components/VestingTimeline.vue'
</script>

<template>
  <header>
    <NavBar></NavBar>
  </header>
  <main>
    <WalletDetail></WalletDetail>
    <VestingTimeline></VestingTimeline>
  </main>
</template>

<style scoped>
</style>