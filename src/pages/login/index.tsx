import Taro, {useDidHide, useDidShow, useLoad, useReady} from "@tarojs/taro";
import {Button, Image, Text, View} from "@tarojs/components";
import './index.scss'
import {useState} from "react";
import {useButtonEffect} from '@/common/hooks';
import {wechatLogin} from "@/request/WechatUtil";

export default function Login() {
    const [openId, setOpenId] = useState<string | null>(null);

    const [isVisible, setIsVisible] = useState(false);

    const [localLoginPressed, localLoginDown, localLoginUp] = useButtonEffect();
    const [otherLoginPressed, otherLoginDown, otherLoginUp] = useButtonEffect();

    useDidShow(() => {
        setIsVisible(true);
    });

    useDidHide(() => {
        setIsVisible(false);
    });
    useReady(() => {

    });
    useLoad(() => {
        const startTime = Date.now();
        Taro.showLoading();
        Taro.login({
            success: (result) => {
                const endTime = Date.now();
                if (result.errMsg === 'login:ok') {
                    // 计算请求所花费的时间
                    const elapsedTime = endTime - startTime;
                    // 最少等待的时间
                    const minWaitTime = 150;

                    function _loginByWechatLogin() {
                        Taro.hideLoading();
                        setOpenId(result.code);
                    }

                    // 如果请求时间不够最少等待时间，则等待剩余时间后执行操作
                    if (elapsedTime < minWaitTime) {
                        setTimeout(() => {
                            _loginByWechatLogin();
                        }, minWaitTime - elapsedTime);
                    } else {
                        _loginByWechatLogin();
                    }
                } else {
                    Taro.hideLoading();
                    Taro.showToast({title: result.errMsg, icon: 'none'});
                }
            },
            fail: (result) => {
                Taro.hideLoading();
                console.log(`e===>>${result.errMsg}`)
                Taro.showToast({title: result.errMsg, icon: 'none'});
            }
        });
    });


    return (
        <View className={`index ${isVisible ? 'fade-in' : 'fade-out'}`}>
            <View className='image-icon'>
                <Image className='icon' src={''}/>
            </View>
            <Text className='icon-text'>U题</Text>
            <View className='text-box'>
                <View className='line-container'>
                    <View className='text-line'/>
                    <Text className='line-text'>学习在于勤</Text>
                </View>
            </View>


            <Button className={`local-login ${!localLoginPressed ? 'fade-in' : 'fade-out'}`}
                    onTouchStart={localLoginDown}
                    onTouchEnd={localLoginUp}
                    open-type="getPhoneNumber"
                    onGetPhoneNumber={async (detail) => {
                        const {errMsg,encryptedData, iv,code} = detail.detail;
                        if(errMsg==="getPhoneNumber:ok" && openId) {
                            try {
                                const res3 = await wechatLogin({
                                    openId: openId,
                                    encryptedData,
                                    iv,
                                });
                                console.log(`wechatLogin===${res3.openId}`);
                                Taro.showLoading({title: '加载中'})
                                const {token} = res3;
                                Taro.setStorageSync('token', token);
                                Taro.hideLoading();
                                // clearUserCourseData()
                                Taro.showToast({title: '登录成功！', icon: 'none'});
                                setTimeout(() => {
                                    Taro.reLaunch({
                                        url: '/pages/index/index',
                                    })
                                }, 1000);
                            } catch (error) {
                                console.log(`wechatLogin=error==${error}`);
                                Taro.hideLoading();
                                Taro.showToast({title: '登录失败！请重新登录', icon: 'none'});
                                setTimeout(() => {
                                    Taro.reLaunch({
                                        url: '/pages/login/index',
                                    })
                                }, 2000);
                            }
                        }else {
                            if(detail.detail.errMsg.match('getPhoneNumber:fail')) {
                                // 解析字符串并提取数据
                                const regex = /(\w+):(.+) Error: (.+) errorCode:(.+)/;
                                const matchResult = detail.detail.errMsg.match(regex);
                                if (matchResult !== null) {
                                    const [, getPhoneNumber, method, status, error] = matchResult;
                                    // 构建 JSON 对象
                                    const result = {
                                        getPhoneNumber,
                                        method,
                                        status,
                                        error
                                    };
                                    if(error === '-10000') {
                                        Taro.showToast({title: status, icon: 'none',duration:5000});
                                        return;
                                    }
                                }
                            }
                            Taro.showToast({title: '一键登录需要点击允许哦~', icon: 'none',});
                        }
                    }
                    }
            >本机号码一键登录</Button>
            <View className={`other-login ${!otherLoginPressed ? 'fade-in' : 'fade-out'}`}
                  onTouchStart={otherLoginDown}
                  onTouchEnd={otherLoginUp}>其他手机号码登录</View>
        </View>
    )
}
