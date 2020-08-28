import styles from './index.css';
import { Component } from 'react';
import { Layout } from 'antd';


const {
  Footer, Content,
} = Layout;
class loginLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <Layout className={styles.login_container}>
        <div className={styles.login_top_content}>
          
          <div className={styles.login_left_content}>
              <Content className={styles.login_content}>
                {children}
              </Content>
          </div>
          <div className={styles.login_right_content}>
         
          </div>
        </div>



      </Layout>
    );
  }
}
export default loginLayout;