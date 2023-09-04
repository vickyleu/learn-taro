import {useDidHide, useDidShow, useReady} from "@tarojs/taro";
import {Button, Image, Text, View} from "@tarojs/components";
import './index.scss'
import {useState} from "react";
import {useButtonEffect} from '@/common/hooks';

export default function Login() {
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

    })

    return (
        <View className={`index ${isVisible ? 'fade-in' : 'fade-out'}`}>
            <View className='image-icon'>
                <Image className='icon' src={''}/>
            </View>
            <Text className='icon-text'>U题</Text>
            <View className='text-box'>
                <View className='line-container'>
                    <View className='text-line' />
                    <Text className='line-text'>学习在于勤</Text>
                </View>
            </View>


            <Button className={`local-login ${!localLoginPressed ? 'fade-in' : 'fade-out'}`}
                    onTouchStart={localLoginDown}
                    onTouchEnd={localLoginUp}
                    onClick={() => {

                    }
                    }
            >本机号码一键登录</Button>
            <View className={`other-login ${!otherLoginPressed ? 'fade-in' : 'fade-out'}`}
                  onTouchStart={otherLoginDown}
                  onTouchEnd={otherLoginUp}>其他手机号码登录</View>
        </View>
    )
}
