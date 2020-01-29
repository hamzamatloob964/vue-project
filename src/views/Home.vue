<template>
  <div>
    <div class=" pa-5">
      <template>
        <div class="toolbar">
          <Breadcrumb class="breadcrumb"/>
        </div>
      </template>
    </div>
    <div class="btn-div">
      <button @click="navigateTo('ownerSettings')" type="button" class="btn1">
        Owner Settings</button>
      <button @click="navigateTo('globalSettings')" type="button" class="btn2">
        Global Settings</button>
      <button @click="navigateTo('appFeedback')" type="button" class="btn3">
        App Feedback</button>
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
.btn1 {
  height: 100px;
  width: 200px;
  background-color: limegreen;
  border-radius: 10px;
  color: white;
  font-size: 22px;
  font-weight: 500;
  margin-left: 15px;
}
.btn2 {
  height: 100px;
  width: 200px;
  background-color: blue;
  border-radius: 10px;
  color: white;
  font-size: 22px;
  font-weight: 500;
  margin-left: 15px;
}
.btn3 {
  height: 100px;
  width: 200px;
  background-color: orange;
  border-radius: 10px;
  color: white;
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