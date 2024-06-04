<script setup lang="ts">
import Button from 'primevue/button'
</script>

<template>
    <div id="timeline">
        <div class="timeline-edge"></div>
        <div class="timeline">
            <div class="timeline-left">
                <div class="card">
                    <p>First session. Only 35% of total available tokens will be released. The session will last for 3 days.</p>
                    <Button label="Claim" disabled="true"></Button>
                </div>
            </div>
            <div class="timeline-right">
                <div class="card">
                    <p>Second session. After the clift, all remaining tokens will be released to public. Be the first to gather them all!</p>
                    <Button label="Claim"></Button>
                </div>
            </div>
        </div>
        <div class="timeline-edge"></div>
    </div>
</template>