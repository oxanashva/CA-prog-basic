import { utilService } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function CountDown({startFrom, toTime, onDone, onChangeBackground}) {
    const initialTimeValue = toTime ? toTime - Date.now() : startFrom * 1000 //milliseconds
    const [time, setTime] = useState(initialTimeValue)
    const intervalId = useRef(null)
    const elTime = useRef(null)
    
    useEffect(() => {
        if (time <= 0) {
            clearInterval(intervalId.current)
            toTime ? onDone('Its Time!', elTime.current) : onDone('Done!', elTime.current)
            return
        }

        intervalId.current = setInterval(() => {
            setTime(prevTime => {
                const newTime = prevTime - 1000
                if (newTime <= 0) {
                    clearInterval(intervalId.current)
                    toTime ? onDone('Its Time!', elTime.current) : onDone('Done!', elTime.current)
                    return 0
                }
                return newTime
            })
        }, 1000)

        return () => clearInterval(intervalId.current)
    }, [])
    
    const displayTime = toTime ? utilService.formatTime(Math.floor(time / 1000)) : Math.floor(time / 1000)
    const classRed = time / 1000 < 6 ? 'red' : ''

    useEffect(() => {
        onChangeBackground({backgroundColor: 'lightblue', color: '#0a2694'})
    }, [])

    return (
        <section className="count-down">
            <div className="box box1">
                <div className="box box2">
                    <p ref={elTime} className={`time ${classRed}`}>{displayTime}</p>
                </div>
            </div>
        </section>
    )
}