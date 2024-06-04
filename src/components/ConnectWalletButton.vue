<script setup lang="ts">
import Button from 'primevue/button'

const unit = import.meta.env.VITE_TOKEN_NAME
const props = defineProps({
    logo: String,
    name: String,
})
</script>

<template>
    <Button :label="'Add ' + unit + ' to ' + props.name" >
        <template #icon>
            <img :src="props.logo" class="icon">
        </template>
    </Button>
</template>

<style scoped>
.icon {
    max-width: 30px;
    aspect-ratio: 1;
}

.p-button {
    padding: 3px;
    display: flex !important;
    min-width: 200px;
    font-size: 12px;
    margin: 5px;
}
</style>