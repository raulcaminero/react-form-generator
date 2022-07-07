import * as React from 'react';
import { Icon } from 'antd';
import { observer, inject } from 'mobx-react';

class ButtonComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasChanged: false,
            value: '',
        };
    }

    onChange(event) {
        this.props.onChange(event.target.name, event.target.value);
    }

    save(event) {
        console.log(event);
        this.props.onClick(event);
    }

    getButton() {
        const _Button = (
            <button type="button"
                onClick={this.save.bind(this)}
                className={this.props.class}
                style={this.props.style}
                disabled={this.props.disabled ? this.props.mobxStore.items['disable' + this.props.form + this.props.text] : false}
            >
                <Icon style={{ float: this.props.side, paddingRight: '4px', paddingTop: '2px' }} type={this.props.IconType} theme="filled" />
                {this.props.text}
            </button>
        );

        return _Button;
    }

    render() {
        const Button = this.getButton();

        return Button;

    }
}

export default inject("mobxStore")(observer(ButtonComponent));
