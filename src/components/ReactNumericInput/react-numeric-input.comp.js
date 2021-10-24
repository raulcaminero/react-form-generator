import * as React from 'react';
import { observer, inject } from 'mobx-react';
import NumericInput from 'react-numeric-input';

class ReactNumericInputComponent extends React.Component {

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

    getNumericInput() {
        const { name } = this.props;

        const _NumericInput = (
            <NumericInput
                mobile
                style={{
                    wrap: {
                        borderRadius: '5px',
                        width: '100%',
                    },
                    input: {
                        height: '31px',
                        borderRadius: '5px',
                        width: '100%'
                    }
                }}
                disabled={(this.props.formType === 'M' && this.props.readOnly != true) ?
                    this.props.mobxStore.items['disable' + this.props.title] : this.props.readOnly ? true : false}
                onChange={this.onChange.bind(this)}
                value={this.props.mobxStore.items['currentItem' + this.props.title][name]}
                name={name}
            />
        );

        return _NumericInput;
    }

    render() {
        console.log('inputNumber rerender');
        const NumericInput = this.getNumericInput();

        return NumericInput;
    }
}

export default inject("mobxStore")(observer(ReactNumericInputComponent));
