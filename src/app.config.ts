export default defineAppConfig({
    rendererOptions: {
        skyline: {
            disableABTest: true,
            defaultDisplayBlock: true,
            // @ts-ignore
            sdkVersionBegin: "2.29.2", // 基础库最低版本
            sdkVersionEnd: "15.255.255", // 填最大值，否则之后的新版本会不生效
            iosVersionBegin: "8.0.41", // iOS 微信最低版本
            iosVersionEnd: "15.255.255", // 填最大值，否则之后的新版本会不生效
            androidVersionBegin: "8.0.40", // 安卓微信最低版本
            androidVersionEnd: "15.255.255" // 填最大值，否则之后的新版本会不生效
        }
    },
    // renderer: 'skyline',
    lazyCodeLoading: "requiredComponents",
    pages: [
        'pages/index/index',
        'pages/login/index',
    ],
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
        // 微信全局设置自定义导航栏
        navigationStyle: 'default',
    }
})
