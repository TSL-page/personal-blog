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
    console.error('获取用户信息失败:', error.response || error.message)  // 输出具体错误信息（如状态码、响应内容）
    throw error  // 抛出错误以便上层处理
  }
}
