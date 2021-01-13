import React, { useState } from 'react';

import './join.css';

export default function Join(props) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    function handleName(e) {
        setName(e.target.value)

    }
    function handleRoom(e) {
        setRoom(e.target.value)

    }
    function passName() {

        if (name!==''&&room!=='') {
         props.onTakeName(name,room)
            setName('')
            setRoom('')
        }
        else {
            alert('Please type your name and room for joined the chat')
        }

    }



    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">
                    H
                    <span className='text'>Hand Book</span>
                </h1>

                <div>
                    <input  value={name} placeholder="Name" className="joinInput" type="text" onChange={handleName}  />
                </div>
                <div>
                    <input value={room} placeholder="Password" className="joinInput" type="password" onChange={handleRoom}  />
                </div>

                    <button onClick={passName} className={'button mt-20'}>Sign In</button>

            </div>
        </div>
    );
}
