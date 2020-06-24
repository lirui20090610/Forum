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
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FileGridList from '../common/FileGridList';
import EmoteGridList from '../common/EmoteGridList';
import {
    uploadPost,
    endPost,
    addFiles,
    getSourceID,
} from '../../actions/postActions';
import { clearErrors } from '../../actions/errorActions';


const emoji = [
    '\u{1F600}', '\u{1F601}', '\u{1F606}', '\u{1F605}',
    '\u{1F923}', '\u{1F602}', '\u{1F642}', '\u{1F643}',
    '\u{1F609}', '\u{1F60A}', '\u{1F607}', '\u{1F970}',
    '\u{1F60D}', '\u{1F929}', '\u{1F618}', '\u{1F617}',
    '\u{1F917}', '\u{1F61A}', '\u{1F619}', '\u{1F61B}',
    '\u{1F61C}', '\u{1F92A}', '\u{1F61D}', '\u{1F911}'
];
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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
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
        tempFiles: null,
        emojiModal: false,
    }
    componentDidUpdate(prevProps) {
        const { sourceID, loadingSourceID } = this.props.post;

        if (sourceID !== null && !loadingSourceID && this.state.tempFiles !== null) {
            this.props.addFiles(this.state.tempFiles);
            this.setState({ tempFiles: null })
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
            this.setState({
                modal: !this.state.modal
            });
        }

    }
    emojiToggle = () => {
        this.setState({
            emojiModal: !this.state.emojiModal
        });
    }
    pickEmoji = (e, unicode) => {
        this.setState({
            content: this.state.content + unicode,
            emojiModal: !this.state.emojiModal
        });
    }
    onChange = (e) => {
        // case for adding file locally
        // validate, call connected functions and apply corresponding UI change
        if (e.target.files) {
            //check sourceID, if null, store current files and uploading until got a sourceID
            if (this.props.post.sourceID === null) {
                this.props.getSourceID();
                this.setState({
                    tempFiles: [...e.target.files],
                });
            }
            //else uploding directly
            else {
                this.props.addFiles(e.target.files);
            }
            e.target.value = '';
        }
        //case for text input
        else {
            this.setState({
                [e.target.name]: e.target.value,
            });
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
        this.props.uploadPost(newPost);

    }

    finishPost = (e) => {
        this.setState({
            modal: false,
            title: '',
            content: '',
            tempFiles: null,
        });
        this.props.endPost();
    }

    render() {
        const { classes } = this.props;

        return (

            // <Errors msg={this.state.msg} />

            <Container maxWidth="xs">
                <CssBaseline />
                <Fab color="secondary" onClick={this.toggle}>
                    <EditIcon />
                </Fab>
                <Dialog
                    open={this.state.modal}
                    fullWidth={true}
                    TransitionComponent={Transition}
                    onClose={this.toggle}
                >
                    <div>
                        <Paper elevation={3} >

                            <div className={classes.paper}>

                                <IconButton onClick={this.toggle} className={classes.closeButton}>
                                    <CloseIcon />
                                </IconButton>

                                <IconButton className={classes.avatarButton}>
                                    <Avatar className={classes.avatar} alt="Remy Sharp" src="/static/avatars/1.jpg" />
                                </IconButton>

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
                                            <IconButton color='secondary' onClick={this.emojiToggle}>
                                                <EmojiEmotionsIcon />
                                            </IconButton>
                                            <Dialog
                                                open={this.state.emojiModal}
                                                onClose={this.emojiToggle}
                                            >
                                                <DialogTitle >Pick emotes</DialogTitle>
                                                <DialogContent>
                                                    <GridList cellHeight={40} cols={8} spacing={0}>
                                                        {emoji.map(element => (
                                                            <GridListTile >
                                                                <Button variant="text" onClick={((e) => this.pickEmoji(e, emoji))} color="primary">
                                                                    {element}
                                                                </Button>
                                                                {/* <h3 onClick={((e) => this.pickEmoji(e, emoji))}>{emoji}</h3> */}
                                                            </GridListTile>
                                                        ))}
                                                    </GridList>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button variant="contained" onClick={this.emojiToggle} color="primary">
                                                        Cancel
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
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
                                        value={this.state.content}
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
                        <Backdrop className={classes.backdrop} open={this.props.post.isPosting} >
                            <CircularProgress color="inherit" />
                        </Backdrop>

                        <Backdrop className={classes.backdrop} open={this.props.post.isPosted} >
                            <MuiAlert onClose={this.finishPost} elevation={6} variant="filled" severity="success">
                                Post successfully!
                            </MuiAlert>
                        </Backdrop>
                    </div>

                </Dialog>

            </Container >




        )
    };
}

PostModal.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    uploadPost: PropTypes.func.isRequired,
    endPost: PropTypes.func.isRequired,
    addFiles: PropTypes.func.isRequired,
    getSourceID: PropTypes.func.isRequired,
}

// User ID in auth is essential for inserting post into DB
const mapStateToProps = (state) => ({
    post: state.post,
    auth: state.auth,
});

PostModal = withStyles(styles)(PostModal);
export default connect(mapStateToProps, { uploadPost, endPost, addFiles, getSourceID })(PostModal);