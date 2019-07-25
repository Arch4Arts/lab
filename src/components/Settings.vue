<template>
<v-navigation-drawer
  v-model="$store.state.isOpenSettings"
  absolute
  temporary
  right
  app
  dark
>
  <v-switch
    v-model="$store.state.autoClosePage"
    label="Switch 1"
  ></v-switch>
</v-navigation-drawer>
<!-- <a-drawer
    class="drawer"
    title="Create a new account"
    :width="(this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) ? '100%' : '40%'"
    @close="onClose"
    :visible="$store.state.isOpenSettings"
    :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
>
    <v-switch
      v-model="$store.state.autoClosePage"
      :label="`Switch 1`"
    ></v-switch>
</a-drawer> -->
</template>

<script>
export default {
  methods: {
    onClose() {
      this.$store.state.isOpenSettings = false
    },
  },
}
</script>

<style scoped>

.drawer {
  background-color: #b30000;
  color: #b30000;
  background: #b30000;
}
</style>