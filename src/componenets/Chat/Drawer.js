import React,{useRef,useEffect} from 'react';
import PropTypes from 'prop-types';
import {
    Drawer,
    Menu,
    MenuItem,
    Fade,
    Hidden,
    Divider,
    CssBaseline,
    AppBar,
    IconButton,
    List,
    Toolbar,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@material-ui/core';
import SimpleReactLightbox, {SRLWrapper} from 'simple-react-lightbox'
import ScrollToBottom from 'react-scroll-to-bottom';

import SendIcon from '@material-ui/icons/Send';
import MenuIcon from '@material-ui/icons/Menu';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import MicIcon from '@material-ui/icons/Mic';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import AttachmentIcon from '@material-ui/icons/Attachment';
import VideocamIcon from '@material-ui/icons/Videocam';
import {Recorder} from 'react-voice-recorder'
import CloseIcon from '@material-ui/icons/Close';

const drawerWidth = 240;


const options = {
    settings: {
        autoplaySpeed: 1500,
        transitionSpeed: 900,
    },
    buttons: {
        backgroundColor: 'rgba(30,30,36,0.8)',
        iconColor: 'rgba(255, 255, 255, 0.8)',
        iconPadding: '5px',
        showAutoplayButton: true,
        showCloseButton: true,
        showDownloadButton: true,
        showFullscreenButton: true,
        showNextButton: true,
        showPrevButton: true,
        size: '40px'
    }

};
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
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#f5f5f5',
        width: '100%',

    },
}));

function ResponsiveDrawer({
                              window,
                              connectedNames,
                              Messages,
                              onClick,
                              onChange,
                              value,
                              sendMessagesEnter,
                              room,
                              onSelectFile,
                              handleClickOpen,
                              handleClose,
                              open,
                              audioDetails,
                              handleAudioStop,
                              handleAudioUpload,
                              handleRest,
                              sendMessages,

                          }) {

    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openSelect = Boolean(anchorEl);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };






    const drawer = (
        <div>
            <div className={classes.toolbar}>
                <h2 style={{fontSize: '15px', textAlign: 'center'}}>{connectedNames.length} people are connected</h2>
                <h1 style={{textAlign: 'center'}}>Room : {room}</h1>
            </div>
            <Divider/>
            <List>
                {connectedNames.map((item, index) => {
                    return (
                        <li key={index} className="active">
                            <div className="user_info">
                                <span style={{color: 'black'}}>{item.name} <FiberManualRecordIcon
                                    className='online_icon'/></span>
                                <p style={{color: 'black'}}>{item.name} is connected</p>
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
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        Hand Book
                    </Typography>


                    <IconButton
                        aria-controls="fade-menu" aria-haspopup="true"
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        edge="start"
                    >
                        <AttachmentIcon fontSize='large' style={{color: 'white'}}/>
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
                        <label htmlFor="outlined-button-image">
                            <MenuItem style={{display: 'flex', justifyContent: 'flex-start'}}
                                      onClick={() => setAnchorEl(null)}> <PhotoCameraIcon
                                style={{marginRight: '10px', color: 'grey'}}/> Photos
                            </MenuItem>
                            <input style={{display: 'none'}} id="outlined-button-image" type="file"
                                   onChange={(e) => onSelectFile(e, 'image')}/>

                        </label>
                        <label htmlFor="outlined-button-video">
                            <MenuItem style={{display: 'flex', justifyContent: 'flex-start'}}
                                      onClick={() => setAnchorEl(null)}> <VideocamIcon
                                style={{marginRight: '10px', color: 'grey'}}/> Video
                            </MenuItem>
                            <input style={{display: 'none'}} id="outlined-button-video" type="file"
                                   onChange={(e) => onSelectFile(e, 'video')}/>
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
            <div className={classes.content}>
                    <ScrollToBottom className={'chat_body'}>

                    <SimpleReactLightbox>
                        <SRLWrapper options={options}>
                            {Messages.map((item, index) => {
                                return <div   key={index}>{item}</div>
                            })}
                        </SRLWrapper>
                    </SimpleReactLightbox>
                    </ScrollToBottom>


                <div className="chat_footer">

                    <input onKeyPress={sendMessagesEnter}
                           value={value}
                           onChange={onChange}
                           placeholder="Type your message..."/>
                    <IconButton onClick={() => sendMessages('text', value)} className='send_btn'>
                        <SendIcon fontSize='large'/>
                    </IconButton>
                    <IconButton onClick={handleClickOpen} className='send_btn'>
                        <MicIcon fontSize='large'/>
                    </IconButton>

                </div>
            </div>


            <Dialog fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <div className='recorderHeader'>
                    <DialogTitle id="customized-dialog-title">
                        Send Voice
                    </DialogTitle>
                    <IconButton onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </div>

                <DialogContent style={{background: ' #212121'}} dividers>
                    <Recorder
                        record={true}
                        audioURL={audioDetails?.url}
                        showUIAudio
                        handleAudioStop={data => handleAudioStop(data)}
                        handleAudioUpload={data => audioDetails?.url ? handleAudioUpload(data) : ''}
                        handleRest={handleRest}
                    />

                </DialogContent>

            </Dialog>

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
