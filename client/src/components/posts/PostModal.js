import React, { Component } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
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
import ImageIcon from '@material-ui/icons/Image';
import GifIcon from '@material-ui/icons/Gif';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import BarChartIcon from '@material-ui/icons/BarChart';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Errors from '../common/Errors';





const styles = theme => ({

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
    },
    avatarButton: {
        // margin: theme.spacing(4),
        marginTop: theme.spacing(5),
        padding: 0,
    },
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    form: {
        width: '90%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

    alert: {
        width: '100%',
    }
});

class PostModal extends Component {
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    }

    // static propTypes = {
    //     isAuthenticated: PropTypes.bool,
    //     error: PropTypes.object.isRequired,
    //     login: PropTypes.func.isRequired,
    //     clearErrors: PropTypes.func.isRequired
    // }


    render() {
        const { classes } = this.props;

        return (

            <Container component="main" maxWidth="xs">
                <Paper elevation={3} >
                    <CssBaseline />
                    <div className={classes.paper}>
                        <IconButton className={classes.closeButton}>
                            <CloseIcon />
                        </IconButton>
                        <IconButton className={classes.avatarButton}>
                            <Avatar className={classes.avatar} alt="Remy Sharp" src="/static/avatars/1.jpg" />
                        </IconButton>

                        <form className={classes.form} noValidate>
                            <TextField
                                id="standard-basic"

                                margin="normal"
                                fullWidth
                                label="Post your post"
                                name="title"
                                autoComplete="email"
                            />
                            <Grid container >
                                <Grid item>
                                    <IconButton color='secondary'>
                                        <ImageIcon />
                                    </IconButton>
                                </Grid>

                                <Grid item>
                                    <IconButton color='secondary'>
                                        <GifIcon />
                                    </IconButton>
                                </Grid>

                                <Grid item>
                                    <IconButton color='secondary'>
                                        <VideoLabelIcon />
                                    </IconButton>
                                </Grid>


                                <Grid item>
                                    <IconButton color='secondary'>
                                        <EmojiEmotionsIcon />
                                    </IconButton>
                                </Grid>


                                <Grid item>
                                    <IconButton color='secondary'>
                                        <BarChartIcon />
                                    </IconButton>
                                </Grid>


                            </Grid>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                multiline
                                rows={4}
                                fullWidth
                                name="content"
                                label="Your thoughts"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Submit
                            </Button>

                        </form>
                    </div>
                </Paper>
            </Container>


        )
    };
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});


export default withStyles(styles)(PostModal);