<template>
  <div>
    <div class=" pa-5">
      <Breadcrumb class="breadcrumb"/>
      <!-- <template>
        <div class="toolbar">
        </div>
      </template> -->
    </div>
    <div class="btn-div">
      <v-btn height="80" @click="navigateTo('ownerSettings')" outlined color="blue" class="btn">
        Owner Settings</v-btn>
      <v-btn height="80" @click="navigateTo('globalSettings')" outlined color="green" class="btn">
        Global Settings</v-btn>
      <v-btn height="80" @click="navigateTo('appFeedback')" outlined color="orange" class="btn">
        App Feedback</v-btn>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb';
export default {
  components :{
    Breadcrumb
  },
  data () {
    return{
    }
  },
  methods: {
    navigateTo (path) {
      this.$router.push(`/dashBoard/${path}`)
    }
  }

}
</script>

<style scoped>
.btn {
  /* width: 200px; */
  /* background-color: limegreen; */
  border-radius: 5px;
  /* color: white; */
  font-size: 22px;
  font-weight: 500;
  margin-left: 15px;
}
.btn-div {
  margin-top: 100px;
  display: flex;
  justify-content: center;
}
</style>