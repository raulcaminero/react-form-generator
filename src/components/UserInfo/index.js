import React from 'react';
import Avatar from '@material-ui/core/Avatar'
import { connect } from 'react-redux'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { userSignOut } from 'actions/Auth';
import IntlMessages from 'util/IntlMessages';
import { inject, observer } from 'mobx-react';

class UserInfo extends React.Component {

  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    return (
      <div style={{ paddingLeft: '15.2px' }} className="user-profile d-flex flex-row align-items-center">
        <Avatar
          alt='...'
          src={currentUser.foto}
          className="user-avatar "
        />
        {!this.props.collapsed ? <div style={{ overflow: 'hidden' }} className="user-detail">
          <h4 style={{ color: 'white', overflow: 'hidden' }} className="user-name" onClick={this.handleClick}>{currentUser.nombre} <i
            className="zmdi zmdi-caret-down zmdi-hc-fw align-middle" />
          </h4>
        </div> : ''}
        <Menu className="user-info"
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleRequestClose}
          PaperProps={{
            style: {
              minWidth: 120,
              paddingTop: 0,
              paddingBottom: 0
            }
          }}
        >
          <MenuItem onClick={this.handleRequestClose}>
            <i className="zmdi zmdi-account zmdi-hc-fw mr-2" />
            <IntlMessages id="popup.profile" />
          </MenuItem>
          <MenuItem onClick={this.handleRequestClose}>
            <i className="zmdi zmdi-settings zmdi-hc-fw mr-2" />
            <IntlMessages id="popup.setting" />
          </MenuItem>
          <MenuItem onClick={() => {
            this.handleRequestClose();
            this.props.userSignOut()
          }}>
            <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2" />

            <IntlMessages id="popup.logout" />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return { locale }
};

export default inject("mobxStore")(connect(mapStateToProps, { userSignOut })(UserInfo));


