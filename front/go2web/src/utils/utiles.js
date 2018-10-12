let Utils = ()=>{
  let ENV = '';
  let func = {};

  // 配置
  func.Config = {};
  func.Config.urlRoot = '';
  
  // 基础数据访问
  func.baseFetch = (option)=>{
    option = Object.assign({}, {
      url: '',
      type: '',
      data: null,
      success: () => {},
      error: () => {}
    }, option);
    let setting = {
      method: option.type.toUpperCase(),
      // mode: "no-cors",
      credentials: 'include',
      headers: {
        // 'Access-Control-Allow-Credentials': true,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    } 
    if(option.data != null){
      setting.body = JSON.stringify(option.data);
    }
    // option.url = 'http://www.17exam.com/' + option.url;
    fetch(option.url, setting).then((res) => {

        if (res.status !== 200) {
          option.error(res);
          return null;
        }
        return res.json()
      }
    )
    .then((data) => {
        option.success(data)
      }
    )
  }

  // 异步上传文件，接受json
  func.baseFetchFile = (option)=>{
    option = Object.assign({}, {
      url: '',
      formData: {},
      success: () => {},
      error: () => {}
    }, option);
    let setting = {
      method: 'POST',
      credentials: 'include',
      body: option.formData
    }; 
    fetch(option.url, setting).then(
        (res) => {
          if (res.status !== 200) {
            option.error(res);
            return null;
          }
          return res.json()
        }
      )
      .then((data) => {
        option.success(data);
      })
  }

  // 请求数据，返回的是字符串
  func.baseFetchText = (option) => {
    option = Object.assign({}, {
      url: '',
      type: '',
      data: null,
      success: () => {},
      error: () => {}
    }, option);
    let setting = {
      method: option.type.toUpperCase(),
      // mode: "no-cors",
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    } 
    if(option.data != null){
      setting.body = JSON.stringify(option.data);
    }
    fetch(option.url, setting).then(
        (res) => {
          if (res.status !== 200) {
            option.error(res);
            return null;
          }
          return res.text()
        }
      )
      .then((data) => {
        option.success(data)
      })
  }

  // 对象的深拷贝
  func.deepCopy = (o) => {
    if (o instanceof Array) {
      var n = [];
      for (var i = 0; i < o.length; ++i) {
        n[i] = func.deepCopy(o[i]);
      }
      return n;
    } else if (o instanceof Function) {
      var n = new Function("return " + o.toString())();
      return n
    } else if (o instanceof Object) {
      var n = {}
      for (var i in o) {
        n[i] = func.deepCopy(o[i]);
      }
      return n;
    } else {
      return o;
    }
  }

  // 设置cookie
  func.setCookie = (name, value) => {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ';path=/;';
  }

  // 获取cookie
  func.getCookie = (name) => {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  
    if (arr = document.cookie.match(reg))
  
      return unescape(arr[2]);
    else
      return null;
  }

  // 删除cookie
  func.delCookie = (name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = func.getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }

  // 图片压缩
  // 使用方法
  // Utils.compressImg({
  //   file:this.state.fileList1[0],
  //   success:(file,name)=>{
  //     formData.append("trademarks",file,name);
  //   }
  // })
  func.compressImg = (option) => {
    let reader = new FileReader();
    let img = new Image();
    let file = option.file;
    let success = option.success;
    if (file == null || success == null) {
      console.log('use error,lack file or success func!');
      return;
    }
  
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
  
    img.onload = function () {
      let originWidth = this.width;
      let originHeight = this.height;
      //最大尺寸限制
      let maxWidth = 400,
        maxHeight = 400;
      //目标尺寸
      let targetWidth = originWidth,
        targetHeight = originHeight;
      //图片尺寸超出限制
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
          // 更宽，按照宽度限定尺寸
          targetWidth = maxWidth;
          targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
          targetHeight = maxHeight;
          targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
      }
      // canvas对图片进行缩放
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      // 清除画布
      context.clearRect(0, 0, targetWidth, targetHeight);
      // 图片压缩
      context.drawImage(img, 0, 0, targetWidth, targetHeight);
      //2进制
      canvas.toBlob(function (blob) {
        success(blob, file.name);
      }, file.type || 'image/png');
    }
    // 文件base64化，以便获知图片原始尺寸
    reader.onload = function (e) {
      img.src = e.target.result;
    };
    //加载图片
    reader.readAsDataURL(file);
  }
  func.mdDecorate = html => {
    const patt1 = /<(a[\s\S]*?)>[\s\S]*?<\/a>/g;
    let r = patt1.exec(html);
    while (r) {
      console.log(r);
      
      let str = r[0], str1 = r[1];
      str = str.replace(str1, str1 + ' target="_blank"');
      html = html.replace(r[0], str);
      r = patt1.exec(html);
    }
    return html;
  }

  return {
    func
  }
}

export default Utils().func;











