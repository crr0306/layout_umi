import  request  from '../utils/request';

export function login(payload) {
  console.log("login in service");
  return request('/user/login', {
    method: 'POST',
    data: {
      ...payload,
    }
  });
}