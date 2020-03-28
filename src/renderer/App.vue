<template>
  <div id="app" style="height: 100%;">
    <MyTitle />
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 --> 
    <router-view></router-view>
    
  </div>
</template>

<script>
import MyTitle from './components/MyTitle';
  export default {
    name: 'first',
    components: {
      MyTitle
    }
  }
</script>

<style>
  /* CSS */
  html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#RL {
  margin-top: 20%;
  margin-left: 40%;
}
</style>
