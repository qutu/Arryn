## Arryn

百应景区通 Webapp 基于 Vue.js 与 Webpack 构建

### 开发工作流
需要安装 Webpack 和相关依赖，安装完毕后执行 `npm run dev`
```bash
$ npm install .
$ npm run dev
```
执行 `npm run dev` 会在本地的 `http://localhost:8080/` 开启一个 Web 服务，此服务会观察本地文件变动自动编译最终的静态资源文件。
此服务托管的是 `./dist` 目录下的 `index.html` 文件，相应资源是虚拟的（即请求即时编译）

### 编译静态资源
开发完成后需要编译静态资源，直接使用 nginx 反代 `./dist` 目录即可
```bash
$ npm run build
```
执行 `npm run build` 会编译相关的 js 与 css 文件到 `./dist` 文件夹