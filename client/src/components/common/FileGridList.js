import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeFile } from '../../actions/postActions';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        // without the following, height would grow automatically
        // height: 450,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});
class FileGridList extends Component {

    deleteFile = (tile) => {
        this.props.removeFile(tile);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <GridList cellHeight={200} spacing={1} className={classes.gridList}>
                    {this.props.post.files.map((tile) => {
                        let fileComponent, columns, rows;
                        switch (tile.type) {
                            case "image":
                                columns = 1;
                                rows = 1;
                                fileComponent = <img src={tile.source} alt='' />;


                                break;

                            case "video":
                                columns = 2;
                                rows = 2;
                                fileComponent =
                                    <video width="500" controls>
                                        <source src={tile.source} />
                                    </video>
                                break;

                            default:
                                break;

                        }
                        return (
                            <GridListTile key={tile.source} cols={columns} rows={rows}>
                                {fileComponent}
                                <CircularProgress variant="static" value={25} />
                                <GridListTileBar
                                    // title={<CircularProgress variant="static" value={25} />}
                                    title={<LinearProgress variant="determinate" value={25} />}
                                    titlePosition="top"
                                    actionIcon={

                                        <IconButton onClick={this.deleteFile.bind(this, tile)} className={classes.icon} >
                                            <CloseIcon />
                                        </IconButton>
                                    }
                                    actionPosition="right"
                                    className={classes.titleBar}
                                />
                            </GridListTile>
                        );

                    })}
                </GridList>
            </div>
        );

    }
}

FileGridList.propTypes = {
    post: PropTypes.object.isRequired,
    removeFile: PropTypes.func.isRequired
}

// User ID in auth is essential for inserting post into DB
const mapStateToProps = (state) => ({
    post: state.post,
});
FileGridList = withStyles(styles)(FileGridList);
export default connect(mapStateToProps, { removeFile })(FileGridList);