import { Row, Col } from 'antd';
import logo from "../../../assets/logo.png";
import React, { PureComponent } from 'react';
 
class Logo extends PureComponent{

  render(){
    const imgLogo = <img src={logo} alt="pro" style={{ height: '44px' }} />;
  
    return(
        <Row>
          <Col span={7}>
              {imgLogo}
          </Col>
        </Row>
    );
  }
}
export default Logo;