import * as api from '../services/login';
import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import Cookies from 'js-cookie'
export default {
  namespace: 'login',
  state: {
    isError: false
  },
  effects: {
    *login({ payload }, { call, put, select }) {
      console.log("payload in login ", payload);
      const { password, ...rest } = payload;
      const response = yield call(api.login, { password, ...rest });
      console.log("result:",response);
      const{token,returnCode}=response;
      console.log("returnCode",returnCode);
      if (parseInt(returnCode) === 200) {
        console.log("if");
        sessionStorage.setItem("isLogin", true);
        Cookies.set('token', token);
        console.log("token:",Cookies.get('token'));
        //登录成功后跳转页面
        yield put(routerRedux.push('/sys'));
      } else {
        console.log("else");
        yield put({
          type: 'save',
          payload: {
            isError: true
          }
        });
        notification.error({
          message: '用户名或密码错误，请重新登录。',
        });
      }


    },
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  },
}
