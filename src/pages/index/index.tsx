// @ts-ignore
import {Button, Canvas, Image, ScrollView, Text, View} from '@tarojs/components'
import Taro, {useLoad, useReady} from '@tarojs/taro'
import './index.scss'
import {useState} from 'react'
import lottie from "lottie-miniprogram";


export default function Index() {
    useReady(() => {
        Taro.createSelectorQuery().select('#canvas').node((ref) => {
            if (ref) {
                const canvas = ((ref as unknown as unknown[]).length > 0) ? ref[0].node : ref.node;
                if (canvas) {
                    const context = canvas.getContext('2d');
                    lottie.setup(canvas);

                    lottie.loadAnimation({
                        animationData: require("assets/react.json"),
                        // animationData: require("assets/react2.json"),
                        loop: true,
                        autoplay: true,
                        rendererSettings: {
                            context: context
                            /* , preserveAspectRatio: 'xMidYMid slice'*/
                        },
                    });
                }
            }
        }).exec();
    })

    useLoad(() => {
        console.log('Page loaded.')
    })

    const [text, setText] = useState('Hello world!');
    // @ts-ignore
    const [isDisabled, setIsDisabled] = useState(false);
    const handleClick = () => {
        setIsDisabled(true);
    };
    const handleReleaseClick = () => {
        setIsDisabled(false);
    };

    // @ts-ignore
    return (
        <View className='index'>
            <ScrollView className='scroll' bounces enhanced
                        scroll-y upper-threshold='50'
                        lower-threshold='50'
            >

                <View className='scrollBody'>
                    <View className='page-container'>
                        <View className='left-content'>
                            {/*左边的内容*/}
                            <Text className='left-content text'>{text}</Text>
                        </View>
                        <View className='right-content'>
                            {/*右边的内容*/}
                            <View className={`right-image ${isDisabled ? 'disabled' : ''}`}>
                                <Canvas id='canvas' className='canvas'
                                        type='2d' onTouchStart={handleClick} onTouchEnd={handleReleaseClick}
                                        onClick={() => {
                                        }}
                                />
                            </View>

                        </View>
                    </View>

                    <Button className='button' onTouchStart={handleClick} onTouchEnd={handleReleaseClick}
                            onClick={() => {
                                if (text === 'Hello world!') {
                                    setText('你好，Taro with React！');
                                } else {
                                    setText('Hello world!');
                                }
                            }
                            }
                    >屠龙宝刀点击就送</Button>
                </View>

            </ScrollView>

        </View>
    )
}
