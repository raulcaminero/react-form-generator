import * as React from 'react';
import { observer, inject } from 'mobx-react';
import IntlMessages from 'util/IntlMessages';
import CustomScrollbars from 'util/CustomScrollbars';
import { Menu, Icon } from 'antd';
import SideMenuService from 'services/sidemenu_service'
import FormGenerator from 'components/FormGenerator';
import { v1 } from 'uuid';

const { SubMenu } = Menu;

class MenuGenerator extends React.Component {
    data = [];
    gridData = [];
    SubMenu2 = [];
    clicked = false;

    constructor(props) {
        super(props);

        this.setTabData = this.setTabData.bind(this);
    }

    service = new SideMenuService();

    async componentDidMount() {
        await this.props.mobxStore.getOptionsAsync();
    }

    typeL = async (frmId, descripcion) => {
        this.data = [await this.props.mobxStore.getFormsAsync(frmId)];
    }

    typeW = async (frmId) => {
        this.data = await this.props.mobxStore.getFormsAccordionAsync(frmId);
    }

    typeMC = async (frmId, descripcion) => {
        this.data = [await this.props.mobxStore.getFormsAsync(frmId)];
        this.gridData = await this.props.mobxStore.getDataListAsync(frmId);
        this.gridData ? this.props.mobxStore.items['gridData' + descripcion] = this.gridData.data : this.props.mobxStore.items['gridData' + descripcion] = [];
        this.gridData && this.gridData.columns && this.gridData.columns.shift(); // remove later
    }

    getOptions(frmId, descripcion, type) {
        let forms = {
            'C': this.typeMC,
            'M': this.typeMC,
            'L': this.typeL,
            'W': this.typeW,
        }

        return forms[type](frmId, descripcion);
    }

    async setTabData(i, bindedData) {
        if (this.clicked) return;
        this.clicked = true;

        const found = this.props.mobxStore.tabs.find(item => item.key === (i.frmId + i.descripcion));

        if (!found) {

            await this.getOptions(i.frmId, i.descripcion, i.tipoOpcion);

            if (this.props.props.history.location.pathname != '/app/forms') {
                this.props.props.history.push('/app/forms');
            }

            this.props.mobxStore.items[i.descripcion] = {};
            this.props.mobxStore.items['disable' + i.descripcion] = true;
            this.props.mobxStore.tabs.push({
                title: i.descripcion, key: i.frmId + i.descripcion, formData: this.data, content:
                    <div key={v1()} className="app-wrapper">
                        <div key={v1()}>
                            <FormGenerator
                                key={v1()}
                                formId={i.frmId}
                                formData={this.data}
                                gridData={this.gridData}
                                type={i.tipoOpcion}
                                title={i.descripcion}
                            >
                            </FormGenerator>
                        </div>
                    </div>
            });

        }

        this.clicked = false;
        this.props.mobxStore.activeKey = i.frmId + i.descripcion;
    }

    checkOptions(data) {
        const sideBar = data.map(i => {
            if (i.children.length > 0) {
                return (
                    <SubMenu style={{ color: '#B9B9B9', backgroundColor: '#02103f', paddingLeft: '0px' }}
                        key={i.frmId === '' ? i.descripcion : i.frmId}
                        title={
                            <span>
                                {/* <Icon type={'user'} /> */}
                                <span style={{ paddingRight: '15px' }} className={i.icono.includes('lightbulb') ? i.icono + '-o' : i.icono}></span>
                                <span>{!this.props.mobxStore.collapsed ? i.descripcion : ''}</span>
                            </span>
                        }
                    >
                        {this.checkOptions(i.children)}
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item className="sidebaritem" key={i.frmId === '' ? i.descripcion : i.frmId}>
                        <a style={{}} onClick={this.setTabData.bind(this, i)}>
                            <span style={{ paddingRight: '15px' }} className={i.icono}></span>
                            {i.descripcion}
                        </a>
                    </Menu.Item>
                )
            }
        });

        return sideBar;
    }

    render() {
        const sideBarMenu = this.props.mobxStore.data && this.checkOptions(this.props.mobxStore.data);

        return (
            <CustomScrollbars style={{ backgroundColor: '#02103f' }} className=" scrollbar">
                <ul style={{ backgroundColor: '#02103f' }} className="nav-menu">
                    <li className="nav-header">
                        <IntlMessages id="sidebar.main" />
                    </li>
                    <li className="menu no-arrow">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['item1']}
                            defaultOpenKeys={['subMenu1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            {sideBarMenu}
                        </Menu>

                    </li >
                </ul >
            </CustomScrollbars >
        );
    }
}

export default inject("mobxStore")(observer(MenuGenerator));