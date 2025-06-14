import request from '@/utils/request'

// 注册接口
export const userRegisterService = ({ 
  username,
  password,
  repassword 
}) => {
  return request.post('/users/register', { 
    username,
    password,
    repassword 
  })
}

// 登录接口
export const userLoginService = ({ 
  username,
  password 
}) => {
  return request.post('/users/login', { 
    username,
    password 
  })
}

// 获取用户信息
export const getUserMessage = async () => {
  try {
    return await request.get('/users/getUser1')
  } catch (error) {
    console.error('获取用户信息失败:', error.response || error.message)
    throw error
  }
}

// 修改用户信息
export const updateUserMessage =  ({
username,
password,
email,
avatar,
real_name
}) => {
    return request.post('/users/update', { 
      username,
      password,
      email,
      avatar,
      real_name
})
}
