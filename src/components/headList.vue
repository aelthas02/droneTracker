<template>
  <div class="container">
    <Header :filteredStatus="status" 
            v-on:searchId="getFilteredId($event)" 
            v-on:searchFlying="getFilteredFlying($event)" 
            v-on:searchStatus="getFilteredStatus($event)" 
            v-on:searchName="getFilteredName($event)"/>
    <br />
    <List :filteredRegister="registers" 
          v-on:setSort="setSort($event)"/>

    <hr>

    <div class='paginator row'>
      <div class="col">
        <button class="btn btn-secondary paginator" @click="previous()" ref='previous'>Previous</button>
      </div>      
      <div class="col next">
        <button class="btn btn-secondary paginator" @click="next()" ref='next'>Next</button>
      </div>      
    </div>

  </div>
</template>

<script lang='ts'>
import Header from './header.vue'
import List from './list.vue'
import { Component, Prop, Vue } from 'vue-property-decorator';
import Route from 'vue-router'

@Component({
  components: {
    Header,
    List
  }
})
export default class headList extends Vue {
  public registers: any = [];
  public registerCounter = 0;
  public status: any = [];
  public page = 1;
  public ID = undefined;
  public NAME = undefined;
  public FLYING = '';
  public STATUS = undefined;
  public PAGING = '&_page=1&_limit=10';
  public SORT = undefined; 

  $refs!: {
    previous: HTMLFormElement,
    next: HTMLFormElement
  }  

  created() { 
    this.getList();
  }  

  async getInitialPage(){
    let response = await fetch('http://services.solucx.com.br/mock/drones?_page=' + this.page + '&_limit=10', {mode: 'cors', method: 'get'});
    this.registers = await response.json();
    this.checkPage();
  }

  setPage() {
    this.page = 1;
    this.PAGING = '&_page=1&_limit=10';
    this.getGeneral();
  }
  previous() {
    this.page--;
    this.PAGING = '&_page='+ this.page + '&_limit=10';
    this.getGeneral();
  }
  next() {
    this.page++;
    this.PAGING = '&_page='+ this.page + '&_limit=10';
    this.getGeneral();
  }
  checkPage() {
    this.getRegistersCount();
    this.page === 1 ? this.$refs.previous.disabled = true : this.$refs.previous.disabled = false;
  }

  fieldChecking(url: any){
    if (this.ID !== undefined || this.NAME !== undefined || this.FLYING !== '' || this.STATUS !== undefined){
      url += '?';
    }
    if (this.ID !== undefined) {
      url += '&id_like=' + this.ID;
    }   
    if (this.NAME !== undefined) {
      url += '&name_like=^' + this.NAME;
    }   
    if (this.FLYING !== '') {
      url +=  this.FLYING;
    }   
    if (this.STATUS !== undefined) {
      url += '&status=' + this.STATUS;
    }
    return url;
  }
  
  async getRegistersCount() { 
    var url = this.fieldChecking('http://services.solucx.com.br/mock/drones');

    let response = await fetch(url, {mode: 'cors', method: 'get'});
    let jsonData = await response.json();
    this.registerCounter = jsonData.length;

    this.registerCounter - (this.page * 10) <= 0 ? this.$refs.next.disabled = true : this.$refs.next.disabled = false;

  }
  async getGeneral() {
    this.checkPage();
    var url = this.fieldChecking('http://services.solucx.com.br/mock/drones?') + this.PAGING + this.SORT;
    let response = await fetch(url, {mode: 'cors', method: 'get'});
    this.registers = await response.json();
  }
  async getList(){
    let response = await fetch('http://services.solucx.com.br/mock/drones', {mode: 'cors', method: 'get'});
    this.registers = await response.json(); 
    await this.getStatus();
    this.getInitialPage();
  }
  getStatus(){    
    for(var i = 0; i < this.registers.length; i++){
      if(this.status.indexOf(this.registers[i].status) === -1){
        this.status.push(this.registers[i].status);
      }    
    }
    
    this.registers = [];
  }

  setSort(sort: any){
    this.SORT = sort;
    this.setPage();
  }

  getFilteredId(id: any) {
    if(id.length === 0) { 
      this.ID = undefined; 
    } else {
      this.ID = id;
    }
    this.setPage();
  }
  getFilteredName(name: any) {
    if(name.length === 0) { 
      this.NAME = undefined; 
    } else {
      this.NAME = name;
    }
    this.setPage();
  }
  getFilteredStatus(status: any) {
    if(status.length === 0) { 
      this.STATUS = undefined; 
    } else {
      this.STATUS = status;
    }
    this.setPage();
  }
  getFilteredFlying(flying: any) {
    this.FLYING = '';

    if(flying == 0) { 
      this.FLYING = '&fly=' + 0; 
    }else if (flying == 1) {
      for (var i = 1; i < 51; i++) {
        this.FLYING += '&fly=' + i;
      }
    }else if (flying == 2) {
      for (var j = 51; j < 101; j++) {
        this.FLYING += '&fly=' + j;
      }
    }else {
      for (var k = 0; k < 101; k++) {
        this.FLYING += '&fly=' + k;
      }
    }
    this.setPage();
  }
  
}
</script>

<style>
.next {
  text-align: right;
}
</style>
