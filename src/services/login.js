import  request  from '../utils/request';

export function login(payload) {
  console.log("login in service");
  return request('/login1', {
    method: 'POST',
    data: {
      ...payload,
    }
  });
}