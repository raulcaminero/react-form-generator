import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MenuGenerator from 'components/MenuGenerator'

class SidenavContent extends Component {
  render() {
    return (
      <MenuGenerator props={this.props}></MenuGenerator>
    );
  }
}

export default withRouter(SidenavContent);
