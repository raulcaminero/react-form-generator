import * as React from 'react';
import { Select, Icon } from 'antd';
import { observer, inject } from 'mobx-react';
import { v1 } from 'uuid';

import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css';

class GridComponent extends React.Component {
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
    }

    componentDidMount() {
        // this.props.mobxStore.items['gridData' + this.props.title] = [];

    }

    onChange(value, event) {
        this.props.onChange(event[0] && event[0].props.name, value);
    }

    getOptions(data, name) {
        const { Option } = Select;

        return data && data.map(i => <Option name={name} key={v1()} value={`${i.value}`}>{i.text}</Option>);
    }

    rowClick = (e, row) => {
        // this.props.mobxStore.items[this.props.title + 'activeKey'] = this.props.title + '1';

        setTimeout(() => {
            this.props.mobxStore.items['currentItem' + this.props.title] = row._row.data;
        }, 300);

        this.props.mobxStore.items['disable' + this.props.title + 'Modificar'] = false;
    };

    getGrid() {
        const { name } = this.props;

        const _Grid = (
            <ReactTabulator
                style={{ width: '100%' }}
                columns={this.props.columns}
                data={this.props.mobxStore.items['gridData' + this.props.title] || []}
                options={{
                    pagination: 'local',
                    paginationSize: 10,
                    paginationSizeSelector: [10, 25, 50, 100, this.props.mobxStore.items['gridData' + this.props.title] && this.props.mobxStore.items['gridData' + this.props.title].length + 1]
                }}
                rowClick={this.rowClick}
            />
        );

        return _Grid;
    }

    render() {
        console.log('Grid rerender');
        const Grid = this.getGrid();
        return Grid;
    }
}

export default inject("mobxStore")(observer(GridComponent));

