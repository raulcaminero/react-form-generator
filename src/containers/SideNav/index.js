import React from 'react';
import SidenavContent from './SidenavContent';
import UserInfo from 'components/UserInfo';
import { Layout } from 'antd';
import { inject } from 'mobx-react';

const { Sider } = Layout;

class SideNav extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
    this.props.mobxStore.collapsed = collapsed;
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={"240px"} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <div id='logo' className="user-profile d-flex flex-row align-items-center">


            <div className="user-detail">
              <h1 style={{ color: 'white', float: 'right', paddingLeft: '51px', overflow: 'hidden' }} className="user-name" onClick={this.handleClick}> {!this.props.mobxStore.collapsed ? 'Constantino' : ''} <i
                className="zmdi " />
              </h1>
            </div>

          </div>
          <SidenavContent />
        </Sider>
      </Layout>
    );
  }
}

export default inject("mobxStore")(SideNav);
