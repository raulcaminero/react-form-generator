import * as React from 'react';
import { runInAction } from 'mobx';
import moment from 'moment';
import 'moment/locale/es';
import Modal from 'react-modal';
import { observer, inject } from 'mobx-react';
import { v1 } from 'uuid';
import {
    Icon,
    Collapse,
} from 'antd';
import { store } from 'react-notifications-component';
import InputComponent from 'components/input/input.comp.js';
import ReactNumericInputComponent from 'components/ReactNumericInput/react-numeric-input.comp';
import ButtonComponent from 'components/Button/button.comp.js';
import SelectComponent from 'components/Select/select.comp.js';
import DatePickerComponent from 'components/DatePicker/datepicker.comp.js';
import SelectTreeMultiComponent from 'components/SelectTreeMulti/selecttreemulti.comp.js';
import TreeSelectComponent from 'components/TreeSelect/treeselect.comp.js';
import MultiSelectComponent from 'components/MultiSelect/multiselect.comp.js';
import MapContainer from 'components/MapContainer/MapContainer.comp.js';
import PanelComponent from 'components/Panel/panel.comp.js';
import RadioComponent from 'components/RadioGroup/radio.comp.js';


import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css';

class FormGenerator extends React.Component {
    columns = {};
    formData = [];
    dataLength;

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
            modalIsOpen: false
        };

        this.onChange = this.onChange.bind(this);
        this.onChangeDatepicker = this.onChangeDatepicker.bind(this);
        this.onPanelChange = this.onPanelChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.props.mobxStore.items['IdClasificacion'] = true;
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    rowClick = (e, row) => {
        this.props.mobxStore.items[this.props.title + 'activeKey'] = this.props.title + '1';

        setTimeout(() => {
            this.props.mobxStore.items['currentItem' + this.props.title] = row._row.data;
        }, 300);

        this.props.mobxStore.items['disable' + this.props.title + 'Modificar'] = false;
    };

    async onPanelChange(key) {
        this.props.formData && this.props.formData.forEach(element => {
            if (element.fHeader.descripcionWizard === key) {
                element.fCampos.forEach(async item => {
                    if (item.origenDatos) {
                        const response = await this.props.mobxStore.getFieldsDataAsync(this.props.formId, item.origenDatos);
                        this.props.mobxStore.items['fieldData' + this.props.title + item.nombreCampo] = response.data;
                    }
                });
            }
        });

        this.props.mobxStore.items[this.props.title + 'activeKey'] = key;

        setTimeout(() => {
            this.props.mobxStore.items['currentItem' + this.props.title] = this.props.mobxStore.items['currentItem' + this.props.title];
        }, 300);
    }

    add(item) {
        this.props.mobxStore.items['accion' + this.props.title] = 'I';
        this.props.mobxStore.items['disable' + this.props.title] = false;
        this.props.mobxStore.items['disable' + this.props.title + 'Guardar'] = false;
        this.props.mobxStore.items['disable' + this.props.title + 'Nuevo'] = true;
        this.props.mobxStore.items['disable' + this.props.title + 'Borrar'] = true;
        this.props.mobxStore.items['disable' + this.props.title + 'Modificar'] = true;
    }

    edit(item) {
        this.props.mobxStore.items['accion' + this.props.title] = 'U';
        this.props.mobxStore.items['disable' + this.props.title] = false;
        this.props.mobxStore.items['disable' + this.props.title + 'Nuevo'] = true;
        this.props.mobxStore.items['disable' + this.props.title + 'Modificar'] = true;
        this.props.mobxStore.items['disable' + this.props.title + 'Borrar'] = true;
        this.props.mobxStore.items['disable' + this.props.title + 'Guardar'] = false;
    }

    delete(item) {
        this.props.mobxStore.items['disable' + this.props.title] = false;
        this.props.mobxStore.items['disable' + this.props.title + 'Nuevo'] = true;
        this.props.mobxStore.items['disable' + this.props.title + 'Modificar'] = true;
        this.props.mobxStore.items['disable' + this.props.title + 'Borrar'] = true;
        this.props.mobxStore.items['disable' + this.props.title + 'Guardar'] = false;
    }

    async getSearchMapData() {
        this.props.mobxStore.items[this.props.title + 'activeKey'] = this.props.title + '2';
        this.props.mobxStore.items['loading' + this.props.title] = true;

        // this.props.mobxStore.items['currentItem' + this.props.title].forEach(element => {
        //     if (moment.isMoment(element)) {
        //         element = element.substring(0, 10)
        //     };
        // });
        const response = await this.props.mobxStore.postSearchMapDataAsync(
            this.props.formId,
            this.props.mobxStore.items['currentItem' + this.props.title],
            this.props.mobxStore.items['accion' + this.props.title],
            'C'
        );

        const response2 = await this.props.mobxStore.postSearchMapDataAsync(
            this.props.formId,
            this.props.mobxStore.items['currentItem' + this.props.title],
            this.props.mobxStore.items['accion' + this.props.title],
            'M'
        );

        this.props.mobxStore.items['Map' + this.props.title] = response2 && response2.data && response2.data.data;

        this.props.mobxStore.items['loading' + this.props.title] = false;
        this.props.mobxStore.items['gridData' + this.props.title] = response && response.data && response.data.data;

    }

    async getSearchData() {
        this.props.mobxStore.items[this.props.title + 'activeKey'] = this.props.title + '2';
        this.props.mobxStore.items['loading' + this.props.title] = true;

        // this.props.mobxStore.items['currentItem' + this.props.title].forEach(element => {
        //     if (moment.isMoment(element)) {
        //         element = element.substring(0, 10)
        //     };
        // });
        const response = await this.props.mobxStore.postSearchDataAsync(
            this.props.formId,
            this.props.mobxStore.items['currentItem' + this.props.title],
            this.props.mobxStore.items['accion' + this.props.title],
            this.props.formData[0].regid
        );


        this.props.mobxStore.items['loading' + this.props.title] = false;
        this.props.mobxStore.items['gridData' + this.props.title] = response && response.data && response.data.data;

    }

    clear(item) {
        runInAction(() => {
            this.props.mobxStore.items['currentItem' + this.props.title] = {};
        });

        this.props.mobxStore.items['disable' + this.props.title] = true;
        this.props.mobxStore.items['disable' + this.props.title + 'Nuevo'] = false;
        this.props.mobxStore.items['disable' + this.props.title + 'Guardar'] = true;
        this.props.mobxStore.items['disable' + this.props.title + 'Modificar'] = true;
        this.props.mobxStore.items['disable' + this.props.title + 'Borrar'] = true;
    }

    async save(item) {
        const response = await this.props.mobxStore.postDataAsync(
            this.props.formId,
            this.props.mobxStore.items['currentItem' + this.props.title],
            this.props.mobxStore.items['accion' + this.props.title],
            this.props.formData[0].regid
        );

        if (response) {
            store.addNotification({
                title: "Saved",
                message: " Request passed succesfulS.",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    // onScreen: true
                }
            });
        } else {
            store.addNotification({
                title: "Error",
                message: " Request failed.",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    // onScreen: true
                }
            });
        }

    }

    onChange(name, value) {
        this.handleChange(name, value);
    }

    onChangeDatepicker(name, moment, value) {
        this.handleChangeDatePicker(name, moment, value);
    }

    handleChangeDatePicker(name, moment, value) {
        runInAction(() => {
            this.props.mobxStore.items['currentItem' + this.props.title] = { ...this.props.mobxStore.items['currentItem' + this.props.title], ...{ [name + 'moment']: moment } };
            this.props.mobxStore.items['currentItem' + this.props.title] = { ...this.props.mobxStore.items['currentItem' + this.props.title], ...{ [name]: value } };
        });
    }

    handleChange(name, value) {
        runInAction(() => {
            this.props.mobxStore.items['currentItem' + this.props.title] = { ...this.props.mobxStore.items['currentItem' + this.props.title], ...{ [name]: value } };
        });
    }

    renderElement(element) {
        switch (element.tipoControl.toUpperCase()) {
            case 'SELECT':
                return this.renderSelect(element);
            case 'SELECTMULTI':
                return this.renderMultiSelect(element);
            case 'DATETIME':
            case 'DATE':
                return this.renderDatePicker(element);
            case 'SELECTTREE':
                return this.renderTreeSelect(element);
            case 'SELECTTREEMULTI':
                return this.renderSelectTreeMulti(element);
            case 'LABEL':
                return this.renderLabel(element);
            case 'RADIOGROUP':
                return this.renderRadioGroup(element);
            case 'NUMERIC':
                return this.renderInputNumeric(element);
            default:
                return this.renderInput(element);
        }
    }

    setGridColumns(data) {
        this.columns['columns' + this.props.title] = [];
        if (data[0] !== undefined) {

            for (const item of data[0].dtHeader) {
                this.columns['columns' + this.props.title].push({ title: item.descripcion, field: item.nombreCampo });
            }
        }
    }

    async getSetFieldsData(data, frmId, type) {
        if (data[0] !== undefined) {

            for (const item of data[0].fCampos) {

                if (item.origenDatos) {
                    const response = await this.props.mobxStore.getFieldsDataAsync(frmId, item.origenDatos);
                    if (response) this.props.mobxStore.items['fieldData' + this.props.title + item.nombreCampo] = response.data;
                }
            }
        }
    }

    renderLabel(element) {
        return <hr
            className={'CustomLine'}
        />
    }

    renderInputNumeric(element) {

        return <ReactNumericInputComponent
            name={element.nombreCampo}
            onChange={this.onChange}
            title={this.props.title}
            readOnly={element.editable === 'N' ? true : false}
            formType={this.props.type}
            default={element.valorDefault}
            key={v1()}
            controlType={element.tipoControl}
        />;
    }

    renderInput(element) {

        return <InputComponent
            name={element.nombreCampo}
            onChange={this.onChange}
            title={this.props.title}
            readOnly={element.editable === 'N' ? true : false}
            formType={this.props.type}
            default={element.valorDefault}
            key={v1()}
            controlType={element.tipoControl}
        />;
    }

    renderRadioGroup(element) {

        return (
            <RadioComponent
                onChange={this.onChange}
                name={element.nombreCampo}
                title={this.props.title}
                readOnly={element.editable === 'N' ? true : false}
                default={element.valorDefault}
            >
            </RadioComponent>
        );
    }

    renderSelect(element) {

        return (
            <SelectComponent
                onChange={this.onChange}
                name={element.nombreCampo}
                title={this.props.title}
                readOnly={element.editable === 'N' ? true : false}
                default={element.valorDefault}
            >
            </SelectComponent>
        );
    }

    renderDatePicker(element) {
        return (
            <DatePickerComponent
                title={this.props.title}
                default={moment(element.valorDefault, 'YYYY-MM-DD')}
                readOnly={element.editable === 'N' ? true : false}
                onChange={this.onChangeDatepicker}
                name={element.nombreCampo}
                style={{ width: '100%' }}
            />
        );
    }

    renderSelectTreeMulti(element) {

        return (
            <SelectTreeMultiComponent
                name={element.nombreCampo}
                title={this.props.title}
                readOnly={element.editable === 'N' ? true : false}
                onChange={this.onChange}
            >
            </SelectTreeMultiComponent>
        );
    }

    renderTreeSelect(element) {

        return (
            <TreeSelectComponent
                name={element.nombreCampo}
                readOnly={element.editable === 'N' ? true : false}
                title={this.props.title}
                onChange={this.onChange}
            >
            </TreeSelectComponent>
        );
    }

    renderMultiSelect(element) {

        return (
            <MultiSelectComponent
                onChange={this.onChange}
                name={element.nombreCampo}
                readOnly={element.editable === 'N' ? true : false}
                title={this.props.title}
            >
            </MultiSelectComponent>
        );
    }

    renderComponent(element, index) {
        this.handleChange(element.nombreCampo, '');

        return (
            <div key={v1()} className={`${element.clase} form-group`}
            >
                <label style={{ color: 'white' }}>{element.descripcion}</label>
                {this.renderElement(element)}
            </div>
        );
    }

    getComponentTypes(fcampos) {
        const components = fcampos.map(this.renderComponent.bind(this));
        return components;
    }

    getComponentTypesModals(data) {
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
            }
        };

        const components = data && data.fCampos.map(this.renderComponent.bind(this));
        return (
            <Modal
                isOpen={this.props.mobxStore.items['IdClasificacion']}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {components}
            </Modal>
        );
    }

    generateTypeAcordion = (data, index) => {
        const { Panel } = Collapse;
        let paddingBottom = '5px';
        if (index === 0) paddingBottom = '39px';

        return (
            <Panel header={data.fHeader.descripcionWizard || data.fHeader.descripcion} key={data.fHeader.descripcionWizard || data.fHeader.descripcion} style={this.customPanelStyle}>
                <div className="row">
                    {this.getComponentTypes(data.fCampos)}
                </div>
                <div className="backGroundButtons" style={{ paddingBottom: paddingBottom, paddingTop: '9px', marginBottom: '3px' }} key={v1()}>
                    {index != 0 && <ButtonComponent
                        class='btn btn-primary'
                        form={this.props.title}
                        IconType="step-backward"
                        side={'left'}
                        text='Atras'
                        onClick={this.edit.bind(this)}
                        style={{ marginLeft: '11px' }}
                    />}
                    {index != this.dataLength ?
                        <ButtonComponent
                            style={{ float: 'right', marginRight: '11px' }}
                            class='btn btn-primary'
                            side={'right'}
                            IconType="step-forward"
                            form={this.props.title}
                            text='Siguiente'
                            onClick={this.add.bind(this)}
                        /> :
                        <ButtonComponent
                            style={{ float: 'right', marginRight: '11px' }}
                            class='btn btn-success'
                            form={this.props.title}
                            side={'left'}
                            IconType="save"
                            text='Guardar'
                            onClick={this.save.bind(this)}
                        />}
                </div>
            </Panel>

        );
    }

    generateTypeAcordionGrid = (data) => {
        const { Panel } = Collapse;

        let columns = [];
        data.dtHeader.forEach(element => {
            columns.push({ title: element.descripcion, field: 'HTMLText' });
        });

        this.props.mobxStore.items[data.fHeader.descripcionWizard] = this.getComponentTypesModals(data);

        return (
            <Panel
                header={data.fHeader.descripcionWizard}
                key={data.fHeader.descripcionWizard}
                key={v1()}
                style={this.customPanelStyle}
            >
                <div className="backGroundButtons" style={{ paddingBottom: '21px', paddingTop: '8px' }} key={v1()}>
                    <span style={{ paddingLeft: '9px', color: 'white' }} >
                        {data.fHeader.titulo1 && data.fHeader.titulo1.substring(8, data.fHeader.titulo1.length - 9)}
                    </span>
                    <ButtonComponent
                        style={{ float: 'right', marginRight: '11px' }}
                        class='btn btn-info'
                        disabled={true}
                        side={'left'}
                        IconType="plus-circle"
                        form={this.props.title}
                        text='Agregar'
                        onClick={this.openModal.bind(this)}
                    />
                </div>
                <ReactTabulator
                    style={{ width: '100%' }}
                    columns={columns}
                    data={[]}
                    options={{
                        pagination: 'local',
                        paginationSize: 10,
                    }}
                    rowClick={this.rowClick}
                />
                <div className="backGroundButtons" style={{ paddingBottom: '4px', paddingTop: '8px', marginBottom: '5px' }} key={v1()}>
                    <ButtonComponent
                        disabled={true}
                        class='btn btn-primary'
                        form={this.props.title}
                        IconType="step-backward"
                        side={'left'}
                        text='Atras'
                        onClick={this.edit.bind(this)}
                        style={{ marginLeft: '11px' }}
                    />
                    <ButtonComponent
                        style={{ float: 'right', marginRight: '11px' }}
                        class='btn btn-primary'
                        disabled={true}
                        side={'right'}
                        IconType="step-forward"
                        form={this.props.title}
                        text='Siguiente'
                        onClick={this.add.bind(this)}
                    />
                </div>
            </Panel>
        );
    }

    generateTypeModal = (data) => {
        const { Panel } = Collapse;
        return (
            <Panel
                header={data.fHeader.titulo1 && data.fHeader.titulo1.substring(8, data.fHeader.titulo1.length - 9)}
                key={this.props.title + '1'}
                style={this.customPanelStyle}>
                <div className="backGroundButtons" style={{ paddingBottom: '9px', paddingTop: '12px', marginBottom: '5px' }} key={v1()}>
                    <ButtonComponent
                        style={{ marginLeft: '11px' }}
                        class='btn btn-primary'
                        side={'left'}
                        disabled={true}
                        IconType="plus-circle"
                        form={this.props.title}
                        text='Nuevo'
                        onClick={this.add.bind(this)}
                    />
                    <ButtonComponent
                        disabled={true}
                        class='btn btn-info'
                        side={'left'}
                        form={this.props.title}
                        IconType="edit"
                        text='Modificar'
                        onClick={this.edit.bind(this)}
                    />
                    <ButtonComponent
                        class='btn btn-warning'
                        side={'left'}
                        IconType="step-backward"
                        form={this.props.title}
                        text='Cancelar'
                        onClick={this.clear.bind(this)}
                    />
                </div>
                <div className="row">
                    {this.getComponentTypes(data.fCampos)}
                </div>
                <div className="backGroundButtons" style={{ paddingBottom: '42px', paddingTop: '12px', marginBottom: '5px' }}>
                    <ButtonComponent
                        style={{ float: 'right', marginRight: '11px' }}
                        class='btn btn-success'
                        form={this.props.title}
                        side={'left'}
                        IconType="save"
                        disabled={true}
                        text='Guardar'
                        onClick={this.save.bind(this)}
                    />
                </div>

            </Panel>
        );
    }

    generateTypeMap = (data) => {
        const { Panel } = Collapse;

        this.panel = (<Panel header={'Parametros de ' + data.fHeader.descripcion} key={this.props.title + '1'} style={this.customPanelStyle}>
            <div className="row">
                {this.getComponentTypes(data.fCampos)}
            </div>
            <div className="backGroundButtons" style={{ paddingBottom: '9px', paddingTop: '12px', marginBottom: '5px' }} key={v1()}>
                <ButtonComponent
                    style={{ marginLeft: '11px' }}
                    class='btn btn-success'
                    disabled={true}
                    side={'left'}
                    IconType="plus-circle"
                    form={this.props.title}
                    text='Buscar'
                    onClick={this.getSearchMapData.bind(this)}
                />
                <ButtonComponent
                    class='btn btn-warning'
                    side={'left'}
                    IconType="step-backward"
                    form={this.props.title}
                    text='Cancelar'
                    onClick={this.clear.bind(this)}
                />
            </div>
        </Panel>);

        return (
            <Panel
                header={'Mapa de ' + data.fHeader.descripcion}
                key={this.props.title + '2'}
                style={this.customPanelStyle}>
                <div style={{
                    position: 'relative',
                    width: '100%',
                    overflow: 'hidden',
                    height: '800px',
                    maxHeight: '100%',
                }}>
                    <MapContainer title={this.props.title}> </MapContainer>
                </div>
            </Panel>

        )
    }

    generateTypeConsulta = (data) => {
        const { Panel } = Collapse;

        this.columns['columns' + this.props.title] = [];

        data.dtHeader.forEach(element => {
            if (element.descripcion === 'Información del Ciudadano') {
                this.columns['columns' + this.props.title].push({ title: element.descripcion, field: 'HTMLText', formatter: 'html' });
            } else {
                this.columns['columns' + this.props.title].push({ title: element.descripcion, field: element.nombreCampo, formatter: 'html' });
            }
        });

        return (
            <Panel header={'Parametros de ' + data.fHeader.descripcion} key={this.props.title + '1'} style={this.customPanelStyle}>
                <div className="row">
                    {this.getComponentTypes(data.fCampos)}
                </div>
                <div className="backGroundButtons" style={{ paddingBottom: '9px', paddingTop: '12px', marginBottom: '5px' }} key={v1()}>
                    <ButtonComponent
                        style={{ marginLeft: '11px' }}
                        class='btn btn-success'
                        disabled={true}
                        side={'left'}
                        IconType="plus-circle"
                        form={this.props.title}
                        text='Buscar'
                        onClick={this.getSearchData.bind(this)}
                    />
                    <ButtonComponent
                        side={'left'}
                        class='btn btn-warning'
                        IconType="step-backward"
                        form={this.props.title}
                        text='Cancelar'
                        onClick={this.clear.bind(this)}
                    />
                </div>
            </Panel>
        );
    }

    getComponents(data, index) {
        let panels = {
            'C': this.generateTypeConsulta,
            'M': this.generateTypeModal,
            'L': this.generateTypeMap,
            'W': data.dtHeader.length === 0 ? this.generateTypeAcordion : this.generateTypeAcordionGrid,
        }

        return panels[this.props.type](data, index);
    }

    async componentDidMount() {

        this.props.mobxStore.items['IdClasificacion'] = false;

        this.props.mobxStore.items['loading' + this.props.title] = false;
        this.props.mobxStore.items[this.props.title + 'activeKey'] = this.props.title + '1';
        this.columns['columns' + this.props.title] = [];
        if (this.props.type === 'M' || this.props.type === 'C' || this.props.type === 'L')
            await this.getSetFieldsData(this.props.formData, this.props.formId, this.props.type);
        this.props.mobxStore.items['disable' + this.props.title] = true;
        this.props.mobxStore.items['disable' + this.props.title + 'Guardar'] = true;
        this.props.mobxStore.items['disable' + this.props.title + 'Nuevo'] = false;
        this.props.mobxStore.items['disable' + this.props.title + 'Borrar'] = true;
        this.props.mobxStore.items['disable' + this.props.title + 'Modificar'] = true;
    }

    generateTypeB = (components) => {
        return (
            <div key={v1()} style={{ padding: '20px', backgroundColor: 'white', borderRadius: '5px' }}>
                <PanelComponent
                    componentes={components}
                    title={this.props.title}
                    columns={this.columns['columns' + this.props.title]}
                    key={this.props.title + '2'}
                    type={this.props.type}
                    header={this.props.type === 'C' ? 'Informe de ' + this.props.formData[0].fHeader.descripcion
                        : this.props.formData[0].fHeader.titulo1.substring(8, this.props.formData[0].fHeader.titulo1.length - 9)}
                >
                </PanelComponent>
            </div>
        )
    }

    generateTypeL = (components) => {
        components.unshift(this.panel);
        return (
            <div key={v1()} style={{ padding: '20px', backgroundColor: 'white', borderRadius: '5px' }}>
                <PanelComponent
                    componentes={components}
                    title={this.props.title}
                    key={this.props.title + '3'}
                    columns={this.columns['columns' + this.props.title]}
                    type={this.props.type}
                    header={this.props.formData[0].fHeader.descripcion}
                >
                </PanelComponent>
            </div>
        )
    }

    generateTypeA = (components) => {
        return (
            <div key={v1()} style={{ padding: '20px', backgroundColor: 'white', borderRadius: '5px' }}>
                <Collapse
                    accordion
                    key={v1()}
                    onChange={this.onPanelChange}
                    bordered={false}
                    style={{ color: 'white !important' }}
                    expandIcon={({ isActive }) => <Icon style={{ color: 'white !important' }} type="caret-right" rotate={isActive ? 90 : 0} />}
                >
                    {components}

                </Collapse>
            </div>
        )
    }

    render() {
        this.dataLength = this.props.formData.length - 1;

        if (this.props.type === 'M' || this.props.type === 'C' || this.props.type === 'L') this.setGridColumns(this.props.formData);
        const components = this.props.formData && this.props.formData.map(this.getComponents.bind(this));

        let forms = {
            'W': this.generateTypeA,
            'L': this.generateTypeL,
            'M': this.generateTypeB,
            'C': this.generateTypeB,
        };

        return forms[this.props.type](components);
    }
}

export default inject("mobxStore")(observer(FormGenerator));
