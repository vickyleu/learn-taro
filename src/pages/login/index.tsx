import {useReady,useDidShow,useDidHide} from "@tarojs/taro";
import {View} from "@tarojs/components";
import './index.scss'
import {useState} from "react";

export default function Login(){
    const [isVisible, setIsVisible] = useState(false);
    useDidShow(() => {
        setIsVisible(true);
    });

    useDidHide(() => {
        setIsVisible(false);
    });
    useReady(()=>{

    })
    return (
        <View className={`index ${isVisible ? 'fade-in' : 'fade-out'}`}>
        </View>
    )
}
