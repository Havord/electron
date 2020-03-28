<template>
  <div id="MyTitle">    
      <p style="margin-top:5px">交路管理</p> 
     <div id="mytitle">       
        <TitleBtn id='min' type="min" ></TitleBtn>
        <TitleBtn id='max' type="max" ></TitleBtn>
        <TitleBtn id='close' type="close" ></TitleBtn>
    </div>
  </div>
</template>

<script>
  import TitleBtn from './MyTitle/TitleBtn.vue';
  export default {
    name: 'MyTitle',
    components:{
      TitleBtn
    },
    methods: {
    }
  }
</script>
    
<style>
#MyTitle {  
    position: absolute;
    width: 100%;
    height:30px;
    background-color: rgba(15, 25, 16, 0.3);
    /* 标题栏可拖动 */
    -webkit-app-region: drag;
}

#min {
  background: url('../assets/min.png');
}
#max {
  background: url('../assets/max.png');
}
#close {
  background: url('../assets/close.png');
}
</style>