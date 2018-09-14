<template>
    <div class="login">
        <el-form ref="form" :model="form" :rules="rules" class="container">
            <img src="../assets/avatar.jpg" alt="" class="avatar">
            <el-form-item prop="username">
                <el-input v-model="form.username" placeholder="账户" prefix-icon="myicon myicon-user"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="form.password" placeholder="密码" prefix-icon="myicon myicon-key"></el-input>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" class="login-btn">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  data() {
    return {
        form: {
            username: '',
            password: ''
        },
        rules: {
            username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
    };
  }
};
</script>
