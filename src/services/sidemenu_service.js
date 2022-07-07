import * as Axios from 'axios';

export default class SideMenuService {
    constructor() {
    }

    config = {
        headers: {
            'instance': 'PRODUCCION',
            'UserID': '',
            'TokenKey': '',
            'accept': 'text/plain'
        }
    };

    Options(currentUser) {
        this.config.headers.TokenKey = currentUser.token;
        this.config.headers.UserID = currentUser.userId;
        return Axios.get(`https://service.constantino.com.do/api/auth/Options`, this.config);
    }

}
