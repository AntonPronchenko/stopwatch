import React, { useState, useRef } from 'react';

import './App.css';

function App() {
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const increment = useRef(null);

    const handleStart = () => {
        handleReset()
        setIsActive(true);
        setIsWaiting(true);
        increment.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000);
    };

    const handleWait = () => {
        clearInterval(increment.current);
        setIsWaiting(false);
    };

    const handleStop = () => {
        clearInterval(increment.current);
        setIsWaiting(false);
        setIsActive(false);
    };

    const handleResume = () => {
        setIsWaiting(true);
        increment.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000);
    };

    const handleReset = () => {
        setTimer(0);
    };

    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2);
        const minutes = `${Math.floor(timer / 60)}`;
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

        return `${getHours} : ${getMinutes} : ${getSeconds}`;
    };

    return (
        <div className="app">
            <div className='block'>
                <h3>Stopwatch</h3>
                <p>{formatTime()}</p>
                <div className='buttons'>
                    {
                        !isActive && !isWaiting ?
                            <button onClick={handleStart}>Start</button>
                            : (
                                isWaiting ? <button onClick={handleStop}>Stop</button> :
                                    <button onClick={handleResume}>Start</button>
                            )
                    }
                    <button onDoubleClick={handleWait} disabled={!isActive} >Wait</button>
                    <button onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
    );
}

export default App;
