import { observable, runInAction, decorate } from 'mobx';
import service from '../services/sidemenu_service'
import formService from '../services/form_service'

class MobxStore {
    constructor() {
        this.menuService = new service();
        this.formService = new formService();
    }

    activeKey = '';
    data = [];
    tabs = [];
    status = "initial";
    items = {};
    collapsed = false;

    getFormsAccordionAsync = async (frmId) => {
        try {
            let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            const response = await this.formService.formAccordion(frmId, currentUser);

            // runInAction(() => {
            //     this.formData = response.data;
            // });
            return response.data;
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };

    getFormsAsync = async (frmId) => {
        try {
            let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            const response = await this.formService.form(frmId, currentUser);

            // runInAction(() => {
            //     this.formData = response.data;
            // });
            return response.data;
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };

    
    postSearchMapDataAsync = async (frmId, item, action, format) => {
        try {
            let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            const response = await this.formService.searchMapData(frmId, currentUser, item, format);

            // runInAction(() => {
            //     this.responseData = response.data;
            // });
            return response;
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };

    postSearchDataAsync = async (frmId, item, action) => {
        try {
            let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            const response = await this.formService.searchData(frmId, currentUser, item);

            // runInAction(() => {
            //     this.responseData = response.data;
            // });
            return response;
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };

    

    postDataAsync = async (frmId, item, action, regid) => {
        try {
            let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            const response = await this.formService.saveData(frmId, item, action, currentUser, regid);

            // runInAction(() => {
            //     this.responseData = response.data;
            // });
            return response;
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };

    getDataListAsync = async (frmId) => {
        try {
            let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            const response = await this.formService.dataList(frmId, currentUser);

            // runInAction(() => {
            //     this.data = response.data.options;
            // });
            return response.data;
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };

    getOptionsAsync = async () => {
        try {
            let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            const response = await this.menuService.Options(currentUser);

            runInAction(() => {
                this.data = response.data.options;
            });
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };

    getFieldsDataAsync = async (frmId, origenDatos) => {
        try {
            let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            const response = await this.formService.fieldsData(frmId, origenDatos, currentUser);

            return response.data;
        } catch (error) {
            runInAction(() => {
                this.status = "error";
            });
        }
    };
}

decorate(MobxStore, {
    data: observable,
    activeKey: observable,
    status: observable,
    tabs: observable,
    disable: observable,
    items: observable,
});

export default new MobxStore();