import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl'
import defaultTheme from './themes/defaultTheme';
import "assets/vendors/style"
import AppLocale from '../lngProvider';
import { Provider } from 'mobx-react';
import MainApp from 'app/index';
import SignIn from './SignIn';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { setInitUrl } from '../actions/Auth';
import RTL from 'util/RTL';
import asyncComponent from 'util/asyncComponent';
import MobxStore from '../store/mobxStore.js'

const RestrictedRoute = ({ component: Component, authUser, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      <Component {...props} />
    }
  />

class App extends Component {

  componentWillMount() {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
    if (this.props.initURL === '') {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
  }

  render() {
    const { match, location, locale, authUser, initURL, isDirectionRTL } = this.props;
    if (location.pathname === '/') {
      // if (authUser === null) {
      //   return (<Redirect to={'/signin'} />);
      // } else 
      if (initURL === '' || initURL === '/' || initURL === '/signin') {
        return (<Redirect to={'/signin'} />);
      }
      // return ( <Redirect to={'/app/denuncias/denuncias-presenciales/denuncias-presenciales'}/> );
      // } else {
      //   return (<Redirect to={initURL} />);
      // }
    }
    const applyTheme = createMuiTheme(defaultTheme);

    if (isDirectionRTL) {
      applyTheme.direction = 'rtl';
      document.body.classList.add('rtl')
    } else {
      document.body.classList.remove('rtl');
      applyTheme.direction = 'ltr';
    }

    const currentAppLocale = AppLocale[locale.locale];
    return (
      <Provider mobxStore={MobxStore}>
        <ReactNotification />
        <MuiThemeProvider theme={applyTheme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <IntlProvider
              locale={currentAppLocale.locale}
              messages={currentAppLocale.messages}>
              <RTL>
                <div className="app-main">
                  <Switch>
                    <RestrictedRoute path={`${match.url}app`}
                      component={MainApp} />
                    <Route path='/signin' component={SignIn} />

                    <Route
                      component={asyncComponent(() => import('components/Error404'))} />
                  </Switch>
                </div>
              </RTL>
            </IntlProvider>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const { sideNavColor, locale, isDirectionRTL } = settings;
  const { authUser, initURL } = auth;
  return { sideNavColor, locale, isDirectionRTL, authUser, initURL }
};

export default withRouter(connect(mapStateToProps, { setInitUrl })(App));

