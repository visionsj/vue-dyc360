import Vue from 'vue'
Vue.http.options.emulateJSON = true;

//获取用户信息
export const loginInfo =  () => Vue.http.get('/account/getUserInfo', {})

//获取导航条
export const getBannerList =  (bannerType) => Vue.http.post('/common/getBannerList', {
	bannerType: bannerType
})

//获取推荐标的
export const getRecommendedBorrowList =  () => Vue.http.post('/product/getRecommendedBorrowList', {
})

//获取推荐消息
export const getSimpleArticleList =  () => Vue.http.post('/article/getSimpleArticleList', {
})

//获取首页活动
export const getActiveActivity =  () => Vue.http.post('/common/getActiveActivity', {
})

//获取产品列表数据
export const getBorrowList =  (pageNo, pageSize, terminalType) => Vue.http.post('/product/getBorrowList', {
	pageNo: pageNo,
	pageSize: pageSize,
	terminalType: terminalType
})


//获取标的详情
export const getBorrowDetail =  (borrowNo) => Vue.http.post('/product/getBorrowDetail', {
	borrowNo: borrowNo
})

//获取标的购买记录
export const getInvestRecordList =  (borrowNo, pageSize) => Vue.http.post('/product/getInvestRecordList', {
	borrowNo: borrowNo,
	pageSize: pageSize
})

//借款人详情
export const repayUserList =  (parentId, pageSize) => Vue.http.post('/product/repayUserList', {
	parentId: parentId,
	pageSize: pageSize
})

//获取红包数量
export const getRedPacketCount =  () => Vue.http.post('/account/getRedPacketCount', {
})

//购买
export const subscribeBorrow =  () => Vue.http.post('/trade/subscribeBorrow', {
})

//验证红包能否使用
export const checkRedPacket =  () => Vue.http.post('/account/checkRedPacket', {
})

//获取投资时的的红包列表
export const getInvestRedPacketList =  () => Vue.http.post('/account/getInvestRedPacketList', {
})


//用户登录
export const loginUser =  (activeId, loginRef, username, password) => Vue.http.post('/user/loginUser', {
	flowRef: '',
	activeId: activeId,
	loginRef: loginRef,
	sourceType: "login",
	username: username,
	password: password,
	terminalType : 3
})

//用户登出
export const logoutUser =  () => Vue.http.post('/user/logoutUser', {
})

//注册用户
export const registerUser =  (username, sourceType, mobilePhone, vcode, verifyCode, password, inviteMobilePhone) => Vue.http.post('/user/registerUser', {
	username: username,
	sourceType: sourceType,
	mobilePhone: mobilePhone,
	vcode: vcode,
	verifyCode: verifyCode,
	password: password,
	inviteMobilePhone: inviteMobilePhone,
})

//获取验证码
export const getVerifyCode =  (mobilePhone, vcode, verifyCodeType) => Vue.http.post('/user/getVerifyCode', {
	mobilePhone: mobilePhone,
	vcode: vcode,
	verifyCodeType: verifyCodeType
})

//找回支付密码获取验证码
export const getSessionVerifyCode =  () => Vue.http.post('/user/getSessionVerifyCode', {
})

//校验验证码
export const checkVerifyCode =  () => Vue.http.post('/user/checkVerifyCode', {
})

//忘记登录密码
export const forgetLoginPassword =  (mobilePhone, verifyCode, newPassword, repeatPassword) => Vue.http.post('/user/forgetLoginPassword', {
	mobilePhone: mobilePhone,
	verifyCode: verifyCode,
	newPassword: newPassword,
	repeatPassword: repeatPassword,
})

//用户签到
export const signIn =  () => Vue.http.post('/user/signIn', {
})

//获取配置URL
export const getConfigureUrl =  () => Vue.http.post('/common/getConfigureUrl', {
})

//检测用户签到状态
export const checkSignInStatus =  () => Vue.http.post('/user/checkSignInStatus', {
})

//修改登录密码
export const modifyLoginPassword =  (oldPassword, newPassword, repeatPassword) => Vue.http.post('/user/modifyLoginPassword', {
	oldPassword: oldPassword,
	newPassword: newPassword,
	repeatPassword: repeatPassword
})

//设置交易密码
export const setTradePassword =  (tradePassword) => Vue.http.post('/user/setTradePassword', {
	tradePassword: tradePassword
})

