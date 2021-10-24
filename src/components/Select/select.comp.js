import * as React from 'react';
import { Select, Icon } from 'antd';
import { observer, inject } from 'mobx-react';
import { v1 } from 'uuid';

class SelectComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasChanged: false,
            userName: '',
        };
    }

    onChange(value, props) {
        this.props.onChange(props.props.name, value);
    }

    getOptions(data, name) {
        const { Option } = Select;

        return data && data.map(i => <Option name={name} key={v1()} value={`${i.value}`}>{i.text}</Option>);
    }

    componentDidMount() {
        if (this.props.default) {
            let index = this.props.default.indexOf(';');
            this.props.mobxStore.items['currentItem' + this.props.title][this.props.name] = this.props.default.substring(0, index);
        }
    }

    getSelect() { 
        const { name } = this.props;
        // this.props.mobxStore.items['currentItem' + this.props.title][this.props.name] = this.props.default.substring(2, this.props.default.length);


        const _Select = (
            <Select
                mode={this.props.mode || ''}
                name={name}
                style={{ width: '100%' }}
                onChange={this.onChange.bind(this)}
                value={this.props.mobxStore.items['currentItem' + this.props.title][name]}
                disabled={(this.props.formType === 'M' && this.props.readOnly != true) ?
                    this.props.mobxStore.items['disable' + this.props.title] : this.props.readOnly ? true : false}
                key={v1()}
            >
                {this.getOptions(this.props.mobxStore.items['fieldData' + this.props.title + name], name)}

            </Select>
        );

        return _Select;
    }

    render() {
        const Select = this.getSelect();
        return Select;

    }
}

export default inject("mobxStore")(observer(SelectComponent));

