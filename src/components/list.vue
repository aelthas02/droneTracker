<template>
<div class="table-responsive-lg">
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col" @click="setSortId()"><div class="sort">Drone</div></th>
        <th scope="col" @click="setSortName()"><div class="sort">Customer</div></th>
        <th scope="col" @click="setSortBattery()"><div class="sort">Batteries</div></th>
        <th scope="col" @click="setSortMaxSpeed()"><div class="sort">Max Speed</div></th>
        <th scope="col" @click="setSortAverageSpeed()"><div class="sort">Avarage Speed</div></th>
        <th scope="col" @click="setSortCurrentFly()"><div class="sort">Current Fly</div></th>
        <th scope="col" @click="setSortStatus()"><div class="sort">Status</div></th>
      </tr>
    </thead>
    <tbody>
        <tr :key="index" v-for="(register, index) in filteredRegister">
          <td><router-link :to="{name: 'details', params: {id: register.id}}">{{register.id}}</router-link></td>
          <td class='row'>
            <router-link :to="{name: 'details', params: {id: register.id}}">
              <div class="image-container">
                    <img v-bind:src="register.image">
              </div>
            </router-link>
            <router-link :to="{name: 'details', params: {id: register.id}}">
              <div class="personal">
                    <div class="name">{{register.name}}</div>
                    <div class="address">{{register.address}}</div>
              </div>
            </router-link>
          </td>
          <td class="progress-bar-container">
            <router-link :to="{name: 'details', params: {id: register.id}}">
              <div class="battery">
                {{register.battery}} %
              </div>
              <div class="progress-bar">
                <div class="progress" v-bind:style="{width: register.battery + 'px'}"></div>
              </div>
            </router-link>
          </td>
          <td>
            <router-link :to="{name: 'details', params: {id: register.id}}">
              <b class="speed">{{Math.trunc(register.max_speed)}}</b>
              .{{String(register.max_speed - Math.trunc(register.max_speed)).substring(2,4)}} m/h
            </router-link></td>
          <td>
            <router-link :to="{name: 'details', params: {id: register.id}}">
              <b class="speed">{{Math.trunc(register.average_speed)}}</b>
              .{{String(register.average_speed - Math.trunc(register.average_speed)).substring(2,4)}} m/h
            </router-link></td>
          <td class="direction-container">
            <router-link :to="{name: 'details', params: {id: register.id}}">
            <div v-if="register.fly <= 50 && register.fly !== 0" class="direction">Going</div>
            <div v-if="register.fly <= 50 && register.fly !== 0" class="row">
              <div class="progress-ball" v-bind:style="{margin: '0px 0px 0px ' + parseInt((register.fly * 2) - 5)  + 'px'}"></div>
              <div class="fly"></div>
              <div class="arrow-head-going"></div>

            </div>
            <div v-if="register.fly > 50 && register.fly !== 0" class="direction">Coming</div>
            <div v-if="register.fly > 50 && register.fly !== 0" class="row">
              <div class="arrow-head-back"></div>
              <div class="fly"></div>
              <div class="progress-ball" v-bind:style="{margin: '0px 0px 0px ' + parseInt(105  - ((register.fly - 50) * 2)) + 'px'}"></div>

            </div>
            <div v-if="register.fly === 0" class="direction">Not Flying</div>
            <div v-if="register.fly === 0" class="row">
              <div class="fly-zero">-----------------</div>
            </div>
            </router-link>
          </td>
          <td v-if="register.status === 'failed'">
              <router-link :to="{name: 'details', params: {id: register.id}}"><button class="btn btn-danger status">{{register.status}}</button></router-link>
          </td>
          <td v-if="register.status === 'delayed'">
              <router-link :to="{name: 'details', params: {id: register.id}}"><button class="btn btn-warning status">{{register.status}}</button></router-link>
          </td>
          <td v-if="register.status !== 'failed' && register.status !== 'delayed'">
              <router-link :to="{name: 'details', params: {id: register.id}}"><button class="btn btn-secondary status">{{register.status}}</button></router-link>
          </td>
        </tr>
    </tbody>
  </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Route from 'vue-router'

@Component
export default class List extends Vue {
  @Prop() filteredRegister: any;  

