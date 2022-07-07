import * as React from 'react';
import { TreeSelect } from 'antd';
import { observer, inject } from 'mobx-react';
import { v1 } from 'uuid';

class SelectTreeMultiComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasChanged: false,
            userName: '',
        };
    }

    onChange(event) {
        this.props.onChange(this.props.name, event);
    }

    getNodes(data) {
        const { TreeNode } = TreeSelect;

        const nodes = data && data.map(i => {

            return (
                <TreeNode
                    title={i.title}
                    key={v1()}
                    name={i.nombreCampo}
                    value={`${i.text}`}
                >
                    {this.getNodes(i.children)}
                </TreeNode>
            );
        });

        return nodes;
    }

    getSelectTreeMulti() {
        const { name } = this.props;

        const _SelectTreeMulti = (
            <TreeSelect
                multiple
                showSearch
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Seleccione..."
                allowClear
                disabled={(this.props.formType === 'M' && this.props.readOnly != true) ?
                    this.props.mobxStore.items['disable' + this.props.title] : this.props.readOnly ? true : false}
                name={name}
                onChange={this.onChange.bind(this)}
                treeDefaultExpandAll
            >
                {this.getNodes(this.props.mobxStore.items['fieldData' + this.props.title + name])}

            </TreeSelect>
        );

        return _SelectTreeMulti;
    }

    render() {
        const SelectTreeMulti = this.getSelectTreeMulti();
        return SelectTreeMulti;

    }
}

export default inject("mobxStore")(observer(SelectTreeMultiComponent));

