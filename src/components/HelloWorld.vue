<template>
  <div id="loginer">
      <ul class="menu-tab">
        <li :class="{select:item.toggle}"  v-for="(item,index) in menuTab" :key="index">{{item.txt}}</li>
      </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{
      menuTab:[
        {
          txt:"登录",
          toggle:true
        },
        {
          txt:"注册",
          toggle:false
        }
      ]
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#loginer{
  height: 100vh;
  background: #f90;
}
.menu-tab{
  text-align: center; 
  margin-top: 200px;
  li{
    display: inline-block;
    height: 36px;
    width: 88px;
    line-height: 36px;
    color: #fff;
  }
  .select{
    background: rgba(0,0,0,.1);
  }
}
</style>
