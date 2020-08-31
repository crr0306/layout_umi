import styles from './index.css';
import { PureComponent } from 'react';

import  LoginLeft from './components/left';
import { message } from 'antd';
import { connect } from 'dva';
import { sysName } from '../../../conf/platform.config';

/**
 * connect和dispatch要配合使用，否则无法获取props
 */
@connect(
  ({ login }) => ({
    ...login,
  })
)
class Index extends PureComponent {
  componentDidMount() {
    const { location: { query = {} } } = this.props;
    if (query.status === '1') {
      message.warning("用户未登录");
    }
  }
  handleSubmit = (err, values) => {
    console.log("values:", values);
    for (const name in values) {
      if (values[name] === undefined) {
        message.error("用户或者密码错误1");
      }
    }
    this.props.dispatch({
      type: "login/login",
      payload: {
        ...values,
      },
    });
  };
  render() {
    return (
      <div className={styles.login}>
     
          <h2 className={styles.login_title}>{sysName}</h2>
          <LoginLeft className={styles.login_content} onSubmit={this.handleSubmit}></LoginLeft>
       

      </div>
    );
  }
}
export default Index;