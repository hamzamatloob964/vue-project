<template>
   <v-layout justify-start>
    <div
      style="display: flex"
      v-for="(item, i) of $route.matched"
      :key="i"
      @click="$router.push(item.path)"
    >
      <span class="blue--text" style="cursor: pointer">{{item.name}}</span>
      <div v-if="i != $route.matched.length - 1" class="mx-3">/</div>
    </div>
  </v-layout>
 </template>
 
 <script>
 export default {
   name: 'my-breadcrumb'
 }
 </script>
 
 <style>
 
 </style>