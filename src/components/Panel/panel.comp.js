import * as React from 'react';
import { Select, Icon } from 'antd';
import { observer, inject } from 'mobx-react';
import { v1 } from 'uuid';
import { Collapse } from 'antd';
import ButtonComponent from 'components/Button/button.comp.js';
import GridComponent from 'components/Grid/grid.comp.js';

import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css';

import { Spin, Alert } from 'antd';

class PanelComponent extends React.Component {
    customPanelStyle = {
        background: '#054163',
        borderRadius: 4,
        color: 'white !important',
        marginBottom: 24,
        border: 0,
        overflow: 'hidden',
    };

    constructor(props) {
        super(props);
        this.state = {
            hasChanged: false,
            userName: '',
        };

        this.onPanelChange = this.onPanelChange.bind(this);
    }

    componentDidMount() {
        // this.props.mobxStore.items['gridData' + this.props.title] = [];

    }

    async onPanelChange(key) {
        // this.props.formData && this.props.formData.forEach(element => {
        //     if (element.fHeader.descripcionWizard === key) {
        //         element.fCampos.forEach(async item => {
        //             if (item.origenDatos) {
        //                 const response = await this.props.mobxStore.getFieldsDataAsync(this.props.formId, item.origenDatos);
        //                 this.props.mobxStore.items['fieldData' + this.props.title + item.nombreCampo] = response.data;
        //             }
        //         });
        //     }
        // });

        this.props.mobxStore.items[this.props.title + 'activeKey'] = key;

        // setTimeout(() => {
        //     this.props.mobxStore.items['currentItem' + this.props.title] = this.props.mobxStore.items['currentItem' + this.props.title];
        // }, 300);
    }

    onChange(value, event) {
        this.props.onChange(event[0] && event[0].props.name, value);
    }


    getPanel() {
        const { name } = this.props;
        const { Panel } = Collapse;

        const _Panel = (
            <Collapse
                activeKey={this.props.mobxStore.items[this.props.title + 'activeKey']}
                onChange={this.onPanelChange}
                key={v1()}
                bordered={false}
                style={{ color: 'white !important' }}
                expandIcon={({ isActive }) => <Icon style={{ color: 'white !important' }} type="caret-right" rotate={isActive ? 90 : 0} />}
            >
                {this.props.componentes}
                <Panel
                    header={'Informe de ' + this.props.header}
                    key={this.props.key}
                    style={this.customPanelStyle}
                >

                    <Spin tip="Cargando, Espere..." spinning={this.props.mobxStore.items['loading' + this.props.title]}>

                        {this.props.type === 'C' ? <div className="backGroundButtons" style={{ paddingBottom: '41px', paddingTop: '6px' }} key={v1()}>
                            <div style={{ paddingLeft: '9px', position: 'relative', width: '100%', paddingRight: '25px' }}>
                        </div>

                            <ButtonComponent
                                style={{ float: 'right', marginRight: '11px' }}
                                class='btn btn-info'
                                disabled={true}
                                IconType="plus-circle"
                                form={this.props.title}
                                text='Buscar'
                            // onClick={this.add.bind(this)}
                            />
                        </div> : undefined}

                        <GridComponent
                            columns={this.props.columns}
                            title={this.props.title}
                        // rowClick={this.rowClick}
                        />
                    </Spin>

                </Panel>

            </Collapse>
        );

        return _Panel;
    }

    render() {
        console.log('panel rerender');
        const Panel = this.getPanel();
        return Panel;
    }
}

export default inject("mobxStore")(observer(PanelComponent));

