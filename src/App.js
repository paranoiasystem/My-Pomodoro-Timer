import React from 'react';
import Emoji from './components/Emoji/Emoji';
import SetTimer from './components/SetTimer/SetTimer';
import Timer from './components/Timer/Timer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pomodoroTime: (25*60000),
            shortBreakTime: (5*60000),
            longBreakTime: (25*60000),
            currentTimer: (25*60000),
            currentStatus: 0,
            isOn: false,
        };
        this.timer = null;
    }

    nextStatus = () => {
        clearInterval(this.timer);
        let nextStatus = this.state.currentStatus + 1;
        if(nextStatus > 7) {
            this.setState({
                currentStatus: 0,
                isOn: false
            });
        } else {
            this.setState({
                currentStatus: nextStatus,
                isOn: false
            });
        }
        // 0p - 1s - 2p - 3s - 4p - 5s - 6p - 7l
        if(this.state.currentStatus % 2 !== 0) {
            if(this.state.currentStatus === 7) {
                this.setState({
                    currentTimer: this.state.longBreakTime
                });
            } else {
                this.setState({
                    currentTimer: this.state.shortBreakTime
                });
            }
        } else {
            this.setState({
                currentTimer: this.state.pomodoroTime
            });
        }
    };

    tick = () => {
        this.timer = setInterval(() => {
            let time = this.state.currentTimer - 1000;
            this.setState({
                currentTimer: time
            });
            if(time === 0) {
                this.nextStatus();
            }
        }, 1000);
    };

    resetCurrentTimer = () => {
        this.setState({
            currentTimer: this.state.pomodoroTime
        });
    };

    handleStartTimer = () => {
        this.tick();
        this.setState({
            isOn: true
        });
    };

    handlePauseTimer = () => {
        clearInterval(this.timer);
        this.setState({
            isOn: false
        });
    };

    handleStopTimer = () => {
        clearInterval(this.timer);
        this.resetCurrentTimer();
        this.setState({
            isOn: false
        });
    };

    handleChangePomodoroTime = (time) => {
        this.setState({
            pomodoroTime: time,
            currentTimer: time
        });
    };

    handleChangeShortBreak = (time) => {
        this.setState({
            shortBreakTime: time
        });
    };

    handleChangeLongBreak = (time) => {
        this.setState({
            longBreakTime: time
        });
    };

    render() {
        return (
            <div className="container">
                <div className="row pt-2">
                    <div className="col text-center">
                        <h1><Emoji emoji="🍅"/> My Pomodoro Timer</h1>
                    </div>
                </div>
                <Timer time={this.state.currentTimer} isOn={this.state.isOn} currentStatus={this.state.currentStatus} startTimer={this.handleStartTimer} pauseTimer={this.handlePauseTimer} stopTimer={this.handleStopTimer}/>
                <div className="row pt-3">
                    <div className="col text-center">
                        <SetTimer name="Pomodoro Time" time={this.state.pomodoroTime} isOn={this.state.isOn} onChangeTime={this.handleChangePomodoroTime}/>
                    </div>
                    <div className="col text-center">
                        <SetTimer name="Short Break" time={this.state.shortBreakTime} isOn={this.state.isOn} onChangeTime={this.handleChangeShortBreak}/>
                    </div>
                    <div className="col text-center">
                        <SetTimer name="Long Break" time={this.state.longBreakTime} isOn={this.state.isOn} onChangeTime={this.handleChangeLongBreak}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
