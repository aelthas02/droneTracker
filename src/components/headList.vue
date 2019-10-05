<template>
  <div class="container">
    <Header :filteredStatus="status" v-on:searchId="getFilteredId($event)" v-on:searchFlying="getFilteredFlying($event)" v-on:searchStatus="getFilteredStatus($event)" v-on:searchName="getFilteredName($event)"/>
    <br />
    <List :filteredRegister="registers"/>

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

<script>
import Header from './header.vue'
import List from './list.vue'

export default {
  name: 'headList',
  components: {
    Header,
    List
  },

  data() {
    return {
      registers: [],
      registerCounter: 0,
      status: [],
      page: 1,
      ID: undefined,
      NAME: undefined,
      FLYING: '',
      STATUS: undefined,
      PAGING: '&_page=1&_limit=10'
    }
  },

  mounted: function(){
    this.getList();
  },

  methods: {
    getInitialPage(){
      fetch('http://services.solucx.com.br/mock/drones?_page=' + this.page + '&_limit=10', {
          mode: 'cors',
          method: 'get'
        })
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          this.registers = jsonData;
        })
      this.checkPage();
    },

    setPage() {
      this.PAGING = '&_page='+ this.page + '&_limit=10';
      this.getGeneral();
    },
    previous() {
      this.page--;
      this.PAGING = '&_page='+ this.page + '&_limit=10';
      this.getGeneral();
    },
    next() {
      this.page++;
      this.PAGING = '&_page='+ this.page + '&_limit=10';
      this.getGeneral();
    },
    checkPage() {
      this.getRegistersCount();
      this.page === 1 ? this.$refs.previous.disabled = true : this.$refs.previous.disabled = false;
    },

    fieldChecking(url){
      if (this.ID !== undefined || this.NAME !== undefined || this.FLYING !== '' || this.STATUS !== undefined){
        url += '?';
      }
      if (this.ID !== undefined) {
        url += '&id=' + this.ID;
      }   
      if (this.NAME !== undefined) {
        url += '&name=' + this.NAME;
      }   
      if (this.FLYING !== '') {
        url +=  this.FLYING;
      }   
      if (this.STATUS !== undefined) {
        url += '&status=' + this.STATUS;
      }
      return url;
    },
    
    getRegistersCount() { 
      var url = this.fieldChecking('http://services.solucx.com.br/mock/drones');
      fetch(url, {
          mode: 'cors',
          method: 'get'
        })
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          this.registerCounter = jsonData.length;
          jsonData.length - (this.page * 10) <= 0 ? this.$refs.next.disabled = true : this.$refs.next.disabled = false;
        })

    },
    getGeneral() { 
      var url = this.fieldChecking('http://services.solucx.com.br/mock/drones?') + this.PAGING;
      fetch(url, {
          mode: 'cors',
          method: 'get'
        })
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          this.registers = jsonData;
        })

      this.checkPage();
    },
    getList(){
      fetch('http://services.solucx.com.br/mock/drones', {
          mode: 'cors',
          method: 'get'
        })
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          this.registers = jsonData;
          this.getStatus();          
        }).then(() => {
          this.getInitialPage();
        })
    },
    getStatus(){      
      for(var i = 0; i < this.registers.length; i++){
        if(this.status.indexOf(this.registers[i].status) === -1){
          this.status.push(this.registers[i].status);
        }
      }
      this.registers = [];
    },

    getFilteredId(id) {
      if(id.length === 0) { 
        this.ID = undefined; 
      } else {
        this.ID = id;
      }
      this.getGeneral();
    },
    getFilteredName(name) {
      if(name.length === 0) { 
        this.NAME = undefined; 
      } else {
        this.NAME = name;
      }
      this.getGeneral();
    },
    getFilteredStatus(status) {
      this.page = 1;
      if(status.length === 0) { 
        this.STATUS = undefined; 
      } else {
        this.STATUS = status;
      }
      this.setPage();
    },
    getFilteredFlying(flying) {
      this.FLYING = '';
      this.page = 1;

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
}
</script>

<style>
.next {
  text-align: right;
}
</style>
