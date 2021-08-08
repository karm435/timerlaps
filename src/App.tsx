import React, { useState } from 'react';
import './App.css';
import Countdown from "react-countdown";

const CompletionState = () => <span>Thank you for playing</span>;

function App() {
    const [completed, setCompleted] = useState(false);
    const [tick, setTick] = useState(0);
    const [frequency, setFrequency] = useState(0);
    const coundownRef = React.createRef<Countdown>();

    const onStart = () => {
        setCompleted(false);
        coundownRef.current?.getApi().start();
    }
    const onQuit = () => {
        coundownRef.current?.getApi().stop();
        setTick(0);
        setCompleted(true);
    }
    return (
        <div className="App">
            <header className="App-header">
                <h1>Numbers Series</h1>
            </header>
            <div className="Input-box">
                <label htmlFor="seconds">Seconds (X) between outputting: </label>
                <input name="seconds" type="text" value={frequency}
                       onChange={ (e) => setFrequency(+e.target.value)}
                       placeholder="Seconds"/>
                {frequency}
            </div>
            <div className="Actions-box">
                <input type="button" value="Start" onClick={ () => onStart()}/>
                <input type="button" value="Halt" onClick={ () => coundownRef.current?.getApi().pause()}/>
                <input type="button" value="Resume" onClick={ () => coundownRef.current?.getApi().start()}/>
                <input type="button" value="Quit" onClick={ () => onQuit()}/>
            </div>
            <div className="Timer-box" hidden={true}>
                <Countdown  date={Date.now() + 100000000000000000}
                           intervalDelay={frequency}
                           autoStart={false}
                           ref={coundownRef}
                           onTick={ () => setTick( (count) => count + 1) }
                           />
            </div>
            <div className="Number-box">
                <label htmlFor="numberInput">Enter a Number</label>
                <input type="text" name="numberInput"/>
            </div>
            <div className="Output-box">
                {!completed &&
                <textarea name="output" id="outputNumbers" cols={1} rows={1} value={tick}/>
                }
                {completed &&
                <CompletionState/>
                }

            </div>
        </div>
    );
}

export default App;