//修改交易密码
export const modifyTradePassword =  (oldTradePassword, newTradePassword) => Vue.http.post('/user/modifyTradePassword', {
	oldTradePassword: oldTradePassword,
	newTradePassword: newTradePassword
})

//找回支付密码
export const forgetTradePassword =  () => Vue.http.post('/user/forgetTradePassword', {
})

//获取我的邀请内容
export const getInviteContent =  () => Vue.http.post('/user/getInviteContent', {
})

//获取用户签到得历史状态
export const getHistoryUserSiginList =  () => Vue.http.post('/user/getHistoryUserSiginList', {
})

//登录成功绑定用户到设备
export const loginBindDevice =  () => Vue.http.post('/account/loginBindDevice', {
})

//我的账户资金
export const getUserAssetInfo =  () => Vue.http.post('/account/getUserAssetInfo', {
})

//我的账户信息状态
export const getUserAccountInfo =  () => Vue.http.post('/account/getUserAccountInfo', {
})

//实名认证
export const checkRealNameAuth =  (personName, personCardNo) => Vue.http.post('/account/checkRealNameAuth', {
	personName: personName,
	personCardNo: personCardNo
})

//验证用户身份
export const checkUserInfo =  () => Vue.http.post('/account/checkUserInfo', {
})

//绑定银行卡
export const bindCardAuth =  (cardNo) => Vue.http.post('/account/bindCardAuth', {
	cardNo: cardNo
})

//用户金币
export const getGoldCoinInfo =  () => Vue.http.post('/account/getGoldCoinInfo', {
})

//获取金币收支明细列表
export const getGoldCoinList =  (pageSize) => Vue.http.post('/account/getGoldCoinList', {
	pageSize: pageSize
})

//获取红包列表
export const getRedPacketList =  (pageNo, pageSize) => Vue.http.post('/account/getRedPacketList', {
	pageNo: pageNo, 
	pageSize: pageSize
})

//获取我的投资列表
export const getInvestOrderList =  (holdingStatus, pageNo, pageSize) => Vue.http.post('/account/getInvestOrderList', {
	holdingStatus: holdingStatus,
	pageNo: pageNo,
	pageSize: pageSize
})

//获取投资记录详情
export const getInvestOrderDetail =  () => Vue.http.post('/account/getInvestOrderDetail', {
})

//获取我的投资的收益统计
export const getProfitStatis =  () => Vue.http.post('/account/getProfitStatis', {
})

//获取用户绑定的银行卡列表
export const getUserBindBankList =  () => Vue.http.post('/account/getUserBindBankList', {
})

//获取金币兑换商品记录列表
export const exchangeGoldCoinWeb =  (redPacketIds, exchangeCounts) => Vue.http.post('/account/exchangeGoldCoinWeb', {
	redPacketIds: redPacketIds,
	exchangeCounts: exchangeCounts
})

//浙商强制开户
export const forceOpenAccount =  () => Vue.http.post('/account/forceOpenAccount', {
})

//浙商充值的时候获取银行卡信息
export const queryOpenCardInfo =  () => Vue.http.post('/account/queryOpenCardInfo', {
})

//提现
export const withdrawCashOrder =  () => Vue.http.post('/trade/withdrawCashOrder', {
})

//充值
export const rechargeCash =  () => Vue.http.post('/trade/rechargeCash', {
})

//充值确认
export const rechargeConfirm =  () => Vue.http.post('/trade/rechargeConfirm', {
})

//验证交易密码
export const validateTradePassword =  () => Vue.http.post('/trade/validateTradePassword', {
})

//短信接口
export const sendDepositorySms =  () => Vue.http.post('/trade/sendDepositorySms', {
})

//发送充值短信
export const sendRechargeSms =  () => Vue.http.post('/trade/sendRechargeSms', {
})

//存管提现
export const withdraw =  () => Vue.http.post('/trade/withdraw', {
})

//存管充值
export const depositoryRecharge =  () => Vue.http.post('/trade/depositoryRecharge', {
})

//浙商存管可提现余额
export const queryCanWithdrawMoney =  () => Vue.http.post('/trade/queryCanWithdrawMoney', {
})

//浙商存管提现短信
export const sendWithdrawSms =  () => Vue.http.post('/trade/sendWithdrawSms', {
})

//获取提现限制
export const queryWithdrawLimit =  () => Vue.http.post('/trade/queryWithdrawLimit', {
})

//浙商开户初始化
export const init =  () => Vue.http.post('/openAccount/init', {
})

