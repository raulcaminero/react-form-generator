import * as React from 'react';
import { TreeSelect } from 'antd';
import { observer, inject } from 'mobx-react';
import { v1 } from 'uuid';

class TreeSelectComponent extends React.Component {

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

    getTreeSelect() {
        const { name } = this.props;

        const _TreeSelect = (
            <TreeSelect
                showSearch
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Seleccione..."
                allowClear
                name={name}
                onChange={this.onChange.bind(this)}
                treeDefaultExpandAll
            >
                {this.getNodes(this.props.mobxStore.items['fieldData' + this.props.title + name])}

            </TreeSelect>
        );

        return _TreeSelect;
    }

    render() {
        const TreeSelect = this.getTreeSelect();
        return TreeSelect;

    }
}

export default inject("mobxStore")(observer(TreeSelectComponent));

