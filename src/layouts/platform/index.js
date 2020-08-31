import styles from './index.css';
import { Component } from 'react';
import { Layout } from 'antd';
 

import RightHeader from './header';
 
import router from 'umi/router';
 
import PropTypes from 'prop-types';
 

const { Header, Sider, Content } = Layout;
class PlatformLayout extends Component {
  constructor(props) {
    super(props);
    console.log("props1", props);
    this.state = {
      // 侧边栏状态
      collapsed: false,
      // 系统主题
      theme: 'light',
      // 菜单主题
      menuTheme: 'dark',
    };
  };
  componentDidMount() {
    console.log("props2", this.props);
    const { dispatch } = this.props;
    const isLogin = sessionStorage.getItem("isLogin");
    if (isLogin === 'false') {
      router.push('/login?status=1');
      return;
    }
    // // 请求系统基本信息
    // dispatch({
    //   type: 'global/getSysInfo',
    // });
    // dispatch({
    //   type: 'global/getMessage',
    // });
    dispatch({
      type: 'menu/getMenuData',
    });

  }
  render() {
    const { location, menusData = [], } = this.props;
    console.log("menusData3", menusData);
    const { children } = this.props;
    return (
      <Layout className={styles.whole_container}>
        {/* 左边 */}
        <Sider className={styles.sider}>
          左边
        </Sider>
        {/* 右边 */}
        <Layout id="backTop" className={styles.right_content} >
          {/* 右边：头 */}
          <Header className={styles.contentHeader}>
            <RightHeader></RightHeader>
          </Header>


          <Content className={styles.mainContent}>
            <p>主要内容，显示内容是children，而children是来自layout/index.js中,它是根据不同路径转到不同的布局上</p>
            {children}
          </Content>
          
        </Layout>

      </Layout>
    );
  }
}

export default PlatformLayout;
PlatformLayout.propTypes = {
  children: PropTypes.element.isRequired,
  //用户信息
  userInfo: PropTypes.object,
  //菜单数据
  menusData: PropTypes.arrayOf(PropTypes.object),
  //有路由权限菜单一维数组
  flattenMenuData: PropTypes.arrayOf(PropTypes.object),
  //无路由权限菜单一维数组
  diffMenuData: PropTypes.arrayOf(PropTypes.object),
};