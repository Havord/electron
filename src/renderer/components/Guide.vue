<template>
  <div id="bg" >
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="4" >
        <div class="grid-content bg-purple">
          <router-link
            style=" margin-top: 25%;margin-left:25%"
            to="/TrafficPage"
            tag="el-button"
          >交路管理</router-link>
        </div>
      </el-col>

      <el-col :span="4" :offset="3">
        <div class="grid-content bg-purple-light">
          <router-link
            style=" margin-top: 25%;margin-left:10%"
            to="/LandingPage"
            tag="el-button"
          >车组管理</router-link>
        </div>
      </el-col>

      <el-col :span="4" :offset="3">
        <div class="grid-content bg-purple">
          <router-link
            style=" margin-top: 25%;margin-left:10%"
            to="/TrafficPage"
            tag="el-button"
          >上线计划管理</router-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "Guide"
};
</script>
<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
.el-col{
  margin-top: 20%;
}
.el-row{
  top: 30px;
}
/* #bg{
        background-color: rgb(127, 132, 192);
        height: 800px;
    } */
</style>