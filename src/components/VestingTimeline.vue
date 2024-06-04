<script setup lang="ts">

</script>

<template>
    <div id="timeline">
        <div class="timeline-edge"></div>
        <div class="timeline">
        <div class="timeline-left">
            <div class="card">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque, harum!</p>
            <button id="claim-1" type="button">Claim now</button>
            </div>
        </div>
        <div class="timeline-right">
            <div class="card">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio pariatur tenetur voluptate
            temporibus.
            Dolorum nesciunt porro atque, animi nostrum adipisci?</p>
            <button id="claim-2" type="button">Claim now</button>
            </div>
        </div>
        </div>
        <div class="timeline-edge"></div>
    </div>
</template>

<style scoped>
#timeline {
    --timeline-node-width: 30px;
    --timeline-content-padding: 30px;
    --timeline-line-width: 4px;
    --timeline-arrow-width: 10px;
}

.card {
    background-color: red;
    padding: 20px;
    border-radius: 10px;
}

.timeline-edge {
    width: var(--timeline-node-width);
    height: 50px;
    background-image: radial-gradient(circle, green calc(var(--timeline-line-width) - 1px), transparent var(--timeline-line-width));
    background-size: 100% 33.33%;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
}

.timeline {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
}

.timeline::after {
    content: '';
    border-radius: 5px;
    position: absolute;
    width: var(--timeline-line-width);
    background-color: orange;
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: calc(var(--timeline-line-width) * -0.5);
}

/* Position */
.timeline-left,
.timeline-right {
    position: relative;
    padding: var(--timeline-content-padding);
    width: 50%;
    left: 0%;
}

.timeline-right {
    left: 50%;
}

/* Circle */
.timeline-left::after,
.timeline-right::after {
    content: '';
    position: absolute;
    width: var(--timeline-node-width);
    height: var(--timeline-node-width);
    background-color: purple;
    border: var(--timeline-line-width) solid var(--secondary-background);
    bottom: calc(52% - var(--timeline-node-width) / 2);
    left: calc(100% - var(--timeline-node-width) / 2);
    border-radius: 50%;
    z-index: 1;
}

.timeline-right::after {
    left: auto;
    right: calc(100% - var(--timeline-node-width) / 2);
}

/* Triangle */
.timeline-left::before,
.timeline-right::before {
    content: " ";
    position: absolute;
    bottom: calc(50% - var(--timeline-arrow-width) / 2);
    z-index: 1 !important;
    right: calc(var(--timeline-content-padding) - var(--timeline-arrow-width) + 2px);
    border: medium solid red;
    border-width: var(--timeline-arrow-width) 0px var(--timeline-arrow-width) var(--timeline-arrow-width);
    border-color: transparent transparent transparent red;
}

.timeline-right::before {
    right: auto;
    bottom: calc(50% - var(--timeline-arrow-width) / 2);
    left: calc(var(--timeline-content-padding) - var(--timeline-arrow-width) + 2px);
    border: medium solid red;
    border-width: 10px 10px 10px 0;
    border-color: transparent red transparent transparent;
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 800px) {
    .timeline-edge {
        position: relative;
        left: calc(var(--timeline-content-padding) - var(--timeline-node-width)/2);
        margin: 10px 0px 10px;
    }
    /* Place the timelime to the left */
    .timeline::after {
        left: var(--timeline-content-padding);
    }
    .timeline-left,
    .timeline-right {
        width: 100%;
        padding-left: calc(2 * var(--timeline-content-padding));
        padding-right: 25px;
    }
    /* Make sure that all arrows are pointing leftwards */
    .timeline-left::before,
    .timeline-right::before {
        right: auto;
        left: 52px;
        border: medium solid red;
        border-width: 10px 10px 10px 0;
        border-color: transparent red transparent transparent;
    }
    /* Make sure all circles are at the same spot */
    .timeline-left::after,
    .timeline-right::after {
        left: 15px;
    }
    /* Make all right containers behave like the left ones */
    .timeline-right {
        left: 0%;
    }
}
</style>