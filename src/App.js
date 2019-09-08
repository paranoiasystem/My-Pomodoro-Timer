import React, { Component } from 'react'
import Sound from 'react-sound'
import bell from './assets/bell.mp3'
import Emoji from './components/Emoji/Emoji'
import SetTimer from './components/SetTimer/SetTimer'
import Timer from './components/Timer/Timer'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pomodoroTime: (25*60000),
            shortBreakTime: (5*60000),
            longBreakTime: (25*60000),
            currentTimer: (25*60000),
            currentStatus: 0,
            isOn: false,
            audioOn: true,
            play: Sound.status.STOPPED
        }
        this.timer = null
    }

    componentDidMount() {
        this.recoverState()
    }

    recoverState = async () => {
        for (const key in this.state) {
            if (localStorage.hasOwnProperty(key)) {
                this.setState({ [key]: JSON.parse(localStorage.getItem(key))})
            }
        }
    }

    updateState = (key, value) => {
        this.setState({ [key]: value })
        localStorage.setItem(key, JSON.stringify(value))
    }

    nextStatus = () => {
        clearInterval(this.timer)
        let nextStatus = this.state.currentStatus + 1
        if(nextStatus > 7) {
            this.updateState('currentStatus', 0)
            this.updateState('isOn', false)
        } else {
            this.updateState('currentStatus', nextStatus)
            this.updateState('isOn', false)
        }
        this.playSound()
        this.setTimerByStatus()
    }

    playSound = () => {
        this.setState({ play: Sound.status.PLAYING })
    }

    stopSound = () => {
        this.setState({ play: Sound.status.STOPPED })
    }

    handleSongFinishedPlaying = () => {
        this.stopSound()
    }

    setTimerByStatus = () => {
        // 0p - 1s - 2p - 3s - 4p - 5s - 6p - 7l
        if(this.state.currentStatus % 2 !== 0) {
            if(this.state.currentStatus === 7)
                this.updateState('currentTimer', this.state.longBreakTime)
            else
                this.updateState('currentTimer', this.state.shortBreakTime)

        } else {
            this.updateState('currentTimer', this.state.pomodoroTime)

        }
    }

    tick = () => {
        this.timer = setInterval(() => {
            let time = this.state.currentTimer - 1000
            this.setState({ currentTimer: time })
            if(time === 0) {
                this.nextStatus()
            }
        }, 1000)
    }

    resetCurrentTimer = () => {
        this.updateState('currentTimer', this.state.pomodoroTime)
    }

    handleStartTimer = () => {
        this.tick()
        this.updateState('isOn', true)
    }

    handlePauseTimer = () => {
        clearInterval(this.timer)
        this.updateState('isOn', false)
    }

    handleStopTimer = () => {
        clearInterval(this.timer)
        this.resetCurrentTimer()
        this.updateState('isOn', false)
    }

    handleChangePomodoroTime = (time) => {
        this.updateState('pomodoroTime', time)
        this.updateState('currentTimer', time)
    }

    handleChangeShortBreak = (time) => {
        this.updateState('shortBreakTime', time)
    }

    handleChangeLongBreak = (time) => {
        this.updateState('longBreakTime', time)
    }

    handleChangeAudioSetting = () => {
        this.updateState('audioOn', (!this.state.audioOn))
    }

    render() {
        return (
            <div className="container">
                {
                    (this.state.audioOn) ? 
                    <Sound url={bell} playStatus={this.state.play} onFinishedPlaying={this.handleSongFinishedPlaying} />
                    :
                    ''
                }
                <div className="row pt-2">
                    <div className="col text-center">
                        <h3><Emoji emoji="🍅"/> My Pomodoro Timer</h3>
                    </div>
                    <div className="col text-center">
                        {
                            (this.state.audioOn) ? 
                            <button type="button" class="btn btn-success"><i className="fas fa-volume-up" onClick={this.handleChangeAudioSetting}></i></button>
                            :
                            <button type="button" class="btn btn-secondary"><i className="fas fa-volume-mute" onClick={this.handleChangeAudioSetting}></i></button>
                        }
                        
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
        )
    }
}
