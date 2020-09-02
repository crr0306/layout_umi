// An highlighted block
/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { message, notification } from 'antd';
import router from 'umi/router';
import Cookies from 'js-cookie'
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = error => {
    const { response } = error;

    if (response && response.status) {
        const errorText = codeMessage[response.status] || response.statusText;
        const { status, url } = response;
        notification.error({
            message: `请求错误 ${status}: ${url}`,
            description: errorText,
        });
    }

    return response;
};
const request = extend({
    prefix: '/api',
    errorHandler,
    // 默认错误处理
    //credentials: 'same-origin', // 默认请求是否带上cookie

});

// request拦截器, 改变url 或 options.
request.interceptors.request.use(async (url, options) => {
    console.log("request.interceptors");
    checkIsLogin(url);
    console.log("token:",Cookies.get("token"));
    const { method, headers, body } = options;
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
        //表单请求
        if (!(body instanceof FormData)) {
            options.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                ...headers,
                token:Cookies.get("token"),
            };
            options.body = JSON.stringify(options.body);
        } else {
            //非表单请求
            // newOptions.body is FormData
            options.headers = {
                Accept: 'application/json',
                ...headers,
            };
        }
    }

})

const logout = () => {
    // @HACK
    /* eslint-disable no-underscore-dangle */
    window.g_app._store.dispatch({
        type: 'global/logout',
    });
};
const checkIsLogin = (url) => {
    console.log("checkIsLogin");
    const isLogin = sessionStorage.getItem('isLogin');
    const href = window.location.href;
    if (isLogin !== 'true' && url.indexOf('/login') === -1 && href.indexOf('/login') === -1) {
        message.warning('请在登录后操作!');
        router.push('/login');
        return;
    }
};
const checkStatus = response => {
    console.log("response:",response);
    const { status } = response;
    if (status >= 200 && status < 300) {
        return response;
    }
    //status异常
    const errortext = codeMessage[response.status] || response.statusText;
    notification.error({
        message: `请求错误 ${response.status}: ${response.url}`,
        description: errortext,
    });
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
};
// response拦截器, 处理response
request.interceptors.response.use((response, options) => {
    
    console.log("response.interceptors");
    checkStatus(response);
    return response;
});


export default request;