  public sortId = true;
  public sortName = true;
  public sortBattery = true;
  public sortMaxSpeed = true;
  public sortAverageSpeed = true;
  public sortCurrentFly = true;
  public sortStatus = true;

  setAllTrue() {
    this.sortId = true;
    this.sortName = true;
    this.sortBattery = true;
    this.sortMaxSpeed = true;
    this.sortAverageSpeed = true;
    this.sortCurrentFly = true;
    this.sortStatus = true;
  }
  setSortId() {
    this.sortId = !this.sortId;
    this.sortId === true ? this.$emit('setSort','&_sort=id&_order=asc') : this.$emit('setSort','&_sort=id&_order=desc');
  }
  setSortName() {
    this.sortName = !this.sortName;
    this.sortName === true ? this.$emit('setSort','&_sort=name&_order=asc') : this.$emit('setSort','&_sort=name&_order=desc');
  }
  setSortBattery() {
    this.sortBattery = !this.sortBattery;
    this.sortBattery === true ? this.$emit('setSort','&_sort=battery&_order=asc') : this.$emit('setSort','&_sort=battery&_order=desc');
  }
  setSortMaxSpeed() {
    this.sortMaxSpeed = !this.sortMaxSpeed;
    this.sortMaxSpeed === true ? this.$emit('setSort','&_sort=max_speed&_order=asc') : this.$emit('setSort','&_sort=max_speed&_order=desc');
  }
  setSortAverageSpeed() {
    this.sortAverageSpeed = !this.sortAverageSpeed;
    this.sortAverageSpeed === true ? this.$emit('setSort','&_sort=average_speed&_order=asc') : this.$emit('setSort','&_sort=average_speed&_order=desc');
  }
  setSortCurrentFly() {
    this.sortCurrentFly = !this.sortCurrentFly;
    this.sortCurrentFly === true ? this.$emit('setSort','&_sort=fly&_order=asc') : this.$emit('setSort','&_sort=fly&_order=desc');
  }
  setSortStatus() {
    this.sortStatus = !this.sortStatus;
    this.sortStatus === true ? this.$emit('setSort','&_sort=status&_order=asc') : this.$emit('setSort','&_sort=status&_order=desc');
  }
}
</script>

<style scoped lang="scss">
th {
  cursor: pointer;
}
.sort{
  padding: 5px;
  text-align: center;
}
.sort:hover {
  background-color: #CCC;
  border-radius: 5px;
}

.status {
  cursor: default;
  border-radius: 10px;
}
.address {
      font-size: 12px;
}
.name {
      margin-top: 5px;
      font-size: 16px;
      font-weight: bold;
}
.image-container {
      margin: 5px;      
}
.speed {
  font-size: 22px;
}
a {
  color: black;
}

.progress-ball {
  position: absolute;
  height: 10px;
  width: 10px;
  background-color: black;
  border: solid black 1px;
  border-radius: 20px;
}
.direction-container {
  position: relative;
}
.direction-container:hover .direction {
  opacity: 1;
}
.direction {  
  font-size: 12px;
  font-family: monospace;
  text-align: center;
  color: white;
  font-weight: bold; 
  background-color: rgba(80, 80, 80, 0.644);
  border-radius: 7px;
  width: 85px;
  margin-bottom: 10px;
  opacity: 0;
}
.fly {
  background-color: black;
  height: 1px;
  width: 100px;
  margin-top: 5px;
  z-index: 1;
}
.arrow-head-going{
  width: 0; 
  height: 0; 
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;  
  border-left: 10px solid black;
}
.arrow-head-back{
  width: 0; 
  height: 0; 
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;   
  border-right:10px solid black;
}


.progress-bar-container:hover .battery {
  opacity: 1;
}
.battery {
  font-size: 12px;
  font-family: monospace;
  text-align: center;
  color: white;
  font-weight: bold; 
  background-color: rgba(80, 80, 80, 0.644);
  border-radius: 10px;
  width: 50px;
  margin-left: 23%;
  margin-bottom: 10px;
  opacity: 0;
}
.progress-bar {
  border-radius: 7px;
  width: 106px;
  height: 10px;
  background-color: #CCC;
}
.progress {
  border-radius: 10px;
  width: 0px;
  height: 5px;
  margin: 3px;
  background-color: rgb(0, 0, 0);
}
</style>
