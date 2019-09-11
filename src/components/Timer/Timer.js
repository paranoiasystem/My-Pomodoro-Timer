import React from 'react'
import prettyMilliseconds from 'pretty-ms'

import './Timer.css'

export default function Timer({ currentStatus, time, isOn, startTimer, pauseTimer, stopTimer }) {
    return (
        <div className="timer">
            <div className="row mt-5">
                <div className="col text-center">
                    <p>
                        { (currentStatus % 2 === 0) ? 'Focus Time' : (currentStatus !== 7) ? 'Short Break' : 'Long Break' }
                    </p>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col text-center text-sm-center">
                    <h1>{prettyMilliseconds(time)}</h1>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col text-center">
                    { (!isOn) ? <button className="btn" onClick={startTimer}><i className="fas fa-play"></i></button>
                        : <button className="btn" onClick={pauseTimer}><i className="fas fa-pause"></i></button> }
                    <button className="btn" disabled={!isOn} onClick={stopTimer}><i className="fas fa-stop"></i></button>
                </div>
            </div>
        </div>
    )
}
