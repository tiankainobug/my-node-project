import {Button, Row, Col, Form, Input} from "antd";
import './index.css';
import {useNavigate} from 'react-router-dom'

const Login = ()=>{
    const [form] = Form.useForm()
    const navigate = useNavigate();
    const submit = (value)=>{
        fetch('http://127.0.0.1:80/login',{
            method:'POST',
            body: JSON.stringify(value),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((res)=>{
            return res.json()
        }).then((res)=>{
            if (res.success){
               return navigate('/home')
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
                className='login'
            >
                <h2>个人博客系统登录</h2>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name="username"
                            rules={[{required: true, message: '请输入用户名！'}]}
                            className='loginItem'
                        >
                            <Input placeholder='请输入用户名' maxLength={20}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: '请输入密码！'}]}
                        >
                            <Input placeholder='i请输入密码' maxLength={20}/>
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
export default Login
