import * as React from 'react';
import { InputNumber } from 'antd';
import { observer, inject } from 'mobx-react';

class InputNumberComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasChanged: false,
            value: '',
        };
    }

    onChange(value) {
        this.props.onChange(this.props.name, value);
    }

    componentDidMount() {
        if (this.props.default) this.props.mobxStore.items['currentItem' + this.props.title][this.props.name] = this.props.default;
    }

    getInputNumber() {
        const { name } = this.props;

        const _InputNumber = (
            <InputNumber
                style={{ width: '100%' }}
                disabled={(this.props.formType === 'M' && this.props.readOnly != true) ?
                    this.props.mobxStore.items['disable' + this.props.title] : this.props.readOnly ? true : false}
                onChange={this.onChange.bind(this)}
                value={this.props.mobxStore.items['currentItem' + this.props.title][name]}
                // value={this.props.mobxStore.item[name]}
                name={name}
            />
        );

        return _InputNumber;
    }

    render() {
        console.log('inputNumber rerender');
        const InputNumber = this.getInputNumber();

        return InputNumber;
    }
}

export default inject("mobxStore")(observer(InputNumberComponent));
