import React from 'react'
import prettyMilliseconds from 'pretty-ms'

export default function Timer(props) {
    const currentStatus = props.currentStatus
    const time = props.time
    const isOn = props.isOn
    const startTimer = props.startTimer
    const pauseTimer = props.pauseTimer
    const stopTimer = props.stopTimer

    return (
        <div>
            <div className="row pt-2">
                <div className="col text-center">
                    <p>
                        Current Status:&nbsp; { (currentStatus % 2 === 0) ? 'Focus Time' : (currentStatus !== 7) ? 'Short Break' : 'Long Break' }
                    </p>
                </div>
            </div>
            <div className="row pt-2">
                <div className="col text-center text-sm-center">
                    <h1>{prettyMilliseconds(time)}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col text-center">
                    { (!isOn) ? <button className="btn" onClick={startTimer}><i className="fas fa-play"></i></button>
                        : <button className="btn" onClick={pauseTimer}><i className="fas fa-pause"></i></button> }
                    <button className="btn" disabled={!isOn} onClick={stopTimer}><i className="fas fa-stop"></i></button>
                </div>
            </div>
        </div>
    )
}
