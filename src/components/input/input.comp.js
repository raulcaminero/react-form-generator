import * as React from 'react';
import { Input, Icon } from 'antd';
import { observer, inject } from 'mobx-react';

class InputComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hasChanged: false,
      value: '',
    };
  }

  onChange(event) {
    if (this.props.controlType === 'Text') {
      let text = event.target.value;
      this.props.onChange(event.target.name, text.toUpperCase());
    } else {
      this.props.onChange(event.target.name, event.target.value);
    }
  }


  componentDidMount() {
    if (this.props.default) this.props.mobxStore.items['currentItem' + this.props.title][this.props.name] = this.props.default;
  }

  getInput() {
    const { name } = this.props;

    const _Input = (
      <Input
        disabled={(this.props.formType === 'M' && this.props.readOnly != true) ?
          this.props.mobxStore.items['disable' + this.props.title] : this.props.readOnly ? true : false}
        onChange={this.onChange.bind(this)}
        value={this.props.mobxStore.items['currentItem' + this.props.title][name]}
        name={name}
      />
    );

    return _Input;
  }

  render() {
    console.log('input rerender');
    const Input = this.getInput();

    return Input;

  }
}

export default inject("mobxStore")(observer(InputComponent));
