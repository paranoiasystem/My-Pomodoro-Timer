import React from 'react';
import './SetTimer.css';
import prettyMilliseconds from 'pretty-ms';

class SetTimer extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);
    }

    incrementTime = () => {
        this.props.onChangeTime(this.props.time + 60000);
    };

    decrementTime = () => {
        if(this.props.time > 60000)
            this.props.onChangeTime(this.props.time - 60000);
    };

    render() {
        return(
            <div>
                <div className="row">
                    <div className="col title-responsive"><p>{this.props.name}</p></div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col col-lg-2 timer-setter-responsive">
                        <button className="btn" disabled={this.props.isOn} onClick={this.incrementTime}><i className="fas fa-plus"></i></button>
                    </div>
                    <div className="col col-lg-2 timer-setter-responsive">
                        {prettyMilliseconds(this.props.time)}
                    </div>
                    <div className="col col-lg-2 timer-setter-responsive">
                        <button className="btn" disabled={this.props.isOn} onClick={this.decrementTime}><i className="fas fa-minus"></i></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SetTimer;
