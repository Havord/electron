<template>
  <el-container>
    <el-aside width="200px
    ">
      <el-menu class="el-menu-vertical-demo">
        <el-menu-item index="1">
          <span slot="title">
            <router-link tag="p" to="/TrafficPage">交路管理</router-link>
          </span>
        </el-menu-item>
        <el-menu-item index="2">
          <span slot="title">
            <router-link tag="p" to="/TrafficPage">车组管理</router-link>
          </span>
        </el-menu-item>
        <el-menu-item index="3">
          <span slot="title">
            <router-link tag="p" to="/TrafficPage">车组管理</router-link>
          </span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header height="10px">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
          <el-breadcrumb-item>交路管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <el-collapse accordion>
          <el-collapse-item title="新增交路" name="1">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
              <el-form-item label="交路名称">
                <el-input v-model="formInline.user" placeholder="交路名称"></el-input>
              </el-form-item>
              <el-form-item label="开行类型">
                <el-radio-group v-model="formInline.resource" size="mini">
                  <el-radio label="短编"></el-radio>
                  <el-radio label="长编"></el-radio>
                  <el-radio label="重联"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="交路限制" prop="type">
                <el-checkbox-group v-model="formInline.type">
                  <el-checkbox label="新造出厂" name="type"></el-checkbox>
                  <el-checkbox label="高级修" name="type"></el-checkbox>
                  <el-checkbox label="换轮后5万公里" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
        <el-table
          :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
        >
          <el-table-column label="交路名称" prop="name"></el-table-column>
          <el-table-column label="开行类型" prop="type"></el-table-column>
          <el-table-column label="限制条件" prop="limit"></el-table-column>
          <el-table-column label="是否开行" prop="state">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.state"
                @change="changeState(scope.$index, scope.row)"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "Traffic-Page",
  data() {
    return {
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: "",
      formInline: {
        user: "",
        region: "",
        resource: "",
        type: []
      },
      tableData: [],
      search: ""
    };
  },
  methods: {
    addNewTraffic() {
      console.log(1);
    },
    onSubmit() {
      console.log(this.tableData);
      return (this.tableData = [
        {
          name: "DJ7695",
          type: "短编",
          state: true,
          limit: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "DJ7694",
          type: "短编",
          state: true,
          limit: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "DJ7693",
          type: "短编",
          state: false,
          limit: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "DJ7692",
          type: "短编",
          state: true,
          limit: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "DJ7691",
          type: "短编",
          state: true,
          limit: "上海市普陀区金沙江路 1518 弄"
        }
      ]);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    changeState(index, row) {
      console.log(index, row);
    }
  }
};
</script>
<style scoped>
.el-breadcrumb {
  margin-left: 10px;
}
.el-menu {
  text-align: center;
}
.el-aside,
.el-header {
  margin-top: 35px;
}
</style>