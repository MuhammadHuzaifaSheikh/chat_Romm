import React, {Component} from "react";
import io from 'socket.io-client';
import audio from '../sound/whatsapp_incoming.mp3'
import './Chatt.css'
import {firebase} from "../../config/Config";
import {Recorder} from 'react-voice-recorder'
import {Dialog, DialogContent} from '@material-ui/core'
import 'react-voice-recorder/dist/index.css'
import Drawer from "./Drawer";
import Loader from '../Loader'
import MessageContainer from "./MessageContainer";
const socket = io('https://chatapprealtimeio.herokuapp.com/');


var storageRef = firebase.storage().ref();

class Chat extends Component {


    myAudio = React.createRef()
    state = {
        message: '',
        Messages: [],
        connectedNames: [],
        room: '',
        loading: false,
        src: '',
        writing: '',
        progress: 0,
        open: false,
        audioDetail: {
            url: null,
            blob: null,
            chunks: null,
            duration: {h: 0, m: 0, s: 0}
        }
    }

    onSelectFile = (e, fileType) => {
        if (e.target.files && e.target.files.length > 0) {
            console.log(e.target.files);
            if (!e.target.files[0].type.match(`${fileType}.*`)) {
                alert(`Please select ${fileType} only.`);
            } else {
                this.setState({loading: true})
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                        this.setState({src: reader.result})
                    }
                );
                reader.readAsDataURL(e.target.files[0], e.target.files[0].name);


                this.fileUpload(e.target.files[0], `${fileType}/${e.target.files[0].name}`)

                console.log(e.target.files[0]);
            }


        }
    };

    fileUpload = (file, fileName) => {
        console.log(file);


        var uploadTask = storageRef.child('chat/' + fileName).put(file);
        uploadTask.on('state_changed', (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            this.setState({progress: Math.floor(progress)})
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    alert('Upload is paused')
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, (error) => {
            // Handle unsuccessful uploads
        }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);


                this.setState({src: downloadURL, loading: false})
                if (file?.type?.match("image.*")) {
                    this.sendMessages('image', downloadURL);
                } else if (file?.type?.match("video.*")) {
                    this.sendMessages('video', downloadURL);
                } else {
                    this.sendMessages('audio', downloadURL);
                }
            });
        });
    }


    handleClickOpen = () => {
        this.setState({open: true})
    };
    handleCloseRecorder = () => {
        this.setState({open: false})
        this.handleRest()
    };
    handleAudioStop = (data) => {
        console.log(data.blob.type)
        this.setState({audioDetail: data})
    };
    handleAudioUpload = (file) => {
        console.log(file);

        this.setState({loading: true, src: file})


        this.fileUpload(file, `/audio/audio${Math.random()}`)
        const reset = {
            url: null,
            blob: null,
            chunks: null,
            duration: {
                h: 0,
                m: 0,
                s: 0
            }
        };

        this.setState({audioDetail: reset})
    };
    handleRest = () => {
        const reset = {url: null, blob: null, chunks: null, duration: {h: 0, m: 0, s: 0}};
        this.setState({audioDetail: reset})
    };

    componentDidMount() {
        socket.emit('join_room', this.props.room)
        socket.emit('new_user_joined', {name: this.props.name, room: this.props.room})

        this.state.connectedNames.forEach((item)=>{
            if (item.name===this.props.name){
                window.location.reload();
                console.log('match hogia');
            }
            else {
                console.log('match nahi hoga');
            }

        })
        socket.on('sameNameError',errorMessage=>{
            alert(errorMessage);
            window.location.reload();

        })
        socket.on('welcome', receiveMessage => {
            console.log(this.state.connectedNames);

            let local = this.state.Messages

            let div =<MessageContainer name={receiveMessage.name} message={receiveMessage.message}
                                       time={receiveMessage.time} type={receiveMessage.type}/>

            local.push(div)
            this.audioPlay()
            this.setState({Messages: local})
        });

    }

    componentWillMount() {

        socket.on('roomData', users => {
            this.setState({connectedNames: users.users, room: users.room})
        })
        socket.on('some_one_writing', message => {
            this.setState({writing: message.message})
        })
        socket.on('user_joined', receiveMessage => {

            let local = this.state.Messages

            let div = <MessageContainer name={receiveMessage.name} message={receiveMessage.message}
                                        time={receiveMessage.time} type={receiveMessage.type}/>
            local.push(div)
            if (receiveMessage) {
                this.audioPlay()

            }
            this.setState({Messages: local})
        });
        socket.on('roomDataDisconnect', users => {
            this.setState({connectedNames: users.users, room: users.room})
        })
        socket.on('leave', receiveMessage => {

            let local = this.state.Messages
            let div = <MessageContainer name={receiveMessage.name} message={receiveMessage.message}
                                        time={receiveMessage.time} type={receiveMessage.type}/>
            local.push(div)


            this.audioPlay()
            this.setState({Messages: local})
        });
        socket.on('receiveMessage', receiveMessage => {

            let local = this.state.Messages
            let div = <MessageContainer name={receiveMessage.name} message={receiveMessage.message}
                                        time={receiveMessage.time} type={receiveMessage.type}/>
            local.push(div)
            this.audioPlay()
            this.setState({Messages: local})
        });


    }


    onValue = (e) => {
        this.setState({message: e.target.value})
        console.log(e);
    }
    sendMessages = (type, message) => {
        this.setState({writing: '',})

        if (message){
            socket.emit('sendMessage', {
                message: message,
                time: new Date().toLocaleTimeString(),
                name: this.props.name,
                room: this.props.room,
                type: type,
            })
            let local = this.state.Messages
            let div = <MessageContainer name={this.props.name} message={message} time={new Date().toLocaleTimeString()}  type={type} mine/>
            local.push(div)
            this.setState({Messages: local})
            this.setState({message: ''})
        }
        else {
            alert(`Please select a ${type}`)

        }


    }
    sendMessagesEnter = (e) => {
        if (e.key === 'Enter') {
            this.sendMessages('text', this.state.message)
        }
        socket.emit('writing', 'user');
        this.setState({writing: ''})

    }
    audioPlay = () => {
        this.myAudio.current.play();
    }

    render() {

        let {loading, src, progress} = this.state

        return (
            <div className="main">
                <Drawer handleClickOpen={this.handleClickOpen} handleRest={this.handleRest}
                        handleAudioUpload={this.handleAudioUpload} handleAudioStop={this.handleAudioStop}
                        audioDetails={this.state.audioDetail} open={this.state.open}
                        handleClose={this.handleCloseRecorder} onSelectFile={this.onSelectFile}
                        sendMessages={this.sendMessages} onChange={this.onValue} value={this.state.message}
                        sendMessagesEnter={this.sendMessagesEnter} Messages={this.state.Messages}
                        connectedNames={this.state.connectedNames} room={this.state.room}/>

                <audio ref={this.myAudio} id='audio' src={audio}> </audio>

                <Dialog
                    open={loading}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogContent style={{textAlign: "center", paddingTop: "30px"}}>
                        {src ?
                            <Loader value={progress}/>
                            :
                            <img style={{width: '60px', height: '60px'}} src="https://i.gifer.com/ZZ5H.gif" alt=""/>

                        }

                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default Chat
