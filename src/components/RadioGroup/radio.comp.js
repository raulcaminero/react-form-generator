import * as React from 'react';
import { Radio, Icon } from 'antd';
import { observer, inject } from 'mobx-react';
import { v1 } from 'uuid';

class RadioComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasChanged: false,
            value: '',
        };
    }

    state = {
        value: 1,
    };

    onChange(e) {
        console.log('radio checked', e.target.value);
        this.props.onChange(e.target.name, e.target.value);
    };



    getRadios(data, name) {
        let width;
        if (this.props.mobxStore.items['fieldData' + this.props.title + name])
            width = 100 / this.props.mobxStore.items['fieldData' + this.props.title + name].length;

        return data && data.map(i => <Radio.Button style={{ width: `${width}%` }} key={v1()} value={`${i.value}`}>{i.text}</Radio.Button>);
    }

    componentDidMount() {
        if (this.props.default) this.props.mobxStore.items['currentItem' + this.props.title][this.props.name] = this.props.default.charAt(0);
    }

    getRadio() {
        const { name } = this.props;

        const _Radio = (
            <Radio.Group
                style={{ width: '100%', position: 'absolute !important', paddingRight: '12px !important' }}
                name={name}
                buttonStyle="solid"
                onChange={this.onChange.bind(this)}
                value={this.props.mobxStore.items['currentItem' + this.props.title][name]}
                disabled={(this.props.formType === 'M' && this.props.readOnly != true) ?
                    this.props.mobxStore.items['disable' + this.props.title] : this.props.readOnly ? true : false}
            >
                {this.getRadios(this.props.mobxStore.items['fieldData' + this.props.title + name], name)}
            </Radio.Group>
        );

        return _Radio;
    }

    render() {
        console.log('Radio rerender');
        const Radio = this.getRadio();

        return Radio;

    }
}

export default inject("mobxStore")(observer(RadioComponent));
