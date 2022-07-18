# leetcode-generate-statements-chrome-extension
力扣网站上，根据输入自动生成调用语句的chrome插件。

### 更新：引入antd

1. 更新typescript到最新版。220718的最新版是`4.7.4`。
2. 重新install`@types/chrome`等类型定义的库。

由于我用的idea是2018的版本，用`yarn`的话无法检测到`@types/chrome`等类型定义，导致`yarn run build`失败。所以我在此同时用了npm（所以`add ant design`的commit引入了`package-lock.json`），修改好`package.json`以后直接`npm install`即可。

### 安装方式

#### 自行编译

`git clone`获取代码，`yarn`下载依赖，`yarn run build`构建，dist文件夹生成的文件即所求。

#### 加载扩展程序

chrome浏览器右上角三个点 => 更多工具 => 扩展程序，进入`chrome://extensions/`页面。

点击”加载已解压的扩展程序”，选择文件夹即可。

### 功能

~~功能目前很不完善因为我太菜了~~

#### leetcode网页

由于力扣网页的js监听了DOMContentLoaded事件，且动作是删除之前对该事件的监听，故我改为监听body的click事件。因此在网页加载完成后，**点击一下页面任意处**，即可输出翻译结果。

目前支持：问题页面、周赛页面。

#### popup

输入测试数据，获取输出结果即可。