import {Button, Row, Col, Form, Input,message} from "antd";
import style from './index.less';
import request from "../../utils/request";
import {connect} from "dva";

const Login = props => {
    const {
      dispatch,
      history
    } = props
    const [form] = Form.useForm()
    const submit = (value)=>{
      request('https://tiankaii.cn/apis/login',{
        method:'POST',
        body: JSON.stringify(value),
        headers: {
            'Content-Type': 'application/json'
        }
      }).then((res)=>{
        if (res.success){
          message.success('登录成功！')
          const token = res.token
          localStorage.setItem('token',token)
          dispatch({
            type:'login/saveToken',
            payload:token
          })
          history.push('/home')
        }else{
          message.error('用户名或密码输入错误！')
        }
      })
    }

    return(
        <div>
            <Form
                name='login'
                // 绑定form实例
                form={form}
                onFinish={submit}
                autoComplete="off"
                className={style.login}
            >
                <h2>个人博客系统登录</h2>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name="username"
                            rules={[{required: true, message: '请输入用户名！'}]}
                        >
                            <Input placeholder='请输入用户名,tiank' maxLength={20}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: '请输入密码！'}]}
                        >
                            <Input placeholder='请输入密码,Qq133242' maxLength={20}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
export default connect(({login})=>({
  login
}))(Login)
