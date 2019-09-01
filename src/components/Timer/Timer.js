import React from 'react';
import prettyMilliseconds from 'pretty-ms';

class Timer extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    startTimer = () => {
        this.props.startTimer();
    };

    pauseTimer = () => {
        this.props.pauseTimer();
    };

    stopTimer = () => {
        this.props.stopTimer();
    };

    render() {
        return(
            <div>
                <div className="row pt-2">
                    <div className="col text-center">
                        <p>
                            Current Status:&nbsp;
                            {
                                (this.props.currentStatus % 2 === 0) ? 'Focus Time'
                                    : (this.props.currentStatus !== 7) ? 'Short Break' : 'Long Break'
                            }
                        </p>
                    </div>
                </div>
                <div className="row pt-2">
                    <div className="col text-center text-sm-center">
                        <h1>{prettyMilliseconds(this.props.time)}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        {
                            (!this.props.isOn) ? <button className="btn" onClick={this.startTimer}><i className="fas fa-play"></i></button>
                                : <button className="btn" onClick={this.pauseTimer}><i className="fas fa-pause"></i></button>
                        }
                        <button className="btn" disabled={!this.props.isOn} onClick={this.stopTimer}><i className="fas fa-stop"></i></button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Timer;
