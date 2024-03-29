import * as Axios from 'axios';

export default class FormService {

    constructor() {
    }

    config = {
        headers: {
            'instance': 'PRODUCCION',
            'UserID': '',
            'TokenKey': '',
            'accept': 'text/plain',
        }
    };

    saveData(frmId, item, action, currentUser, regid) {

        return Axios.post(`MockURL`,
            JSON.stringify(item),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'instance': 'PRODUCCION',
                    'UserID': currentUser.userId,
                    'TokenKey': currentUser.token,
                    'frmId': btoa(frmId),
                    'accion': action,
                    'regid': regid,
                }
            });
    }

    dataList(frmId, currentUser) {
        return Axios.get(`MockURL`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'instance': 'PRODUCCION',
                'UserID': currentUser.userId,
                'TokenKey': currentUser.token,
                'accept': 'text/plain',
                'Start': 1,
                'search': '',
                'frmId': btoa(frmId),
                'Length': 100,
            }
        });
    }

    searchMapData(frmId, currentUser, item, format) {
        return Axios.post(`MockURL`,
            JSON.stringify(item),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'instance': 'PRODUCCION',
                    'UserID': currentUser.userId,
                    'TokenKey': currentUser.token,
                    'Start': 1,
                    'search': '',
                    'frmId': btoa(frmId),
                    'Length': 100,
                    'format': format
                }
            });
    }

    searchData(frmId, currentUser, item, regid) {
        return Axios.post(`MockURL`,
            JSON.stringify(item),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'instance': 'PRODUCCION',
                    'UserID': currentUser.userId,
                    'TokenKey': currentUser.token,
                    'Start': 1,
                    'search': '',
                    'frmId': btoa(frmId),
                    'Length': 100,
                }
            });
    }

    form(frmId, currentUser) {
        this.config.headers.frmId = btoa(frmId);
        this.config.headers.TokenKey = currentUser.token;
        this.config.headers.UserID = currentUser.userId;
        return Axios.get(`MockURL`, this.config);
    }

    formAccordion(frmId, currentUser) {
        this.config.headers.frmId = btoa(frmId);
        this.config.headers.TokenKey = currentUser.token;
        this.config.headers.UserID = currentUser.userId;
        return Axios.get(`MockURL`, this.config);
    }

    fieldsData(frmId, origenDatos, currentUser) {
        this.config.headers.frmId = btoa(frmId);
        this.config.headers.lookup = btoa(origenDatos);
        this.config.headers.TokenKey = currentUser.token;
        this.config.headers.UserID = currentUser.userId;
        return Axios.get(`MockURL`, this.config);
    }
}
