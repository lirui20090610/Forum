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
import Paper from '@material-ui/core/Paper';
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
import { register } from '../../../actions/authActions';
import { clearErrors } from '../../../actions/errorActions';


const styles = theme => ({
    root: {
        height: '100vh',
    },
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
        marginTop: theme.spacing(3),
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
    },
    image: {
        backgroundImage: `url(${"/static/avatars/1.jpg"})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

});


class RegisterModal extends Component {
    state = {
        modal: false,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        msg: null
    }


    componentDidMount() {

        this.props.history.location.pathname === '/signup' ?
            this.setState({ modal: true })
            : null

    }
    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null })
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

        const { firstName, lastName, email, password } = this.state;

        // Create user object
        const newUser = {
            firstName,
            lastName,
            email,
            password
        };
        //Attempt to register
        this.props.register(newUser);
        this.props.history.push('/');

    }

    render() {
        const { classes } = this.props;

        return (

            <Container maxWidth="xs">
                <CssBaseline />
                <Button variant="contained" color="primary" onClick={this.toggle} >
                    Register
                </Button>
                <Dialog open={this.state.modal} >
                    <Grid container className={classes.root}>
                        <Grid item xs={false} sm={4} md={4} className={classes.image} />
                        <Grid item xs={12} sm={8} md={8} component={Paper} elevation={6} square>

                            <div className={classes.paper} >
                                <IconButton onClick={this.toggle} className={classes.CloseButton}>
                                    <CloseIcon />
                                </IconButton>
                                <Avatar className={classes.avatar}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign up
                                </Typography>
                                {/* <Typography component="h5" variant="b1">
                                    Validate your email to register a PandaPressX account.
                                </Typography> */}
                                <Errors msg={this.state.msg} />
                                <form className={classes.form} noValidate onSubmit={this.onSubmit} onChange={this.onChange}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="fname"
                                                name="firstName"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="First Name"
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="lastName"
                                                label="Last Name"
                                                name="lastName"
                                                autoComplete="lname"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="current-password"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                                label="I want to receive inspiration, marketing promotions and updates via email."
                                            />
                                        </Grid>
                                    </Grid>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Sign Up
                                    </Button>
                                    {/* <Grid item xs={12} cols={10}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                            />
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >
                                            Validate email
                                        </Button>
                                    </Grid> */}
                                    <Grid container justify="flex-end">
                                        <Grid item>
                                            <Link component={RouterLink} to="/login" onClick={this.toggle} >
                                                Already have an account? Sign in
                                        </Link>
                                        </Grid>
                                    </Grid>
                                </form>
                            </div>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </Grid>
                    </Grid>
                </Dialog>
            </Container>
        );
    }
}


RegisterModal.propTypes = {
    // classes: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    // error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}


const mapStateToProps = (state) => ({
    // isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

RegisterModal = withRouter(RegisterModal);
RegisterModal = withStyles(styles)(RegisterModal);
export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);