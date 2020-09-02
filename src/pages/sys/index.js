import styles from './index.css';
import { PureComponent } from 'react';

 

/**
 * connect和dispatch要配合使用，否则无法获取props
 */

class Index extends PureComponent {
 
  render() {
    return (
      <div className={styles.login}>
     
          登录成功

      </div>
    );
  }
}
export default Index;