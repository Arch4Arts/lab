<template>
    <p :style="{'color': $store.state.chars.sisterColor}"><slot></slot></p>
</template>

<script>
export default {
    
}
</script>

<style lang='scss' scoped>

* {
    margin-bottom: 0px;
    display: inline ;
}

</style>

