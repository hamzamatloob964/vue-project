<template>
  <v-app class="grey lighten-4">
    <router-view>
    </router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return{
    }
  }
};
</script>
<style>
.breadcrumb {
  margin-top: 30px;
}
.toolbar {
  display: flex;
  flex-wrap: wrap;
  height: auto;
}
</style>
