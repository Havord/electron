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
            <router-link tag="p" to="/TrainPage">车组管理</router-link>
          </span>
        </el-menu-item>
        <el-menu-item index="3">
          <span slot="title">
            <router-link tag="p" to="/GroupPage">上线计划管理</router-link>
          </span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header height="10px">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
          <el-breadcrumb-item>上线计划管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="24">
            <el-table
              size="mini"
              :data="tableData.data"
              border
              style="width: 100%"
              highlight-current-row
            >
              <el-table-column label="序号" type="index"></el-table-column>
              <el-table-column label="交路名称" prop="name">
                <template slot-scope="scope">
                  <span v-if="scope.row.isSet">
                    <el-input size="mini" placeholder="请输入交路名称" v-model="tableData.formItem.name"></el-input>
                  </span>
                  <span v-else>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column label="开行类型" prop="state">
                <template slot-scope="scope">
                  <span v-if="scope.row.isSet">
                    <el-radio-group v-model="tableData.formItem.type" size="mini">
                      <el-radio label="短编"></el-radio>
                      <el-radio label="长编"></el-radio>
                      <el-radio label="重联"></el-radio>
                    </el-radio-group>
                  </span>
                  <span v-else>{{scope.row.type}}</span>
                </template>
              </el-table-column>
              <el-table-column label="交路限制" prop="limit">
                <template slot-scope="scope">
                  <span v-if="scope.row.isSet">
                    <el-checkbox-group v-model="tableData.formItem.limit">
                      <el-checkbox label="新造出厂" name="limit"></el-checkbox>
                      <el-checkbox label="高级修" name="limit"></el-checkbox>
                      <el-checkbox label="换轮后5万公里" name="limit"></el-checkbox>
                    </el-checkbox-group>
                  </span>
                  <span v-else>
                    <p v-for="(item,i) in scope.row.limit" v-bind:key="i">{{i+1}}.{{item}}</p>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="是否开行" prop="state">
                <template slot-scope="scope">
                  <span v-if="scope.row.isSet">
                    <el-switch
                      v-model="tableData.formItem.state"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    ></el-switch>
                  </span>
                  <span v-else>
                    <el-switch
                      disabled
                      v-model="scope.row.state"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    ></el-switch>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <span
                    class="el-tag el-tag--mini"
                    style="cursor: pointer;"
                    @click="pwdChange(scope.row,scope.$index,true)"
                  >{{scope.row.isSet?'保存':"修改"}}</span>
                  <span
                    v-if="!scope.row.isSet"
                    class="el-tag el-tag--danger el-tag--mini"
                    style="cursor: pointer;"
                    @click="pwdChange(scope.row,scope.$index,false,true)"
                  >删除</span>
                  <span
                    v-else
                    class="el-tag el-tag--warning el-tag--mini"
                    style="cursor: pointer;"
                    @click="pwdChange(scope.row,scope.$index,false,false)"
                  >取消</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="24">
            <div class="el-table-add-row" style="width: 99.2%;" @click="addMasterUser()">
              <span>+ 添加</span>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "GroupPage ",
  data() {
    return {
      tableData: {
        formItem: {name:''},
        data: []
      }
    };
  },
  methods: {
    //读取表格数据
    readMasterUser() {
      //根据实际情况，自己改下啊
      this.tableData.data.map(i => {
        i.id = generateId.get(); //模拟后台插入成功后有了id
        i.isSet = false; //给后台返回数据添加`isSet`标识
        return i;
      });
    },
    //添加账号
    addMasterUser() {
      for (let i of this.tableData.data) {
        if (i.isSet) return this.$message.warning("请先保存当前编辑项");
      }
      let j = {
        id: 0,
        name: "",
        type: "",
        limit: [],
        state: true,
        isSet: true,
        _temporary: true
      };

      this.tableData.data.push(j);
      this.tableData.formItem = JSON.parse(JSON.stringify(j));
    },
    //修改
    pwdChange(row, index, cg, de) {
      console.log(row, index, cg);
      //点击修改 判断是否已经保存所有操作
      for (let i of this.tableData.data) {
        if (i.isSet && i.id != row.id) {
          this.$message.warning("请先保存当前编辑项");
          return false;
        }
      }
      //是否是取消操作
      if (!cg && !de) {
        if (!this.tableData.formItem.id) {
          this.tableData.data.splice(index, 1);
        }
        return (row.isSet = !row.isSet);
      } else if (de) {
        this.tableData.data.splice(index, 1);
        //更新数据
        this.$db.set("traffic", this.tableData.data).write();
        //提醒成功
        this.$message({
          message: "删除成功",
          type: "success",
          duration: "6000",
          offset: 40
        });
      }
      //提交数据
      if (row.isSet) {
        //要开始提交给后台

        let data = JSON.parse(JSON.stringify(this.tableData.formItem));
        for (let k in data) {
          row[k] = data[k];
        }

        //修改ID
        if (!row.id && index) {
          let id = this.tableData.data[this.tableData.data.length - 2].id + 1;
          row.id = id;
        }
        //提交更改
        row.isSet = false;
        //更新数据
        this.$db.set("traffic", this.tableData.data).write();
        //提醒成功
        this.$message({
          message: "提交成功",
          type: "success",
          duration: "6000",
          offset: 40
        });
      } else {
        this.tableData.formItem = JSON.parse(JSON.stringify(row));
        row.isSet = true;
      }
    }
  },
  created() {
    console.log('GroupPage');
    this.tableData.data = this.$db
      .read()
      .get("traffic")
      .value();
  },
  watch:{
      tableData:{//深度监听，可监听到对象、数组的变化
         handler(val, oldVal){
           this.tableData.formItem.name = this.tableData.formItem.name.toUpperCase()
         },
         deep:true //true 深度监听
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
.el-table-add-row {
  margin-top: 10px;
  width: 100%;
  height: 34px;
  border: 1px dashed #c1c1cd;
  border-radius: 3px;
  cursor: pointer;
  justify-content: center;
  display: flex;
  line-height: 34px;
}
</style>