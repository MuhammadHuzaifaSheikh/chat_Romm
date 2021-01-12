import React from "react";
import './test.css'
import './componenets/Chat/Chatt.css'
function Test() {
    return(
        <div className="my-app">
            <p
                className={`chat_message`}>
                            <span
                                className="chat_name">huzaifa </span>
                <video className='message_video'  controls>
                    <source src={'https://firebasestorage.googleapis.com/v0/b/handbook-24507.appspot.com/o/chat%2Fvideo%2F12.01.2021_00.39.28_REC.mp4?alt=media&token=6f18d436-3f09-4b80-a0a8-55d878ce7f4f'} type="video/mp4"/>
                </video>

                <span
                    className="chat_timestamp">7:00</span>
                <span className='send_message_status'>

                            </span>
            </p>

        </div>
    )
}


export default Test
