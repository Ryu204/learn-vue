<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import WalletDetail from './components/WalletDetail.vue'
</script>

<template>
  <header>
    <NavBar id="nav-bar"></NavBar>
    <h1>Hello, world</h1>
  </header>
  <main>
    <WalletDetail></WalletDetail>
  </main>
</template>

<style scoped>
#nav-bar {
}
</style>