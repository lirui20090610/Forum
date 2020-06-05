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
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import ImageIcon from '@material-ui/icons/Image';
import GifIcon from '@material-ui/icons/Gif';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import BarChartIcon from '@material-ui/icons/BarChart';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Errors from '../common/Errors';
import FileGridList from '../common/FileGridList';
import {
    uploadPost,
    addFiles,
    validateFile,
    getSourceID,
} from '../../actions/postActions';
import { clearErrors } from '../../actions/errorActions';



const styles = theme => ({

    paper: {
        // marginTop: theme.spacing(8),
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
    input: {
        display: 'none',
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
    },
    dialog: {
        width: '60%'
    },
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class PostModal extends Component {
    state = {
        modal: false,
        title: '',
        content: '',
        msg: null
    }
    componentDidUpdate(prevProps) {
        const { error } = this.props;
        const { sourceID } = this.props.post;
        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'POST_FAIL') {
                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null })
            }
        }

        // console.log(this.props.post.sourceID === null, this.props.post.files.length != 0);
        // if (this.props.post.sourceID === null && this.props.post.files.length !== 0) {
        //     this.props.getSourceID();
        // }
        // console.log(this.props.post.sourceID);
        // if (this.props.post.sourceID && needValidate) {
        //     this.props.validateFile();
        // }
        // If authenticated, close modal
        // if (isUploaded) {
        //     console.log("successful!!");
        // }
    }

    toggle = () => {
        // unauthorized user is not allowed to post
        if (this.state.modal === false && this.props.auth.isAuthenticated === false) {

            console.log("unauthorized");
        } else {
            // Clear errors
            this.props.clearErrors();
            this.setState({
                modal: !this.state.modal
            });
        }

    }

    onChange = (e) => {


        // case for adding file locally, adding url object to the state.file
        // check file numbers, call connected functions and apply corresponding UI change
        if (e.target.files) {
            if (this.props.post.sourceID === null) {
                this.props.getSourceID();
            }
            this.props.addFiles(e.target.files);
            // console.log(URL.createObjectURL(e.target.files[0]));
            // console.log(e.target.files[0]);

            //reset the event, therefore same file would still trigger the onChange
            e.target.value = '';
        }
        //case for text input
        else {
            this.setState({ [e.target.name]: e.target.value });
        }

    }
    onSubmit = (e) => {
        e.preventDefault();

        const { title, content } = this.state;
        const userID = this.props.auth.user._id;

        // Create user object
        const newPost = {
            title,
            userID,
            content
        };
        //Attempt to register
        this.props.uploadPost(newPost);

    }

    render() {
        const { classes } = this.props;

        return (

            <Container maxWidth="xs">
                <CssBaseline />
                <Fab color="secondary" onClick={this.toggle}>
                    <EditIcon />
                </Fab>

                <Dialog
                    open={this.state.modal}
                    fullWidth={true}
                    TransitionComponent={Transition}
                >

                    <Paper elevation={3} >

                        <div className={classes.paper}>

                            <IconButton onClick={this.toggle} className={classes.closeButton}>
                                <CloseIcon />
                            </IconButton>

                            <IconButton className={classes.avatarButton}>
                                <Avatar className={classes.avatar} alt="Remy Sharp" src="/static/avatars/1.jpg" />
                            </IconButton>
                            <Errors msg={this.state.msg} />
                            <form className={classes.form} noValidate onSubmit={this.onSubmit} onChange={this.onChange} encType="multipart/form-data">

                                <TextField
                                    id="standard-basic"
                                    margin="normal"
                                    fullWidth
                                    label="Post your post"
                                    name="title"
                                />

                                <Grid container >
                                    <Grid item>
                                        <input accept="image/*" className={classes.input} id="icon-button-image" type="file" multiple disabled={this.props.post.imageFull} />
                                        <label htmlFor="icon-button-image">
                                            <IconButton color='secondary' component="span" disabled={this.props.post.imageFull}>
                                                <ImageIcon />
                                            </IconButton>
                                        </label>
                                    </Grid>

                                    <Grid item>
                                        <IconButton color='secondary'>
                                            <GifIcon />
                                        </IconButton>
                                    </Grid>

                                    <Grid item>
                                        <input accept="video/*" className={classes.input} id="icon-button-video" type="file" multiple disabled={this.props.post.videoFull} />
                                        <label htmlFor="icon-button-video">
                                            <IconButton color='secondary' component="span" disabled={this.props.post.videoFull}>
                                                <VideoLabelIcon />
                                            </IconButton>
                                        </label>

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
                                    rows={9}
                                    fullWidth
                                    name="content"
                                    label="Your thoughts"
                                >
                                </TextField>

                                <FileGridList />

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
                </Dialog>

            </Container >


        )
    };
}

PostModal.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object,
    uploadPost: PropTypes.func.isRequired,
    addFiles: PropTypes.func.isRequired,
    validateFile: PropTypes.func.isRequired,
    getSourceID: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

// User ID in auth is essential for inserting post into DB
const mapStateToProps = (state) => ({
    post: state.post,
    auth: state.auth,
    error: state.error
});

PostModal = withStyles(styles)(PostModal);
export default connect(mapStateToProps, { uploadPost, addFiles, validateFile, getSourceID, clearErrors })(PostModal);