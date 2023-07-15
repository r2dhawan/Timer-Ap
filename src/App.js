import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [timer, setTimer] = useState(25 * 60); // Default: 25 minutes in seconds
  const [inputValue, setInputValue] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState('Work');

  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setSessionType((prevType) => (prevType === 'Work' ? 'Break' : 'Work'));
      setTimer(sessionType === 'Work' ? 5 * 60 : 25 * 60); // Set break time to 5 minutes and work time to 25 minutes
    }
    return () => clearInterval(interval);
  }, [isRunning, timer, sessionType]);

  const handleStartStop = () => {
    setIsRunning((prevState) => !prevState);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSessionType('Work');
    setTimer(25 * 60);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSetTimer = () => {
    const minutes = parseInt(inputValue, 10);
    if (!isNaN(minutes) && minutes > 0) {
      setTimer(minutes * 60);
      setIsRunning(false); // Stop the timer when setting a new duration
      setSessionType('Work'); // Reset the session type to 'Work'
      setInputValue(''); // Clear the input field
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <div className="timer">
        <div className="session-type">{sessionType}</div>
        <div className="time">{formatTime(timer)}</div>
        <div className="controls">
          <button onClick={handleStartStop}>{isRunning ? 'Pause' : 'Start'}</button>
          <button onClick={handleReset}>Reset</button>
        </div>
        <div className="input-container">
          <input
            type="number"
            placeholder="Set timer (minutes)"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button onClick={handleSetTimer}>Set Timer</button>
        </div>
      </div>
    </div>
  );
};

export default App;
