import React from 'react';
import { observer, inject } from 'mobx-react';
import { Tabs } from 'antd';

class Forms extends React.Component {
    constructor(props) {
        super(props);

    }

    onChange = activeKey => {
        this.props.mobxStore.activeKey = activeKey;
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    // add = () => {
    //     const { panes } = this.state;
    //     const activeKey = `newTab${this.newTabIndex++}`;
    //     this.props.mobxStore.tabs.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
    //     this.props.mobxStore.activeKey = activeKey;
    //     // this.setState({ panes, activeKey });
    // };

    remove = targetKey => {

        let activeKey = this.props.mobxStore.activeKey;
        let lastIndex;
        this.props.mobxStore.tabs.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.props.mobxStore.tabs.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }

        this.props.mobxStore.tabs = panes;
        this.props.mobxStore.activeKey = activeKey;
        this.forceUpdate();
    };

    render() {
        const { TabPane } = Tabs;

        return (
            <Tabs
                hideAdd
                onChange={this.onChange}
                activeKey={this.props.mobxStore.activeKey}
                type="editable-card"
                onEdit={this.onEdit}>

                {this.props.mobxStore.tabs.map(pane => (
                    <TabPane tab={pane.title} key={pane.key} closable={true}>
                        {pane.content}
                    </TabPane>
                ))}
            </Tabs>
        );
    }
}

export default inject("mobxStore")(observer(Forms));