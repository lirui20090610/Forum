import React, { Component } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Box from '@material-ui/core/Box';

export default class Errors extends Component {
    render() {
        let errors;

        this.props.msg ?
            errors = <Box width="75%"
            ><Alert severity="error" >
                    <AlertTitle>Error</AlertTitle>
                    <strong>{this.props.msg}</strong>
                </Alert ></Box>
            :
            errors = null

        return (
            errors
        );
    }

}

