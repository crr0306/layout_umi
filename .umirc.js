
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' },
        { path: '/login', component: '../pages/login/index' },
        { path: '/sys', component: '../pages/sys/index' }
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'login_umi',
      dll: false,
      locale: {
        enable: true,
        default: 'zh-CN',//'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    "/api": {
      target: "http://localhost:8081/",
      changeOrigin: true,
      pathRewrite: { "^/api": "gl" }
    }
  },
}
