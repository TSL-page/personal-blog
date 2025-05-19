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
  return request.post('users/login', { 
    username,
    password 
  })
}
