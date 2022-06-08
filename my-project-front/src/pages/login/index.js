import {Button,Row, Col, Form, Input} from "antd";

const Login = ()=>{
    const [form] = Form.useForm()

    const login = (value)=>{
        fetch('http://127.0.0.1:80/login',{
            method:'POST',
            body: JSON.stringify(value),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((res)=>{
            return res.json()
        }).then((text)=>{
            console.log(text)
        })
    }
    const submit = ()=>{
       form.setFieldsValue({
           username:'5555'
       })
    }


    return(
        <Form
            name='login'
            // 绑定form实例
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={login}
            autoComplete="off"
        >
            <Row gutter={8}>
                <Col span={5}>
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名！' }]}
                    >
                        <Input maxLength={20}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={5}>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码！' }]}
                    >
                        <Input maxLength={20}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={8}>
                <Col span={5}>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Col>
                <Col span={5}>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" onClick={submit}>
                            提交2
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}
export default Login
