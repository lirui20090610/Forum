import React, { Component } from 'react';
import { Link as RouterLink, BrowserRouter as Router, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ModeComment from '@material-ui/icons/ModeComment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    root: {
        maxWidth: 345,
    },
    header: {
        paddingTop: 5,
        paddingBottom: 0
    },
    avatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },

    bottomButton: {
        // margin: theme.spacing(1.5),
        marginLeft: '10%',
    },

    cardActions: {

        paddingTop: '2%',
        paddingBottom: '2%',
    },

    cardContent: {
        paddingTop: 0,
        paddingBottom: '3%',
    },

    bottomAvatars: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        display: "inline-block",
        border: "2px solid white",
        "&:not(:first-of-type)": {
            marginLeft: -theme.spacing.unit * 1.5
        }
    }

});

class DashboardPosts extends Component {
    state = {
        expanded: false
    }

    handleExpandClick = () => {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    render() {
        const { classes } = this.props;
        const faces = [
            "/static/avatars/1.jpg",
            "/static/avatars/1.jpg",
            "/static/avatars/1.jpg",
            "/static/avatars/1.jpg"
        ];
        return (
            <Router>
                <Card className={classes.root} >
                    <CardHeader
                        className={classes.header}
                        avatar={
                            <IconButton  >
                                <Avatar className={classes.avatar} alt="Remy Sharp" src="/static/avatars/1.jpg" />
                            </IconButton>
                        }

                        action={
                            <IconButton >
                                <CloseIcon />
                            </IconButton>
                        }

                        title={
                            <Link component={RouterLink} to='#' color='inherit'>
                                <Typography component="div" variant='h6' >
                                    <Box fontWeight="fontWeightBold" >
                                        Sally Zhu
                                    </Box>
                                </Typography>
                            </Link>
                        }
                        subheader="September 14, 2016"

                    />

                    <CardContent className={classes.cardContent}>
                        <Typography variant="h6" color="textSecondary" component="p">
                            {/* <Typography paragraph> */}
                            Snow storm coming in Sommaroy island, Arctic Norway.
                        </Typography>
                    </CardContent>
                    <CardMedia
                        className={classes.media}
                        image="/static/images/3.jpg"
                        title="Paella dish"
                        height="50"
                    />

                    <CardActions className={classes.cardActions} disableSpacing>
                        {/* <IconButton className={classes.bottomButton} size="small">
                            <ModeComment />100
                        </IconButton> */}

                        {faces.map(face => (
                            <Avatar className={classes.bottomAvatars} key={face} src={face} />
                        ))}
                        <Typography variant="button" color="textSecondary" component="p">+420</Typography>

                        <IconButton className={classes.bottomButton} size="small">
                            <FavoriteIcon />50
                        </IconButton>

                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="show more"
                            size="small"
                        >
                            <ModeComment />100
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Method:</Typography>
                            <Typography paragraph>
                                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                minutes.
          </Typography>
                            <Typography paragraph>
                                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                                and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                                pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
                            <Typography paragraph>
                                Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                                without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                                medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                                again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                minutes more. (Discard any mussels that don’t open.)
          </Typography>
                            <Typography>
                                Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Router >
        );
    }


}

export default withStyles(styles)(DashboardPosts);
