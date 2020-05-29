import React, { Component } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Box from '@material-ui/core/Box';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Errors extends Component {
    render() {
        let errors;

        this.props.msg.msg ?
            errors =
            <Box width="75%">
                <Alert severity="error" >
                    <AlertTitle>Error</AlertTitle>
                    <strong>{this.props.msg.msg}</strong>
                </Alert >
            </Box>
            :
            errors = null

        return (
            errors
        );
    }

}

Errors.propTypes = {
    msg: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    msg: state.error.msg
});

export default connect(mapStateToProps, null)(Errors);

