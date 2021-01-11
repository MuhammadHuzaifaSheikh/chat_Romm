import React from 'react';
import PropTypes from 'prop-types';
import {Drawer,Menu, MenuItem, Fade,Hidden,Divider,CssBaseline,AppBar,IconButton,List,Toolbar,Typography} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import MenuIcon from '@material-ui/icons/Menu';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import MicIcon from '@material-ui/icons/Mic';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import AttachmentIcon from '@material-ui/icons/Attachment';
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

function ResponsiveDrawer({window, connectedNames,Messages,onClick,onChange,value,sendMessagesEnter,room,onSelectFile}) {

    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openSelect = Boolean(anchorEl);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    console.log(onChange);


    const drawer = (
        <div>
            <div className={classes.toolbar}>
                <h2 style={{fontSize:'15px',textAlign:'center'}}>{connectedNames.length} people are connected</h2>
                <h1 style={{textAlign:'center'}}>Room : {room}</h1>
            </div>
            <Divider/>
            <List>
                {connectedNames.map((item, index) => {
                    return (
                        <li key={index} className="active">
                                <div className="user_info">
                                    <span style={{color:'black'}}>{item.name} <FiberManualRecordIcon color='green' className='online_icon'/></span>
                                    <p  style={{color:'black'}}>{item.name} is connected</p>
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
                   <Typography variant="h6" style={{flexGrow:1}}>
                       Chat
                   </Typography>

                    <input style={{display: 'none'}} id="outlined-button-file" type="file" onChange={onSelectFile}/>

                    <IconButton
                        aria-controls="fade-menu" aria-haspopup="true"
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        edge="start"
                    >
                        <AttachmentIcon fontSize='large' style={{color:'white'}}/>
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={openSelect}
                        onClose={() => setAnchorEl(null)}
                        TransitionComponent={Fade}

                        PaperProps={{
                            style: {
                                width: '20ch',
                            },
                        }}
                    >
                        <label htmlFor="outlined-button-file">
                            <MenuItem style={{display: 'flex', justifyContent: 'flex-start'}}
                                      onClick={() => setAnchorEl(null)}> <PhotoCameraIcon style={{marginRight: '10px', color: 'grey'}}/> Photos</MenuItem>
                        </label>

                    </Menu>




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
                <div className='container'>
                    <div className="chat_body">
                        {Messages.map((item, index) => {
                            return <div key={index}>{item}</div>
                        })}

                    </div>
                    <div  className="chat_footer">

                        <input onKeyPress={sendMessagesEnter}
                               value={value}
                               onChange={onChange}
                               placeholder="Type your message..."/>
                        <IconButton  onClick={onClick} className='send_btn'>
                            <SendIcon fontSize='large'/>
                        </IconButton>
                        <IconButton  onClick={onClick} className='send_btn'>
                            <MicIcon fontSize='large'/>
                        </IconButton>

                    </div>
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
