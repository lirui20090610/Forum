import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './authModal/RegisterModal';
import LoginModal from './authModal/LoginModal';
import Logout from './authModal/Logout';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    appBarButton: {
        display: 'flex',
    },
});
let manageLogin;

class AuthModal extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    componentDidUpdate(prevProps) {
    }
    render() {
        const { classes } = this.props;
        const { user } = this.props.auth;
        if (user) {
            manageLogin = (
                <div className={classes.appBarButton} >
                    <span className="navbar-text mr-3">
                        <strong>{user ? `Hello ${user.firstName}` : ''}</strong>
                    </span>
                    <Logout />
                </div>
            );
        } else {
            manageLogin = (
                <div className={classes.appBarButton}>
                    <RegisterModal />
                    <LoginModal />
                </div>
            );
        }

        return (
            <div>
                <Router>
                    <Switch>
                        <Route path='/' exact key='main' >
                            {manageLogin}
                        </Route>

                        <Route path='/login' exact key='login'>
                            {manageLogin}
                        </Route>

                        <Route path='/signup' exact key='signup'>
                            {manageLogin}
                        </Route>

                        <Route path='/forgetpassword' exact>
                            forget password
                        </Route>
                    </Switch>
                </Router>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(withStyles(styles)(AuthModal));

