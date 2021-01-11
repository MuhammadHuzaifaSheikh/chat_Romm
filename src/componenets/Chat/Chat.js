import React, {Component} from "react";
import io from 'socket.io-client';
import audio from '../sound/whatsapp_incoming.mp3'
import './Chatt.css'
import {firebase} from "../../config/Config";
import {Recorder} from 'react-voice-recorder'
import {Dialog,DialogContent} from '@material-ui/core'
import 'react-voice-recorder/dist/index.css'
import Drawer from "./Drawer";
import Loader from '../Loader'

const socket = io('http://localhost:4000');


var storageRef = firebase.storage().ref();

class Chat extends Component {


    myAudio = React.createRef()
    state = {
        message: '',
        Messages: [],
        connectedNames: [],
        room:'',
        loading:false,
        src:'',
        writing:'',
        progress:0
    }

     onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            console.log(e.target.files);
            if (!e.target.files[0].type.match("image.*")) {
                alert("Please select image only.");
            } else {
                this.setState({loading:true})
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                        this.setState({src:reader.result})
                    }
                );
                reader.readAsDataURL(e.target.files[0], e.target.files[0].name);


               this.fileUpload(e.target.files[0],`image/${e.target.files[0].name}`)

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
            this.setState({progress:Math.floor(progress)})
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


                this.setState({src:downloadURL,loading:false})
                if (file?.type?.match("image.*")) {
                    // sendMessage('image', downloadURL);
                } else {
                    // sendMessage('audio', downloadURL);
                }
            });
        });
    }


    componentDidMount() {
        socket.emit('join_room', this.props.room)
        socket.emit('new_user_joined', {name: this.props.name, room: this.props.room})
        socket.on('welcome', receiveMessage => {

            let local = this.state.Messages

            let div = <div style={{float: 'left', clear: 'both'}} className="d-flex justify-content-end mb-4">
                <div className="msg_cotainer">
                    <span className="name">{receiveMessage.name}</span>
                    {receiveMessage.message}
                    <span className="msg_time_send">{receiveMessage.time}</span>
                </div>

            </div>
            local.push(div)
            this.audioPlay()
            this.setState({Messages: local})
        });

    }
    componentWillMount() {
        socket.on('roomData', users => {
                this.setState({connectedNames: users.users,room:users.room})
        })
        socket.on('some_one_writing', message => {
            this.setState({writing: message.message})
        })
        socket.on('user_joined', receiveMessage => {

            let local = this.state.Messages

            let div = <div style={{float: 'left', clear: 'both'}} className="d-flex justify-content-end mb-4">
                <div className="msg_cotainer">
                    <span className="name">{receiveMessage.name}</span>
                    {receiveMessage.message}
                    <span className="msg_time_send">{receiveMessage.time}</span>
                </div>

            </div>
            local.push(div)
            if (receiveMessage){
                this.audioPlay()

            }
            this.setState({Messages: local})
        });
        socket.on('roomDataDisconnect', users => {
            this.setState({connectedNames: users.users,room:users.room})
        })
        socket.on('leave', receiveMessage => {

            let local = this.state.Messages
            let div = <div style={{float: 'left', clear: 'both'}} className="d-flex justify-content-end mb-4">
                <div className="msg_cotainer">
                    <span className="name">{receiveMessage.name}</span>
                    {receiveMessage.message}
                    <span className="msg_time_send">{receiveMessage.time}</span>
                </div>

            </div>
            local.push(div)


            this.audioPlay()
            this.setState({Messages: local})
        });
        socket.on('receiveMessage', receiveMessage => {

            let local = this.state.Messages
            let div = <div style={{float: 'left', clear: 'both'}} className="d-flex justify-content-end mb-4">
                <div className="msg_cotainer">
                    <span className="name">{receiveMessage.name}</span>
                    {receiveMessage.message}
                    <span className="msg_time_send">{receiveMessage.time}</span>
                </div>

            </div>
            local.push(div)
            this.audioPlay()
            this.setState({Messages: local})
        });


    }


    onValue = (e) => {
        this.setState({message: e.target.value})
        console.log(e);
    }
    sendMessages = () => {
        this.setState({writing:'',})

        socket.emit('sendMessage', {
            message: this.state.message,
            time: new Date().toLocaleTimeString(),
            name: this.props.name,
            room: this.props.room
        })
        let local = this.state.Messages
        let div = <div style={{float: 'right', clear: 'both'}} className="d-flex justify-content-end mb-4">
            <div className="msg_cotainer_send">
                <span className="name">{this.props.name}</span>
                {this.state.message}
                <span className="msg_time_send">{new Date().toLocaleTimeString()}</span>
            </div>

        </div>
        local.push(div)
        this.setState({Messages: local})
        this.setState({message: ''})
    }
    sendMessagesEnter = (e) => {
        if (e.key === 'Enter') {
            this.sendMessages()
        }
        socket.emit('writing','user');
        this.setState({writing:''})

    }
    audioPlay = () => {
            this.myAudio.current.play();
    }

    render() {

         let {loading,src,progress}= this.state

        return (
            <div className="main">
                    <Drawer onSelectFile={this.onSelectFile} onClick={this.sendMessages} onChange={this.onValue} value={this.state.message} sendMessagesEnter={this.sendMessagesEnter} Messages={this.state.Messages} connectedNames={this.state.connectedNames} room={this.state.room} />

                <audio ref={this.myAudio} id='audio' src={audio}> </audio>

                <Dialog
                    open={loading}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogContent style={{textAlign: "center", paddingTop: "30px"}}>
                        {src?
                            <Loader  value={progress}/>
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
