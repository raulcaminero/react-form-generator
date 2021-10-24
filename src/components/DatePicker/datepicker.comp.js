import * as React from 'react';
import { DatePicker } from 'antd';
import { observer, inject } from 'mobx-react';
import locale from 'antd/lib/date-picker/locale/es_ES';
import moment from 'moment';
import { v1 } from 'uuid';

class DatePickerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasChanged: false,
            userName: '',
        };
    }

    onChange(event, value) {
        this.props.onChange(this.props.name, event, value);
    }

    componentDidMount() {
        if (this.props.default) {
            this.props.mobxStore.items['currentItem' + this.props.title][this.props.name + 'moment'] = moment(this.props.default);
            this.props.mobxStore.items['currentItem' + this.props.title][this.props.name] = moment(this.props.default)._i;
        }
    }

    getDatePicker() {
        const { name } = this.props;

        const _DatePicker = (
            <DatePicker
                locale={locale}
                default={this.props.default}
                name={name}
                style={{ width: '100%' }}
                onChange={this.onChange.bind(this)}
                value={this.props.mobxStore.items['currentItem' + this.props.title][name + 'moment']}
                disabled={(this.props.formType === 'M' && this.props.readOnly != true) ?
                    this.props.mobxStore.items['disable' + this.props.title] : this.props.readOnly ? true : false}
                key={v1()}
            />
        );
        return _DatePicker;
    }

    render() {
        const DatePicker = this.getDatePicker();
        return DatePicker;
    }
}

export default inject("mobxStore")(observer(DatePickerComponent));

