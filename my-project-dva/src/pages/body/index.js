import {Button} from "antd";
import request from "../../utils/request";

const Body = ()=> {
    const getData = ()=>{
      request('https://tiankaii.cn/apis/getData').then((res)=>{
        console.log(res)
      })
    }
    return (
        <div>
          <Button type="primary" onClick={getData}>cors测试</Button>
        </div>
    )
}
export default Body
