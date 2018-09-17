<template>
    <div class="user">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>用户管理</el-breadcrumb-item>
              <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
    </el-row>
    <el-input v-model="query" placeholder="请输入内容" class="input-with-select search-input" @keydown.native.enter="getUser">
      <el-button slot="append" icon="el-icon-search" @click="getUser"></el-button>
    </el-input>
    <el-button type="success" plain @click="addDialogFormVisible = true">添加用户</el-button>
    <el-table
    border
    :data="userList"
    style="width: 100%">
    <el-table-column
    type="index"
    width="50">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="280">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话"
      width="280">
    </el-table-column>
    <el-table-column width="80" label="用户状态">
      <template slot-scope="scope">
        <el-switch
        v-model="scope.row.mg_state"
        @change="state(scope.row)">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"
          type="primary" 
          icon="el-icon-edit"
          plain
         ></el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          icon="el-icon-delete"
          plain></el-button>
        <el-button
          size="mini"
          type="warning"
          @click="handleDelete(scope.$index, scope.row)"
          icon="el-icon-check"
          plain></el-button>
      </template>
    </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
    <el-form :model="form" :rules="rules" ref="ruleForm">
    <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
      <el-input v-model="form.userName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth" prop="passWord">
      <el-input v-model="form.passWord" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
      <el-input v-model="form.phone" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="add">确 定</el-button>
  </div>
</el-dialog>
<el-dialog title="收货地址" :visible.sync="editDialogFormVisible">
  <el-form :model="form">
    <el-form-item label="活动名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="editDialogFormVisible = true">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
           
<script>
import { users, upStatus, addUser } from "@/api";
export default {
  data() {
    return {
      userList: [],
      pagenum: 1,
      total: 100,
      pageSize: 2,
      query: "",
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      form: {
        userName: "",
        passWord: "",
        email: "",
        phone: ""
      },
      formLabelWidth: "80px",
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱格式",
            trigger: "blur,change"
          }
        ],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.pagenum = 1;
      this.getUser();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getUser();
    },
    handleEdit(index, row) {
      this.editDialogFormVisible = true
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    getUser() {
      let params = {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pageSize
        }
      };
      users(params).then(res => {
        console.log(res);
        this.total = res.data.total;
        this.userList = res.data.users;
      });
    },
    state(res) {
      console.log(res);
      let params = {
        userId: res.id,
        type: res.mg_state
      };
      upStatus(params).then(res => {
        console.log(res);
        if (res.meta.status === 200) {
          this.$message({
            type: "success",
            message: res.meta.msg
          })
        } else {
          this.$message({
            type: "warning",
            message: res.meta.msg
          });
        }
      });
    },
    add() {
      this.$refs.ruleForm.validate(valid => {
        if(valid){
          let params = {
            username: this.form.userName,
            password: this.form.passWord,
            email: this.form.email,
            mobile: this.form.phone
          }
          addUser(params).then(res => {
            console.log(res)
            if (res.meta.status === 201) {
              this.$message({
                type: "success",
                message: res.meta.msg
              })
              this.addDialogFormVisible = false
              this.getUser()
            }
          })
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.user {
  .margin-20 {
    margin: 20px 0;
  }
  .search-input {
    width: 300px;
  }
  .page {
    padding: 5px 0;
    background-color: #d3dce6;
  }
}
</style>