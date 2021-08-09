import React, { useState } from 'react';
import './App.css';
import Countdown from "react-countdown";

function App() {
    const [completed, setCompleted] = useState(false);
    const [frequency, setFrequency] = useState(0);
    const [numbersMap, setNumbersMap] = useState(new Map());
    const [messages, setMessages] = useState(['Please input the amount of time in seconds between emitting numbers and their frequency']);
    const coundownRef = React.createRef<Countdown>();
    let [isPaused, setIsPaused] = useState(false);

    const CompletionState = () => <span>{getMessagesString()} Thank you for playing </span>;

    const updateMap = (k: any, v: any) => {
        setNumbersMap(new Map(numbersMap.set(k, v)));
    }

    const updateNextNumber = (e: any) => {
        if (e.target.value) {
            let value = numbersMap.get(e.target.value);
            if (value) {
                value += 1;
                updateMap(e.target.value, value);
            } else if (isFibo(e.target.value)) {
                setMessages([...messages, '>> FIB Please enter the next number']);
                //setMessages([...messages, '>> Please enter the next number']);
            }
            else {
                value = 1;
                updateMap(e.target.value, value);
            }
        }
    }

    const isFibo = (number: any) : boolean => {

        const isPerfectSquare = (n: any) => {
            return n > 0 && Math.sqrt(n) % 1 === 0;
        }

        if(isPerfectSquare(5*number*number + 4) || isPerfectSquare(5 * number * number - 4)) {
            return true;
        }
        else {
            return false;
        }
    }

    const onStart = () => {
        if (isPaused) {
            setMessages([...messages, 'resume']);
            setIsPaused(false);
        }
        setCompleted(false);
        coundownRef.current?.getApi().start();
    }
    const onPause = () => {
        setMessages([...messages, 'halt']);
        setIsPaused(true);
    }

    const onQuit = () => {
        coundownRef.current?.getApi().stop();
        setCompleted(true);
    }

    const onFrequencyChange = (e: any) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setFrequency(+e.target.value)
        }
    }

    const onTick = () => {
        setMessages([...messages,' Please enter the next number ' + getMessagesString()]);
    }

    const getMessagesString = () => {
        let messageString = '>> ';
        numbersMap.forEach((k, v) => {
            messageString = messageString + `${v}:${k}, `;
        });
        return messageString.substr(0, messageString.length - 2);
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Numbers Series</h1>
            </header>
            <div className="Input-box">
                <label htmlFor="seconds">Seconds (X) between outputting: </label>
                <input name="seconds" type="text" value={frequency}
                       onChange={(e) => onFrequencyChange(e)}
                       placeholder="Seconds"/>
            </div>
            <div className="Actions-box">
                <input type="button" value="Start" disabled={frequency === 0 || numbersMap.size === 0} onClick={() => onStart()}/>
                <input type="button" value="Halt" onClick={() => onPause()}/>
                <input type="button" value="Resume" onClick={() => onStart()}/>
                <input type="button" value="Quit" onClick={() => onQuit()}/>
            </div>
            <div className="Timer-box" hidden={true}>
                <Countdown date={Date.now() + 100000000000000000}
                           intervalDelay={frequency}
                           autoStart={false}
                           ref={coundownRef}
                           onTick={() => onTick()}
                />
            </div>
            <div className="Number-box">
                <label htmlFor="numberInput">Next Number</label>
                <input type="text" name="numberInput" onBlur={(e) => updateNextNumber(e)}/>
            </div>
            <div className="Output-box">
                {!completed &&
                <div className="Messages-list">
                    {messages.map(txt => <p>{txt}</p>)}
                </div>
                }
                {completed &&
                <CompletionState/>
                }

            </div>
        </div>
    );
}

export default App;
