import {Button} from "antd";
import React, {useEffect, useRef} from "react";
import * as faceapi from "face-api.js";
import style from './index.less'

const WebRTCBody = ()=> {
    // video标签的ref
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    let options = null
    let timeout = null

    useEffect(()=>{
      async function loadModels(){
        // 算法模型
        await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
        // 轮廓模型
        await faceapi.loadFaceLandmarkModel("/models");
        // 表情模型
        await faceapi.loadFaceExpressionModel("/models");
      }
      loadModels().then(()=>{
        options = new faceapi.SsdMobilenetv1Options({
          minConfidence: 0.5, // 0.1 ~ 0.9
        });
      });
    },[])
    // 打开摄像头
    const openCamera = async () => {
      videoRef.current.srcObject = await navigator.mediaDevices.getUserMedia({video:true,audio:false})
    }
    // 关闭摄像头
    const closeCamera = async () => {
      // 关闭视频流
      videoRef.current.srcObject.getTracks().forEach(item=>item.stop())
      // video标签的视频路径置空
      videoRef.current.srcObject = null
      //
      canvasRef.current
        .getContext("2d")
        .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      //
      clearTimeout(timeout);
    }
    const loadedmetadata = async ()=> {
      if (!options){
        timeout = setTimeout(() => loadedmetadata());
      } else {
        const result = await faceapi.detectSingleFace(videoRef.current, options).withFaceLandmarks().withFaceExpressions();
        if (result && !videoRef.current.paused) {
          const dims = faceapi.matchDimensions(canvasRef.current, videoRef.current, true);
          const resizeResults = faceapi.resizeResults(result, dims);
          faceapi.draw.drawDetections(canvasRef.current, resizeResults);
          faceapi.draw.drawFaceExpressions(canvasRef.current, resizeResults, 0.05);
        } else {
          canvasRef.current
            .getContext("2d")
            .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
        timeout = setTimeout(() => loadedmetadata());
      }
    }

    return (
      <div className={style.center}>
        <div>
          <Button type="primary" className={style.button} onClick={openCamera}>打开摄像头</Button>
          <Button type="primary" className={style.button} onClick={closeCamera}>关闭摄像头</Button>
        </div>
        <div className={style.face}>
          <video ref={videoRef} autoPlay controls width="640" height="480" onLoadedMetadata={loadedmetadata}/>
          <canvas id="myCanvas" className={style.canvas} ref={canvasRef} width="640" height="480"/>
        </div>
      </div>

    )
}
export default WebRTCBody
