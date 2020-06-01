import React, { Component } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Box from '@material-ui/core/Box';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default class Errors extends Component {
    render() {
        let errors;

        this.props.msg ?
            errors =
            <Box width="75%">
                <Alert severity="error" >
                    <AlertTitle>Error</AlertTitle>
                    <strong>{this.props.msg}</strong>
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
    msg: PropTypes.string,
}

// const mapStateToProps = (state) => ({
//     msg: state.error.msg
// });

// export default connect(mapStateToProps, null)(Errors);


