import React from 'react'
import prettyMilliseconds from 'pretty-ms'
import './SetTimer.css'

export default function SetTimer(props) {
    const name = props.name
    const isOn = props.isOn
    const time = props.time
    const onChangeTime = props.onChangeTime

    const incrementTime = () => {
        onChangeTime(time + 60000)
    }

    const decrementTime = () => {
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
