import React, {Component} from "react";
import SendIcon from '@material-ui/icons/Send';
import io from 'socket.io-client';
import audio from '../sound/whatsapp_incoming.mp3'
import './Chatt.css'
import Drawer from "./Drawer";
const socket = io('http://localhost:4000');

class Chat extends Component {


    myAudio = React.createRef()
    state = {
        message: '',
        Messages: [],
        connectedNames: [],
        room:'',
        writing:'',
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
            this.audioPlay()
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

    }
    sendMessages = () => {
        this.setState({writing:''})

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


        return (
            <div className="">
                <Drawer Messages={this.state.Messages} connectedNames={this.state.connectedNames} />
                <audio ref={this.myAudio} id='audio' src={audio}> </audio>
            </div>
        )
    }
}

export default Chat
