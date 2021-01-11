import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import Typography from '@material-ui/core/Typography';
import {makeStyles, useTheme} from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: 0,
    },
}));

function ResponsiveDrawer({window, connectedNames,Messages}) {

    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <Divider/>
            <List>
                {connectedNames.map((item, index) => {
                    return (
                        <li key={index} className="active">
                            <div className="d-flex bd-highlight">
                                <div className="user_info">
                                    <span>{item.name} <FiberManualRecordIcon className='online_icon'/></span>
                                    <p>{item.name} is connected</p>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </List>

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <h2>1 people are connected in Room : d</h2>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <div className="chat_header">

                </div>
                <div className="chat_container">
                    {Messages.map((item, index) => {
                        return <div key={index}>{item}</div>
                    })}

                </div>
                <div  className="chat_footer">
                    <input type="text" id="myInput" placeholder="Send..."/>
                    <Button className='send_btn'>
                        <SendIcon fontSize='large'/>
                    </Button>

                </div>

            </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;
