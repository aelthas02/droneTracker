<template>
      <div>
            <div><b>ID:</b> {{this.id}}</div><br>            
            <div class="row">
                  <div class="name-container"><b>Name: </b> </div>
                  <div class="image-container">
                        <img v-bind:src="registers.image">
                  </div>
                  <div class="personal">
                        <div class="name">{{registers.name}}</div>
                        <div class="address">{{registers.address}}</div>
                  </div>
            </div><br>
            <div><b>Battery:</b> {{registers.battery}} %</div>
            <div><b>Max Speed:</b> {{registers.max_speed}} m/h</div>
            <div><b>Average Speed:</b> {{registers.average_speed}} m/h</div>
            <div><b>Fly:</b> {{registers.fly}} %</div>
            <div class="row">
                  <div class="name-container"><b>Status: </b></div>
                  <div v-if="registers.status === 'failed'">
                        <button class="btn btn-danger">{{registers.status}}</button>
                  </div>
                  <div v-if="registers.status === 'delayed'">
                        <button class="btn btn-warning">{{registers.status}}</button>
                  </div>
                  <div v-if="registers.status !== 'failed' && registers.status !== 'delayed'">
                        <button class="btn btn-secondary">{{registers.status}}</button>
                  </div>
            </div>
            
            <hr>
            <div>
                  <router-link :to="{name: 'home'}"><button class="btn btn-secondary">Back</button></router-link>
            </div>
      </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Route from 'vue-router'

@Component
export default class Details extends Vue {
      public registers = [];
      public id: any;
      
      created() {
            this.id = this.$route.params.id;
            this.Test();           
      }
      async Test(){
            let response = await fetch('http://services.solucx.com.br/mock/drones/'+ this.id, {method: 'get'});
            this.registers = await response.json(); 
      }
}
</script>
<style scoped>
.btn {
      margin-left: 20px;
}
.address {
      font-size: 12px;
}
.name-container {
      margin-top: 5px;
      margin-left: 15px;
}
.name {
      margin-top: 5px;
      font-size: 16px;
      font-weight: bold;
}
.image-container {
      margin: 5px;      
}
</style>