//浙商开户提交
export const submit =  () => Vue.http.post('/openAccount/submit', {
})

//获取提现记录列表
export const getWithdrawCashList =  (pageSize) => Vue.http.post('/account/getWithdrawCashList', {
	pageSize: pageSize
})

//获取充值记录列表
export const getRechargeList =  (pageSize) => Vue.http.post('/account/getRechargeList', {
	pageSize: pageSize
})

//提交用户信息
export const saveUserInfo =  () => Vue.http.post('/account/saveUserInfo', {
})

//投资人还款计划
export const getUserRepayMentList =  () => Vue.http.post('/account/getUserRepayMentList', {
})

//标的的还款计划
export const getBorrowerRepayMentPlanList =  () => Vue.http.post('/account/getBorrowerRepayMentPlanList', {
})

//获取用户地址列表
export const getUserAddressList =  () => Vue.http.post('/account/getUserAddressList', {
})

//添加用户地址
export const addUserAddress =  () => Vue.http.post('/account/addUserAddress', {
})

//删除用户地址
export const deleteUserAddress =  () => Vue.http.post('/account/deleteUserAddress', {
})

//设置用户默认收货地址
export const setDefaultUserAddress =  () => Vue.http.post('/account/setDefaultUserAddress', {
})

//修改用户地址
export const modifyUserAddress =  () => Vue.http.post('/account/modifyUserAddress', {
})

//用户推广人统计信息
export const userStat =  () => Vue.http.post('/account/promot/userStat', {
})

//用户推广排名
export const rank =  () => Vue.http.post('account/promot/rank', {
})

//用户推广当前等级信息
export const promotlevel =  () => Vue.http.post('/account/promot/promotlevel', {
})

//查看(推广)自己排名
export const myPromotRank =  () => Vue.http.post('/account/promot/myPromotRank', {
})

//推广提成记录
export const appPage =  () => Vue.http.post('/account/promot/investRecord/appPage', {
})

//app的邀请人记录列表
export const getPromotInviteRecordAppPage =  () => Vue.http.post('/account/getPromotInviteRecordAppPage', {
})

//获取资金记录
export const fundRecordAppPage =  (type, pageNo, pageSize) => Vue.http.post('/account/fund/FundRecordAppPage', {
	type: type,
	pageNo: pageNo,
	pageSize: pageSize,
})

//用户活期统计信息
export const statistics =  () => Vue.http.post('/account/current/statistics', {
})

//获取所有的活期标的列表
export const list =  () => Vue.http.post('/current/app/list', {
})

//注册设备
export const registerDevice =  () => Vue.http.post('/common/registerDevice', {
})

//获取省份列表
export const getProvinceList =  () => Vue.http.post('/common/getProvinceList', {
})

//获取城市列表
export const getCityList =  () => Vue.http.post('/common/getCityList', {
})

//获取支行银行列表
export const getBranchBankList =  () => Vue.http.post('/common/getBranchBankList', {
})

//获取金币可兑换的商品列表
export const getCouponForExchange =  (pageSize) => Vue.http.post('/account/getCouponForExchange', {
	pageSize: pageSize
})

//兑换
export const activate =  (code) => Vue.http.post('/redeem/activate', {
	code: code
})

//获取服务器时间
export const getServerTime =  () => Vue.http.post('/common/getServerTime', {
})

//上传头像
export const headPicUpload =  (frontImage) => Vue.http.post('/common/headPicUpload', {
	 fileStr: frontImage
})

//查询充值和提现是否可用
export const interceptRechargeAndWithdraw =  () => Vue.http.post('/common/interceptRechargeAndWithdraw', {
})

//获取银行列表
export const getBankList =  () => Vue.http.post('/common/getBankList', {
})

//获取充值限额接口
export const getPayChannelLimit =  () => Vue.http.post('/common/getPayChannelLimit', {
})

//获取我的礼品列表
export const getUserGiftList =  (pageNo, pageSize) => Vue.http.post('/gift/getUserGiftList', {
	pageNo: pageNo,
	pageSize: pageSize
})

//获取新闻列表
export const getArticleWebPage =  (pageNo, siteId, pageSize) => Vue.http.post('/article/getArticleWebPage', {
	pageNo: pageNo,
	siteId: siteId,
	pageSize: pageSize
})

//获取新闻详细
export const getArticle =  (id) => Vue.http.post('/article/getArticle', {
	id: id,
})

