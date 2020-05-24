import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { logout } from '../../../actions/authActions';
import PropTypes from 'prop-types';

export class Logout extends Component {

    componentDidUpdate(prevProps) {
        const { isAuthenticated } = this.props;

        if (!isAuthenticated) {
            // redirect to '/'
            this.props.history.push('/');
        }

    }
    render() {
        return (
            <Fragment>
                <Button variant="contained" color="primary" onClick={this.props.logout} >
                    Logout
                </Button>
            </Fragment>
        )
    }
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

Logout = withRouter(Logout);

export default connect(mapStateToProps, { logout })(Logout);