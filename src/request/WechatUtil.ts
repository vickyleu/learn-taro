import CommonRequest, {POST} from "@/request/CommonRequest";

const WechatPrefix = 'wx/questions/';

export interface WechatLoginModel {
    openId: string;
    encryptedData: string;
    iv: string;
}
export function wechatLogin(login:WechatLoginModel):Promise<any>{
   return  CommonRequest.request(WechatPrefix+"login",POST,login).then((res)=> {
       console.log(`res.code===>> ${res.code}`)
       return res;
   });
}
