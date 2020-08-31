import styles from './index.css';
import { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import cookie from 'react-cookies'
import { Toast } from 'antd-mobile';
import {
  TabletOutlined,
  SafetyOutlined,

} from '@ant-design/icons';
const FormItem = Form.Item;
class LoginLeft extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tel: '',
      checkNum: '',
      num: '',
      flag: false,
      text: '获取验证码',
      _dura: 0
    }
  }
  handleSubmit = (e) => {
    console.log("login inside");
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields(
      { force: true },
      (errors, values) => {
        onSubmit(errors, values);
      }
    );
  }
  handleReset = () => {
    /**resetFields 会重置整个 Field */
    console.log("reset");

    this.props.form.setFieldsValue({
      username: ""
    });

    //  this.props.form.resetFields();
  }
  // 判断cookie中是否存在倒计时我
  sendCode = () => {
    // console.log(111)
    this.setState({
      flag: true
    })
    let _dura = cookie.load('code');
    let timer = setInterval(() => {
      // console.log(this)
      _dura--;
      let text = '重新获取' + '(' + _dura + ')';
      this.setState({
        _dura,
        text
      })
      cookie.save('code', _dura, _dura)
      if (_dura === 0) {
        text = '点击获取验证码';
        this.setState({
          text,
          flag: false
        })
        clearInterval(timer);
        timer = null;
        cookie.remove('code');
      }
    }, 1000)
  }
  // 发送登陆验证码
  getQuickCheck = () => {
    let tel = this.state.tel;

    cookie.save('code', 60, 60)
    Toast.success('验证码发送成功，请注意查收', 2);
    this.setState({

      flag: true
    })
    this.sendCode();



  }
  render() {
    const { form } = this.props;
    const {
      getFieldDecorator: fd,
    } = form;
    return (
      <div className={styles.lg_cp_form}>
        <Form onSubmit={this.handleSubmit} id={'myform'}>
          <div className={styles.lg_first_content}>
            <FormItem>
              {
                fd('username', {
                  initialValue: "admin",
                  rules: [{
                    requires: true,
                    message: '请输入用户名字'
                  }]
                })
                  (
                    <Input prefix={<TabletOutlined />}
                      onChange={this.handleChange}
                      placeholder={"用户名"}
                    >
                    </Input>
                  )
              }
            </FormItem>
            <FormItem>
              <Button className={styles.lg_reset_button} onClick={this.handleReset}>重置手机号</Button>
            </FormItem>
          </div>
          <div className={styles.lg_sencond_content} >

            <FormItem>
              {

                fd('smscode', {
                  initialValue: "123456",
                  rules: [{

                    requires: true,
                    message: '请输入验证码'
                  }]
                })
                  (
                    <Input prefix={<SafetyOutlined />}
                      onChange={this.handleChange}
                      placeholder={"验证码"}
                    //  id={"username"}
                    >
                    </Input>

                  )
              }

            </FormItem>
            <FormItem>
              <Button className={styles.lg_send_sms_button} disabled={this.state.flag} onClick={this.getQuickCheck.bind(this)}>{this.state.text}</Button>
            </FormItem>

          </div>

          <FormItem>
            {
              fd('password', {
                initialValue: "admin",
                rules: [{
                  requires: true,
                  message: '请输入密码'
                }]
              })
                (
                  <Input prefix={<Icon type='lock' />}
                    onChange={this.handleChange}
                    placeholder={"passeord"}
                    type='password'
                  >
                  </Input>
                )
            }
          </FormItem>
          <FormItem>
            <Button type='primary' htmlType='submit' className={styles.lg_submit_button}>登录</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default Form.create()(LoginLeft);