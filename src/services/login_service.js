import * as Axios from 'axios';

export default class LoginService {

    constructor() {
    }

    config = { headers: { 'Content-Type': 'application/json', 'accept': 'text/plain', 'Access-Control-Allow-Origin': '*' } };

    Login(password, username) {
        return Axios.post(`https://service.constantino.com.do/api/auth/Login`, {
            'username': username,
            'Password': password,
            'FingerPrint': 'string',
            'UserAgent': 'string',
            'os': 'string'
        }, this.config);
    }
}
