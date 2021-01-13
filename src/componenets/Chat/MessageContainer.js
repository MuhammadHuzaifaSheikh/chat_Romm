import React from "react";


function MessageContainer({name, message, type, mine, time}) {

    function Message() {


        if (type === 'text') {
            return (
                <p
                    className={`chat_message  ${mine && "chat_receiver"}`}>
                            <span
                                className="chat_name">{name} </span>
                    <span className='message'> {message}</span>
                    <span
                        className="chat_timestamp">{time}</span>
                </p>
            )
        } else if (type === 'image') {
            return (
                <p
                    className={`chat_message  ${mine && "chat_receiver"}`}>
                            <span
                                className="chat_name">{name} </span>
                    <img className='message_image' src={message}
                         alt={'IMAGE'}/>
                    <span
                        className="chat_timestamp">{time}</span>
                    <span className='send_message_status'>
                            </span>
                </p>
            )
        } else if (type === 'audio') {
            return (
                <p
                    className={`chat_message  ${mine && "chat_receiver"}`}>
                            <span
                                className="chat_name">{name} </span>
                    <audio controls>
                        <source src={message}/>
                    </audio>
                    <span
                        className="chat_timestamp">{time}</span>
                    <span className='send_message_status'>
                            </span>
                </p>
            )
        } else if (type === "video") {
            return (
                <p
                    className={`chat_message  ${mine && "chat_receiver"}`}>
                            <span
                                className="chat_name">{name} </span>
                    <video className='message_video' controls>
                        <source src={message} type="video/mp4"/>
                    </video>

                    <span
                        className="chat_timestamp">{time}</span>
                    <span className='send_message_status'>
                            </span>
                </p>
            )
        }


    }

    return (

        <>
            {Message()}
        </>
    )
}

export default MessageContainer
