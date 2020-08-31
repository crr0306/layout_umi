
import React, { PureComponent } from 'react';
import styles from './index.css';

 
class RightHeader extends PureComponent {

  render() {
    const { userInfo, message, notification} = this.props;
    console.log("props in header", this.props);
    return (
      <div  className={styles.right_header}>
         右边头部分
      </div>

    );
  }
}


export default RightHeader;