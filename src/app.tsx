import {FC} from 'react'
import {useLaunch} from '@tarojs/taro'
import {Provider} from "react-redux";
import configStore from "./store";
import './app.scss'

const store = configStore();
const App: FC = ( /*@ts-ignore*/
                  {children}) => {

    useLaunch(() => {
        console.log(`App launched.`)
    })
    // children 是将要会渲染的页面
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}


export default App
