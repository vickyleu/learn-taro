import {Button, Image, Text, View} from '@tarojs/components'
import {useLoad} from '@tarojs/taro'
import './index.scss'
// eslint-disable-next-line import/first
import {useState} from 'react';

export default function Index() {
  const [text, setText] = useState('Hello world!');
  const [isDisabled, setIsDisabled] = useState(false);
  const handleClick = () => {
    setIsDisabled(true);
  };
  const handleReleaseClick = () => {
    setIsDisabled(false);
  };

  useLoad(() => {
    console.log('Page loaded.')
  })


  return (
    <View className='index'>
      <View className='page-container'>
        <View className='left-content'>
          {/* 左边的内容 */}
          <Text className='left-content text'>{text}</Text>
        </View>
        <View className='right-content'>
          {/* 右边的内容 */}
          <Image
            className={`right-image ${isDisabled ? 'disabled' : ''}`}  onTouchStart={handleClick} onTouchEnd={handleReleaseClick}   onClick={()=>{

          }} src={require('assets/google.png')}
          />
        </View>
      </View>

      <Button className='button' onTouchStart={handleClick} onTouchEnd={handleReleaseClick}  onClick={() => {
        if (text === 'Hello world!') {
          setText('你好，Taro with React！');
        } else {
          setText('Hello world!');
        }
      }
      }
      >屠龙宝刀点击就送</Button>
    </View>
  )
}
