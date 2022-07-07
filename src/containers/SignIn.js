import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import { NavLink, Link, withRouter } from 'react-router-dom';
import InputComponent from 'components/input/input.comp.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userSignIn,
  userTwitterSignIn
} from 'actions/Auth';
import LoginService from 'services/login_service'
import { store } from 'react-notifications-component';

const maxWidth = '90%';
class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  store;
  loginData = {};

  service = new LoginService();

  async signIn() {
    const username = btoa(this.loginData.username);
    const password = btoa(this.loginData.password);
    const response = await this.service.Login(password, username);

    if (!response.data.error) {
      sessionStorage.setItem('currentUser', JSON.stringify({ token: response.data.TokenKey, userId: response.data.UserID, nombre: response.data.Nombre, foto:response.data.Foto  }));
      this.props.history.push('/app/Home');
    } else {
      store.addNotification({
        title: "Error",
        message: "Usuario o contraseña incorrecto.",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
        }
      });
    }
  }

  onChange(item) {
    const key = Object.keys(item);
    this.loginData[key] = item[key];
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 100);
    }
    if (this.props.authUser !== null) {
      this.props.history.push('/');
    }
  }

  render() {
    const {
      email,
      password
    } = this.state;

    const { showMessage, loader, alertMessage } = this.props;
    return (
      <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">

        <div className="app-login-main-content">

          <div style={{ zIndex: 10502, position: 'relative', backgroundColor: '#0c567d' }} className="app-logo-content d-flex align-items-center justify-content-center">
            <Link className="logo-lg" to="/">
              <img style={{ maxHeight: 260 }} src={require("assets/images/logo.png")} alt="constantino" title="constantino" />
            </Link>
          </div>

          <div style={{ zIndex: 10502, position: 'relative', backgroundColor: 'e8e8e8' }} className="app-login-content">
            <div className="app-login-header text-center">
              <img style={{ maxWidth: maxWidth }} src={require("assets/images/title.png")} alt="title" />
            </div>

            <div className="app-login-form">
              <form>
                <fieldset>
                  <TextField
                    label="Usuario"
                    fullWidth
                    onChange={(event) => this.onChange({ username: event.target.value })}
                    margin="normal"
                    className="mt-1 my-sm-3 text-white"
                  />
                  <TextField
                    type="password"
                    label="Contraseña"
                    fullWidth
                    onChange={(event) => this.onChange({ password: event.target.value })}
                    margin="normal"
                    className="mt-1 my-sm-3 text-white"
                  />

                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <Button className="btn-block" onClick={() => {
                      this.signIn();
                    }} variant="contained" color="primary">
                      Ingresar a Constantino
                    </Button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>

        </div>
        {
          loader &&
          <div className="loader-view">
            <CircularProgress />
          </div>
        }
        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer />
      </div>
    );
  }
}


const mapStateToProps = ({ auth }) => {
  const { loader, alertMessage, showMessage, authUser } = auth;
  return { loader, alertMessage, showMessage, authUser }
};

export default withRouter(connect(mapStateToProps, {
  userSignIn,
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGoogleSignIn,
  userGithubSignIn,
  userTwitterSignIn
})(SignIn));
