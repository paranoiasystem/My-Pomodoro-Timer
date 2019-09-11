import React from 'react'
import prettyMilliseconds from 'pretty-ms'
import './SetTimer.css'

export default function SetTimer({ name, isOn, time, onChangeTime}) {
    const incrementTime = (e) => {
        e.preventDefault()
        onChangeTime(time + 60000)
    }

    const decrementTime = (e) => {
        e.preventDefault()
        if(time > 60000)
            onChangeTime(time - 60000);
    }

    return (
        <div>
            <div className="row">
                <div className="col title-responsive">
                    <p>{name}</p>
                </div>
            </div>
            <div className="row justify-content-md-center">
                <div className="col col-lg-2 timer-setter-responsive">
                    <button className="btn" disabled={isOn} onClick={incrementTime}><i className="fas fa-plus"></i></button>
                </div>
                <div className="col col-lg-2 timer-setter-responsive">
                    {prettyMilliseconds(time)}
                </div>
                <div className="col col-lg-2 timer-setter-responsive">
                    <button className="btn" disabled={isOn} onClick={decrementTime}><i className="fas fa-minus"></i></button>
                </div>
            </div>
        </div>
    )
}
