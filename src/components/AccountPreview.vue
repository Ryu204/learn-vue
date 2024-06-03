<script setup lang="ts">
import { ref, computed } from 'vue'

let isSignedIn = ref(false)
let _address = ref('0x1234567890000000000000000aadfadf')

let address = computed(() => {
    return isSignedIn.value ? _address.value.slice(0, 8) + '...' : 'Sign in pliz'
})

function signIn() {
    isSignedIn.value = true;
}
</script>

<template>
    <div @click="signIn()" class="main-preview">
        <p v-if="isSignedIn">{{ address }}</p>
        <p v-else>Sign in pliz</p>
    </div>
</template>

<style scoped>
.main-preview {
    border-radius: 100px;
    border: 1px solid red;
    background-color: black;
    margin: 10px;
    padding: 10px;
}
</style>