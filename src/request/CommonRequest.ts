import Taro from "@tarojs/taro";

const TIME_OUT = 60000;


const nodeEnv = process.env.NODE_ENV;
const developmentApi: string = 'http://192.168.1.166:8090/api/app/';
// const testApi: string = 'http://192.168.1.166:8080/api/app/';
// const testApi: string = 'https://david.picp.vip/api/app/';
const testApi: string = 'http://192.168.1.166:8880/teaching-api/api/app/';
const prodApi: string = 'https://study.uoocuniversity.com/api/app/';
const uatApi: string = 'https://studyuat.uoocuniversity.com/api/app/';

const BASE_URL = () => {
    // @ts-ignore
    let version = __wxConfig.envVersion;
    console.log(`version ===${version}===`);
    if (!version || version === '') {
        // @ts-ignore
        version = wx.getAccountInfoSync().miniProgram.envVersion;
    }
    // console.log('version', version)
    // let version = 'develop';
    // return uatApi;
    return prodApi;


    switch (version) {
        case 'develop':
        case 'preview': //腾讯的狗腿子代码,iOS搞了个不一样的环境变量
            // 开发版
            return uatApi;
        case 'trial':
            // 体验版
            return uatApi;
        case 'release':
            // 正式版
            return prodApi;
        default:
            break;
    }
}

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export const GET: RequestMethod = 'GET';
export const POST: RequestMethod = 'POST';
export const PUT: RequestMethod = 'PUT';
export const DELETE: RequestMethod = 'DELETE';

export class CommonRequest {
    request(url: string, method: RequestMethod, data: any | null, ignoreBaseUrl = false): Promise<any> {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();
            Taro.showLoading();
            let header: any =  { 'Content-Type': 'application/json' }
            let request = {
                url: (ignoreBaseUrl ? '' : BASE_URL()) + url,
                method: (method || GET),
                timeout: TIME_OUT,
                data: data,
                header: header as TaroGeneral.IAnyObject,
                success(res) {
                    const endTime = Date.now();
                    // 计算请求所花费的时间
                    const elapsedTime = endTime - startTime;
                    // 最少等待的时间
                    const minWaitTime = 150;
                    const requestParse = () => {
                        console.log(`~~~~~请求结果:${JSON.stringify(res.data)}~~~~`);
                        if (res.statusCode === 200 && (res.data.hasOwnProperty('code') && res.data.code ===200 )) {
                            resolve(res.data);
                        } else {
                            Taro.hideLoading();
                            let error = res.data;
                            switch (error.statusCode) {
                                case 400:
                                    error.error = '请求参数有误';
                                    break;
                                case 401:
                                    error.error = '未授权，请登录';
                                    break;
                                case 403:
                                    error.error = '访问被禁止';
                                    break;
                                case 404:
                                    error.error = '请求地址不正确';
                                    break;
                                case 500:
                                    error.error = '服务器错误';
                                    break;
                                // 添加其他状态码的处理分支
                                case 502:
                                    error.error = '服务暂时不可用';
                                    break;
                                case 503:
                                    error.error = '服务不可用';
                                    break;
                                default:
                                    error.error = '未知错误';
                            }
                            if(res.statusCode === 200 && res.data.hasOwnProperty('code')){
                                switch (error.code) {
                                    case 400:
                                        error.error = '请求参数有误';
                                        break;
                                    case 401:
                                        error.error = '未授权，请登录';
                                        break;
                                    case 403:
                                        error.error = '访问被禁止';
                                        break;
                                    case 404:
                                        error.error = '请求地址不正确';
                                        break;
                                    case 500:
                                        error.error = error.msg;
                                        break;
                                    // 添加其他状态码的处理分支
                                    case 502:
                                        error.error = '服务暂时不可用';
                                        break;
                                    case 503:
                                        error.error = '服务不可用';
                                        break;
                                    default:
                                        error.error = '未知错误';
                                }
                                Taro.showToast({title: res.data.error, icon: 'none'});
                                reject(res);
                            }else{
                                Taro.showToast({title: res.data.error, icon: 'none'});
                                reject(res);
                            }

                        }
                    }
                    if (elapsedTime < minWaitTime) {
                        setTimeout(() => {
                            Taro.hideLoading();
                            requestParse();
                        }, minWaitTime - elapsedTime);
                    } else {
                        Taro.hideLoading();
                        requestParse();
                    }
                },
                fail(err) {
                    const endTime = Date.now();
                    // 计算请求所花费的时间
                    const elapsedTime = endTime - startTime;
                    // 最少等待的时间
                    const minWaitTime = 150;
                    if (elapsedTime < minWaitTime) {
                        setTimeout(() => {
                            Taro.hideLoading();
                            console.log(`err.errMsg==>${err.errMsg}`)
                            Taro.showToast({title: err.errMsg, icon: 'none'});
                            reject(err);
                        }, minWaitTime - elapsedTime);
                    } else {
                        Taro.hideLoading();
                        console.log(`err.errMsg==>${err.errMsg}`)
                        Taro.showToast({title: err.errMsg, icon: 'none'});
                        reject(err);
                    }
                },
            };
            console.log(`~~~~~请求地址: ${request.url} ~~~~`);
            console.log(`~~~~~请求方法: ${request.method || 'GET'}~~~~`);
            console.log(`~~~~~请求头: ${JSON.stringify(request.header)} ~~~~`);
            console.log(`~~~~~请求参数: ${JSON.stringify(request.data)} ~~~~`);
            console.log(`~~~~~完整请求参数: ${this.convertToCurl(request)} ~~~~`);
            Taro.request(request).catch(() => {});
        });
    }

    get(url: string, params: any | null) {
        return this.request(url, GET, params);
    }

    post(url: string, data: any | null) {
        return this.request(url, POST, data, false);
    }

    // 辅助函数：将uni.request请求转换为curl命令
    private convertToCurl(request: {
        url: any;
        method: any;
        timeout?: number;
        data: any | null;
        header: any;
        success?: (res: any) => void;
        fail?: (err: any) => void;
    }) {
        const method = request.method.toUpperCase();
        const url = request.url;
        const header = request.header || {};
        const data = request.data || {};
        let curlCommand = `curl -X ${method} ${url}`;
        // 添加header信息
        for (let [key, value] of Object.entries(header)) {
            curlCommand += ` -H '${key}: ${value}'`;
        }
        // 添加data数据
        if (method === 'POST' || method === 'PUT') {
            curlCommand += ` -d '${JSON.stringify(data)}'`;
        }
        return curlCommand;
    }
}

export default new CommonRequest();
