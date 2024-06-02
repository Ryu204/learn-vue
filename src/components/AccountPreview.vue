<script setup lang="ts">
import { ref, computed } from 'vue'

let isSignedIn = ref(false)
let _address = ref('0x1234567890000000000000000aadfadf')

let address = computed(() => {
    return isSignedIn.value ? _address.value.slice(0, 10) + '...' : 'Sign in pliz'
})

function signIn() {
    isSignedIn.value = true;
}
</script>

<template>
    <div @click="signIn()" class="main">
        <p v-if="isSignedIn">{{ address }}</p>
        <p v-else>Sign in pliz</p>
    </div>
</template>

<style scoped>
.main {
    color: white;
    border-radius: 5px;
    border: 1px solid red;
    background-color: black;
    padding: 10px;
}
</style>