<template>
    <p :style="{'color': $store.state.mcColor}"><slot></slot></p>
</template>

<script>
export default {
    
}
</script>

<style scoped>

* {
    margin-bottom: 0px;
    display: inline;
}

</style>

