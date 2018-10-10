var fs = require('fs')
var path = require('path')

const srcDir = path.join(__dirname,'/front/go2web/build');
const tarDir = path.join(__dirname,'/server/go2web/app/public/index');
// 删除文件夹
let delDir = dirPath => {
  if(!fs.existsSync(dirPath)) return;
  const filelists = fs.readdirSync(dirPath);
  filelists.forEach(v => {
    let stats = fs.statSync(path.join(dirPath,v));
    if(stats.isFile()) fs.unlinkSync(path.join(dirPath,v));
    if(stats.isDirectory()) delDir(path.join(dirPath,v));
  })
  fs.rmdirSync(dirPath);
}

// 复制文件夹
let copy = (srcPath, tarPath) => {
  if(!fs.existsSync(srcPath)){
    console.log('文件夹不存在:' + srcPath);
  }
  if(!fs.existsSync(tarPath)){
    fs.mkdirSync(tarPath);
  }
  const filelists = fs.readdirSync(srcPath);
  filelists.forEach(v => {
    let stats = fs.statSync(path.join(srcPath,v));
    if(stats.isFile()) {
      let data = fs.readFileSync(path.join(srcPath,v));
      fs.writeFileSync(path.join(tarPath,v),data);
    }
    if(stats.isDirectory()) {
      if(!fs.existsSync(path.join(tarPath,v))) {
        fs.mkdirSync(path.join(tarPath,v));
      }
      copy(path.join(srcPath,v), path.join(tarPath,v));
    }
  })
}
delDir(tarDir);
fs.mkdirSync(tarDir);
copy(srcDir, tarDir);
let data = fs.readFileSync(path.join(tarDir,'/index.html')).toString();
data = data.replace('href="/manifest.json"', 'href="./manifest.json"')
data = data.replace('href="/favicon.ico"', 'href="./favicon.ico"')
data = data.replace('href="/static/css/main', 'href="./static/css/main')
data = data.replace('src="/static/js/main.', 'src="./static/js/main.')
fs.writeFileSync(path.join(tarDir,'/index.html'), data);