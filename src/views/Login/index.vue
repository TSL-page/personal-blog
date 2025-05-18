<script setup>
  import { ref, watch} from 'vue'
//控制注册和登录的表单
  const isRegister = ref(true)
const form = ref()
// 整个的用于提交的form数据对象
  const formModel = ref({
    username: '',
    password: '',
    repassword: ''
  })

  const rules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur'},
      { min: 5, max: 10, message: '用户名必须是5-10位',trigger: 'blur'}
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur'},
      { pattern: /^\S{6,15}$/, message: '密码必须是6-15位非空字符', trigger: 'blur'}
    ],
    repassword: [
      { required: true, message: '请再次输入密码', trigger: 'blur'},
      { pattern: /^\S{6,15}$/,
        message: '密码必须是6-15位非空字符',
        trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          if (value !== formModel.value.password) {
            callback(new Error('两次输入的密码不一致'))
          } else {
            callback()
          }
        },
        trigger: 'blur'
      }
    ]
  }



// 切换的时候，重置表单内容
watch(isRegister,()=> {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
  })

// 注册成功之前，先进行校验，校验成功 -> 请求，校验失败 ->自动提示
const register = async () => {
  await form.value.validate()
}

  // 登录
  const login = async () => {
    await form.value.validate()
  }
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册相关表单 -->
      <el-form v-if="isRegister" :rules="rules" :model="formModel" ref="form" autocomplete="off">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="formModel.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="formModel.password"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input placeholder="请输入再次密码" v-model="formModel.repassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" @click="register" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>

      <!-- 登录相关表单 -->
      <el-form size="large" :model="formModel" :rules="rules" ref="form" v-else autocomplete="off">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="formModel.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="formModel.password"></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 98.3vh;
  margin: 0;
  background-color: #fff;

  .el-row {
      height: 100%;
    }

  .bg {
    height: 100%;
    background:url('@/assets/login/bg.png') no-repeat center / cover;
    border-radius: 10px;
    border: 0px solid white;
    box-sizing: border-box;
    overflow: hidden;
  }

  .form {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>