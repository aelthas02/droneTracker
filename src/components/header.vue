<template>
  <div class="hello row">
    <div class="col-md-2"> 
      Drone Id<br />
      <input type="text" class="form-control" ref="id" @change="searchId()">
    </div>

    
    <div class="col-md-4"> 
      Name<br />
      <input type="text" class="form-control" ref="name" @change="searchName()">
    </div>

    
    <div class="col-md-3"> 
      Current Fly<br />
      <select type="text" class="form-control" ref="flying"  @change="searchFlying()">
        <option value="-1">Select</option>
        <option value="0">Not Flying</option>
        <option value="1">Going</option>
        <option value="2">Coming</option>
      </select>
    </div>

    
    <div class="col-md-3"> 
      Status<br />
      <select class="form-control" ref="status" @change="searchStatus()">
        <option value="">Select</option>
        <option :key="status" v-for="status in filteredStatus" :value="status">{{status}}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Route from 'vue-router'

@Component
export default class Header extends Vue {
  @Prop() filteredStatus: any;

  $refs!: {
    id: HTMLFormElement,
    name: HTMLFormElement,
    flying: HTMLFormElement,
    status: HTMLFormElement
  }

  searchId(){
    this.$emit('searchId', this.$refs.id.value);
  }
  searchName() {
    this.$emit('searchName', this.$refs.name.value);
  }
  searchFlying() {
    this.$emit('searchFlying', this.$refs.flying.value);
  }
  searchStatus() {
    this.$emit('searchStatus', this.$refs.status.value);
  }
  
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
