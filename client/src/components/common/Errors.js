import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import MuiAlert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';




export default class Errors extends Component {
    state = {
        toggle: true,
    }
    componentWillReceiveProps() {
        this.setState({
            toggle: true
        });
    }


    handleClose = () => {
        this.setState({
            toggle: false,
        });
    }
    render() {
        const { classes } = this.props;
        let errors;

        this.props.msg ?
            errors =
            <Box>
                <Snackbar open={this.state.toggle} onClose={this.handleClose}>
                    <MuiAlert onClose={this.handleClose} elevation={6} variant="filled" severity="error">
                        {this.props.msg}
                    </MuiAlert>
                </Snackbar>

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
// Errors = withStyles(styles)(Errors);
// export default Errors;


