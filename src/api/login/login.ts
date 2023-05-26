import tuRequest from '@/service'
import { IAccount } from './type'

enum LoginAPI {
    AccountLogin = '/login',
}

export function accountLoginRequest(account: IAccount) {
    return tuRequest.post({
        url: LoginAPI.AccountLogin,
        data: account,
    })
}
