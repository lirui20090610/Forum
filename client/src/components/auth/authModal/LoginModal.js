import React, { Component } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Copyright from '../../common/Copyright';
import Errors from '../../common/Errors';
import { login } from '../../../actions/authActions';
import { clearErrors } from '../../../actions/errorActions';




const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '90%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    CloseButton: {
        position: 'absolute',
        top: '0',
        right: '0'
    },
    alert: {
        width: '100%',
    }
});

class LoginModal extends Component {
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
    componentWillMount() {

        this.props.history.location.pathname === '/login' ?
            this.setState({ modal: true })
            : null

    }
    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'LOGIN_FAIL') {
                //do something here
            }
        }

        // If authenticated, close modal
        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();

                // redirect to 'logedin'
                this.props.history.push('/logedin');
            }
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        const user = {
            email,
            password
        }

        // Attempt to login
        this.props.login(user);

    }

    render() {
        const { classes } = this.props;

        return (

            <Container maxWidth="xs" >
                <CssBaseline />
                <Button variant="contained" color="primary" onClick={this.toggle} >
                    Login
                </Button>
                <Dialog open={this.state.modal}>
                    <div className={classes.paper}>
                        <IconButton onClick={this.toggle} className={classes.CloseButton}>
                            <CloseIcon />
                        </IconButton>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Errors />
                        <form className={classes.form} noValidate onSubmit={this.onSubmit} onChange={this.onChange}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            {/* <Link > */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                                </Button>
                            {/* </Link> */}

                            <Grid container>
                                <Grid item xs>
                                    <Link component={RouterLink} to="/forgetpassword" >
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link component={RouterLink} to="/signup" onClick={this.toggle}>
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </Dialog>
            </Container>
        )
    };
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

LoginModal = withRouter(LoginModal);
LoginModal = (withStyles(styles)(LoginModal));
export default connect(mapStateToProps, { login, clearErrors })(LoginModal);