# vue-dyc360

[![NPM Version](https://img.shields.io/npm/v/art-template.svg)](https://npmjs.org/package/)
[![Node.js Version](https://img.shields.io/node/v/art-template.svg)](http://nodejs.org/download/)
[![Coverage Status](https://coveralls.io/repos/github/aui/art-template/badge.svg)](https://github.com/visionsj/vue-dyc360)

vue-dyc360 是一款运行在手机端的金融投资平台,。

#### (测试使用的数据是连接真实网站的数据，由于服务器配置低,访问会有点慢，建议clone代码并本地运行);

[查看demo请戳这里](http://rrys365.com/dyc360/)（请用chrome手机模式预览）

### 移动端扫描下方二维码

![](https://github.com/visionsj/vue-dyc360/blob/master/screenGif/site.png?raw=true)

#### 郑重说明：本套程序为个人业余时间所作，和真实的投资平台不是一套代码！


# 前言
本人平时负责前端招聘，前来面试的小伙伴都是93后左右的，瞬间感觉自已已经步入了老龄化阶段了。随着前端框架越来越多，社会对前端的要求也越来越高，前端必备的三个MVC框架 angular、vue、react也是越来越流行。冲着学习的态度，本人利用业余时间（公司在转型不加班，呵呵 ……  ^—^）写了这套基于vue2实现的金融理财平台（H5版）。在开发的过程中建议小伙伴们先看下API文档，当然有angular基础的上手起来就很快了，个人觉的vue其实就是react + angular生下来的孩子，为什么这样说呢？ vue结合了react强大的dom树处理力和angular的数据处理能力。花写了2周时间把这个项目基本框架写完了，因为时间仓促很多css就写的很随意了，后面会不断发新的版本进行修复规范！

#### 注意：本程序数据连接的是真实环境的数据（[m.duc360.com](https://m.duc360.com/)）, 暂不开放资金操作页面，想投资的建议还是下载官方APP进行投资

## 技术栈
vue2 + vuex + vue-router + webpack + ES6/7 + fetch + sass + flex 

# 核心功能
- [x] 首页幻灯片 -- 完成
- [x] 投资更表 -- 完成
- [x] 标的介绍 -- 完成
- [x] 个人中心 -- 完成
- [x] 资金记录-- 完成
- [x] 充值、提现 -- 完成
- [x] 优惠券 -- 完成
- [x] 金币、兑换、明细 -- 完成
- [x] 投资记录 -- 完成
- [x] 新闻列表、详细 -- 完成
- [x] 更多 -- 完成
- [x] 登录、注册 -- 完成
- [x] 修改密码 -- 完成
- [x] 个人中心 -- 完成
- [x] 红包 -- 完成
- [x] 上传头像 -- 完成
- [x] 待续...



# 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，nodejs 必须是 6.0 以上版本 ，node 7 是先行版，有可能会出问题，建议使用 node 6 稳定版

```
git clone https://github.com/visionsj/vue-dyc360 

cd vue-dyc360

npm install

```

### 编译环境
```
npm run dev

访问 http://localhost:8085
```


### 线上版本
```
npm run build

生成的dyc360文件夹放在服务器即可正常访问


# 页面截图


### 首页

<img src="https://github.com/visionsj/vue-dyc360/blob/master/screenGif/index.jpg?raw=true"/> <img src="https://github.com/visionsj/vue-dyc360/blob/master/screenGif/index.gif?raw=true" />

### 登录注册

<img src="https://github.com/visionsj/vue-dyc360/blob/master/screenGif/login.jpg?raw=true"/> <img src="https://github.com/visionsj/vue-dyc360/blob/master/screenGif/reg.jpg?raw=true" />


### 投资列表

<img src="https://github.com/visionsj/vue-dyc360/blob/master/screenGif/invest.jpg?raw=true"/>


### 我的

<img src="https://github.com/visionsj/vue-dyc360/blob/master/screenGif/user.jpg?raw=true"/>

### 更多

<img src="https://github.com/visionsj/vue-dyc360/blob/master/screenGif/more.jpg?raw=true"/>


# 页面结构

待续...


# 目标

开发更多更好用的程序，包括pc前台+h5+后台管理系统

# 作者

@author  何艳辉 (vision_sj@163.com)



### 加微信请扫二维码

![](https://github.com/visionsj/vue-dyc360/blob/master/screenGif/weixin.png?raw=true)