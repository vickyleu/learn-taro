// @ts-ignore
import {Button, Canvas, Image, ScrollView, Text, View} from '@tarojs/components'
import Taro, {useLoad, useReady,useDidShow,useDidHide} from '@tarojs/taro'
import './index.scss'
import {useState} from 'react'
import lottie from "lottie-miniprogram"
import {CanvasNode, canvasWithInfo} from "@/common/export";


export default function Index() {

    // @ts-ignore
    let mCanvas: CanvasNode | undefined = null
    const [isVisible, setIsVisible] = useState(false);
    useDidShow(() => {
        setIsVisible(true);
    })
    useDidHide(() => {
        setIsVisible(false);
    })

    useReady(() => {
        canvasWithInfo('#canvas').then((pair) => {
            let canvas = pair[0];
            let info = pair[1];
            mCanvas = canvas;
            const context = canvas.getContext('2d');
            console.log(`Taro.getSystemInfo==>>${JSON.stringify(info)}`)
            // @ts-ignore
            let {pixelRatio, screenWidth, screenHeight} = info;
            // 关键代码  start ！！！
            context.scale(pixelRatio, pixelRatio)
            canvas.width = (screenWidth * 0.6) * pixelRatio
            canvas.height = ((screenWidth * 0.6) * 1.04) * pixelRatio
            // 关键代码  end ！！！
            lottie.setup(canvas);

            const anim = lottie.loadAnimation({
                animationData: require("assets/react.json"),
                // animationData: require("assets/react2.json"),
                loop: true,
                autoplay: true,
                rendererSettings: {
                    context: context,
                    clearCanvas: true,
                    imagePreserveAspectRatio: 'xMidYMid slice',
                    /* , preserveAspectRatio: 'xMidYMid slice'*/
                },
            });
            anim.getDuration()
        })
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
    let accumulatedY = 0;
    // @ts-ignore
    return (
        <View className={`index ${isVisible ? 'fade-in' : 'fade-out'}`}>
            <View className="navbar">
            </View>

            <ScrollView className='scroll'
                        scrollY
                        scrollWithAnimation
                        bounces enhanced
                        upper-threshold='10'
                        lower-threshold='10'

                        // showScrollbar
                        onScrollEnd={// @ts-ignore
                            (detail) => {
                                if (mCanvas) {

                                    let y = detail.detail.deltaY;
                                    accumulatedY += y;  // 维持一个累积的Y偏移量

                                    lottie.onMove(0,y);

                                    /* let y = detail.detail.deltaY;
                                     accumulatedY += y;  // 维持一个累积的Y偏移量
                                     const ctx = mCanvas.getContext('2d');
                                     // 清空canvas，准备重绘
                                     ctx.clearRect(0, 0, mCanvas.width, mCanvas.height);
                                     // 使用累积的偏移量进行位移
                                     ctx.translate(0, accumulatedY);*/
                                }
                            }}
                        onScroll={// @ts-ignore
                            (detail) => {
                                if (mCanvas) {
                                    let y = detail.detail.deltaY;
                                    accumulatedY += y;  // 维持一个累积的Y偏移量

                                    lottie.onMove(0,y);
                                    /* const ctx = mCanvas.getContext('2d');
                                     // 清空canvas，准备重绘
                                     ctx.clearRect(0, 0, mCanvas.width, mCanvas.height);
                                     // 使用累积的偏移量进行位移
                                     ctx.translate(0, accumulatedY);*/
                                }
                            }
                        }
            >
                <View className='scrollBody'>
                    <View className='page-container'>
                        <View className='left-content'>
                            <Text className='left-content text'>{text}</Text>
                        </View>
                        <View className='right-content'>
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
                                Taro.navigateTo({ url:'../login/index'})
                            }
                            }
                    >屠龙宝刀点击就送</Button>
                </View>

            </ScrollView>
        </View>
    )
}
