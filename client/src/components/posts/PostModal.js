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
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ImageIcon from '@material-ui/icons/Image';
import GifIcon from '@material-ui/icons/Gif';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import BarChartIcon from '@material-ui/icons/BarChart';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Copyright from '../../common/Copyright';
// import Errors from '../../common/Errors';
// import { login } from '../../../actions/authActions';
// import { clearErrors } from '../../../actions/errorActions';




const styles = theme => ({
    paper: {
        maxWidth: "50%",
        marginLeft: "25%",
        marginRight: "25%",
        // backgroundColor: theme.palette.primary.main,
    },
    avatarButton: {
        margin: theme.spacing(1),
    },
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    titleInput: {
        width: "78%",
        marginTop: theme.spacing(2),
        marginLeft: "2%",
    },
    contentInput: {
        width: "90%",
        marginTop: theme.spacing(2),
        marginLeft: "5%",
        marginBottom: "5%",
    },
    contentButton: {
        marginLeft: "11%",
        // margin: theme.spacing(1),
    },
    submitButton: {
        marginTop: "140%",
    },
    // gridList: {
    //     // paddingLeft: 5,
    //     // padding: 0,
    //     // paddingTop: 5,

    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     justifyContent: 'space-around',
    //     overflow: 'hidden',
    //     backgroundColor: theme.palette.background.paper,

    // }

});

class PostModal extends Component {

    toggle = () => {
        // Clear errors
        // this.props.clearErrors();
        // this.setState({
        //     modal: !this.state.modal
        // });
        console.log("here");
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();


    }

    render() {
        const { classes } = this.props;

        return (

            <Paper elevation={3} className={classes.paper}>

                {/* <GridList cols={9} className={classes.gridList}>
                    <GridListTile cols={2} rows={1}> */}
                <IconButton size="large" className={classes.avatarButton}>
                    <Avatar className={classes.avatar} alt="Remy Sharp" src="/static/avatars/1.jpg" />
                </IconButton>
                {/* </GridListTile>

                    <GridListTile cols={7} rows={1}> */}
                <TextField
                    id="standard-basic"
                    className={classes.titleInput}
                    name="title"
                    // variant="outlined"
                    label="Post your thoughts"
                    onFocus={this.toggle}
                />
                {/* </GridListTile>

                </GridList> */}


                {/* <GridList cols={5}>
                    <GridListTile cols={1}> */}
                <IconButton className={classes.contentButton} color='secondary'>
                    <ImageIcon />
                </IconButton>
                {/* </GridListTile>

                    <GridListTile cols={1}> */}
                <IconButton className={classes.contentButton} color='secondary'>
                    <GifIcon />
                </IconButton>
                {/* </GridListTile>

                    <GridListTile cols={1}> */}
                <IconButton className={classes.contentButton} color='secondary'>
                    <VideoLabelIcon />
                </IconButton>
                {/* </GridListTile>

                    <GridListTile cols={1}> */}
                <IconButton className={classes.contentButton} color='secondary'>
                    <EmojiEmotionsIcon />
                </IconButton>
                {/* </GridListTile> */}

                {/* <GridListTile cols={1}> */}
                <IconButton className={classes.contentButton} color='secondary'>
                    <BarChartIcon />
                </IconButton>
                {/* </GridListTile>
                </GridList> */}





                {/* <IconButton className={classes.contentButton} color='secondary'>
                    <VideoLabelIcon />
                </IconButton>

                <IconButton className={classes.contentButton} color='secondary'>
                    <EmojiEmotionsIcon />
                </IconButton>

                <IconButton className={classes.contentButton} color='secondary'>
                    <BarChartIcon />
                </IconButton> */}



                <TextField
                    className={classes.contentInput}
                    multiline
                    rows={8}
                    name="content"
                    variant="outlined"
                    label="Your thoughts"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment >
                                <Button variant="contained" color="primary" className={classes.submitButton}>
                                    Submit
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                >

                </TextField>
            </Paper>
        )
    };
}

export default withStyles(styles)(PostModal);