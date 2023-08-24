export default defineAppConfig({
  pages: [
    'pages/index/index'
  ],
  // 打开H5路由动画
  animation: true,
  darkmode: true,
  themeLocation: 'theme.json',
  debugOptions: {
    enableFPSPanel: true
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '',
    navigationBarTextStyle: 'black',
    allowsBounceVertical: "YES",
    // 微信全局设置自定义导航栏
    navigationStyle: 'custom',
    // 支付宝全局设置自定义导航栏
    transparentTitle: 'always',
    titlePenetrate: 'YES',
  }
})
