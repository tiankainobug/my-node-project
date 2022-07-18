import React, {useEffect, useRef} from "react";
import style from "./index.less";
import * as faceapi from "face-api.js";

const faceRecognitionBody = ()=> {
    const canvasRef = useRef(null)
    const imgRef = useRef(null)
    let sampleArr = [
        {
          name: "欣小萌",
          img: [
            "face-img/xxm/xxm01.png",
            "face-img/xxm/xxm02.png",
            "face-img/xxm/xxm03.png",
            "face-img/xxm/xxm04.png",
          ],
        },
        {
          name: "旭旭宝宝",
          img: [
            "face-img/xxbb/xxbb01.png",
            "face-img/xxbb/xxbb02.png",
            "face-img/xxbb/xxbb03.png",
            "face-img/xxbb/xxbb04.png",
          ],
        },
      {
        name: "易烊千玺",
        img: [
          "face-img/yyqx/yyqx01.png",
          "face-img/yyqx/yyqx02.png",
          "face-img/yyqx/yyqx03.png",
          "face-img/yyqx/yyqx04.png",
          "face-img/yyqx/yyqx05.png",
        ],
      },
    ]
    let faceMatcher = null
    let options = null
    useEffect(()=>{
      loadModels().then(()=>{
        options = new faceapi.SsdMobilenetv1Options({
          minConfidence: 0.5, // 0.1 ~ 0.9
        });
        recognitionStart()
      })
    },[])

    // 加载模型
    const loadModels = async ()=> {
      // 算法模型
      await faceapi.nets.ssdMobilenetv1.loadFromUri('./models')
      // 边框模型
      await faceapi.loadFaceLandmarkModel("/models");
      // 人脸识别模型
      await faceapi.loadFaceRecognitionModel("/models");
      await fnfaceMatcher();
    }
    // 生成人脸匹配矩阵数组对象，样本图片同步转码
    const fnfaceMatcher = async ()=> {
      const labeledFaceDescriptors = await Promise.all(
        sampleArr.map(async (item) => {
          // 临时图片转码数据，将图片对象转数据矩阵对象
          let descriptors = [];
          for (let image of item.img) {
            const imageEl = await faceapi.fetchImage(image);
            descriptors.push(await faceapi.computeFaceDescriptor(imageEl));
          }
          // 返回图片用户和图片转码数组
          return new faceapi.LabeledFaceDescriptors(item.name, descriptors);
        })
      );
      // 人脸匹配矩阵数组对象转码结果
      faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
    }

    // 开始识别
    const recognitionStart = async ()=> {
      const results = await faceapi
        .detectAllFaces(imgRef.current, options)
        .withFaceLandmarks()
        .withFaceDescriptors();
      faceapi.resizeResults(results, imgRef.current);
      const resizedResults = faceapi.resizeResults(results, imgRef.current);
      resizedResults.forEach(({ detection, descriptor }) => {
        const label = faceMatcher.findBestMatch(descriptor).toString();
        new faceapi.draw.DrawBox(detection.box, { label }).draw(canvasRef.current);
      });
    }

    const uploadImg = (e)=> {
      if (!e.target.files.length) return;
      // 将文件显示为图像并识别
      faceapi.bufferToImage(e.target.files[0]).then((img) => {
        imgRef.current.src = img.src;
        canvasRef.current
          .getContext("2d")
          .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        recognitionStart()
      });
    }


    return (
      <div className={style.box}>
        上传图片：
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={uploadImg}
        />
        <div className={style.imgDiv}>
          <img className={style.myImg} src="/face-img/img.png" ref={imgRef} alt='图像'/>
          <canvas id="myCanvas" className={style.canvas} ref={canvasRef} width="640" height="480"/>
        </div>
        <div className={style.imgList}>
          <h2><b>样本库：</b></h2>
          <div>
            <label htmlFor="">萌小新</label>
            {sampleArr[0].img.map((item)=>{
              return <img src={item} alt="1" width='90' height='90'/>
            })}
          </div>
          <div>
            <label htmlFor="">旭旭宝宝</label>
            {sampleArr[1].img.map((item)=>{
              return <img src={item} alt="1" width='90' height='90'/>
            })}
          </div>
          <div>
            <label htmlFor="">易烊千玺</label>
            {sampleArr[2].img.map((item)=>{
              return <img src={item} alt="1" width='90' height='90'/>
            })}
          </div>
        </div>

      </div>
    )
}
export default faceRecognitionBody
