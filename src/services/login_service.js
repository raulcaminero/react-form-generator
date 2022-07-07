import * as Axios from 'axios';

export default class LoginService {

    constructor() {
    }

    config = { headers: { 'Content-Type': 'application/json', 'accept': 'text/plain', 'Access-Control-Allow-Origin': '*' } };

    Login(password, username) {
        return Axios.post(`MockURL`, {
            'username': username,
            'Password': password,
            'FingerPrint': 'string',
            'UserAgent': 'string',
            'os': 'string'
        }, this.config);
    }
}
