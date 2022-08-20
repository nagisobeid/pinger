<script>
import routes from '../routes'
import { io } from "socket.io-client";

export default {
  data() {
    return {
      pinging: false,
      sites: [],
    }
  },
  async mounted() {
   let initialSites = await routes.getStatus();
   this.sites = initialSites.data;
   console.log(initialSites.data);
   const socket = io("http://localhost:8080", {
    withCredentials: false,
   });

   socket.on('data', (res) => {
    if(res) {
      console.log(res)
      this.sites = res;
    }
   })

   socket.on('pinging', (res) => {
    this.pinging = res
   })

  }
}

</script>

<template>
  <main>
    <div>
      <div :class="{ pinging: site.status.alive === 2, active: site.status.alive === true, inactive: !site.status.alive }" v-for="site of sites" class="site">
        <label class="title">{{site.site.toUpperCase()}}</label>
        <br>
        <p  v-if="site.status.alive === 2">INITIALZING</p>
        <img class="loader" v-if="pinging" src="../../public/spinner.gif"/>
      </div>
    </div>
  </main>
</template>

<style>
.site {
  float: left;
  height: 60px;
  width: 200px;
  margin-top: 10px;
  margin-left: 5px;
  border-radius: 5px;
  background-color: lightblue;    
  text-align: center;
}
.active {
  background-color: greenyellow;
}
.inactive {
  background-color: rgb(233, 15, 15);
}
.loader {
  width: 50px;
}
.title {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>