import React, {useRef} from "react";
import Upload from "antd/es/upload/Upload";
import {Button} from "antd";
import style from "../../webRTC/WebRTCBody/index.less";

const faceRecognitionBody = ()=> {
    const canvasRef = useRef(null)
    return (
      <div>
        <div>
          <Upload
            name='file'
            accept="image/png,.jpg"
          >
            上传：<Button>图片上传</Button>
          </Upload>
          <canvas id="myCanvas" className={style.canvas} ref={canvasRef} width="640" height="480"/>
        </div>
      </div>
    )
}
export default faceRecognitionBody
