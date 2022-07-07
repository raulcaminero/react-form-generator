import * as React from 'react';
import { Select, Icon } from 'antd';
import { observer, inject } from 'mobx-react';
import { v1 } from 'uuid';

class MultiSelectComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasChanged: false,
            userName: '',
        };
    }

    onChange(value, event) {
        this.props.onChange(event[0] && event[0].props.name, value);
    }

    getOptions(data, name) {
        const { Option } = Select;

        return data && data.map(i => <Option name={name} key={v1()} value={`${i.value}`}>{i.text}</Option>);
    }

    getMultiSelect() {
        const { name } = this.props;

        const _Select = (
            <Select
                mode='multiple'
                style={{ width: '100%' }}
                onChange={this.onChange.bind(this)}
                // value={this.props.mobxStore.items[this.props.title][name]}
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
        const Select = this.getMultiSelect();
        return Select;
    }
}

export default inject("mobxStore")(observer(MultiSelectComponent));

