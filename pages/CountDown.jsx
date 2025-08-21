import { utilService } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function CountDown({startFrom, toTime, onDone, onChangeBackground}) {
    // `countdown`: current countdown time in milliseconds
    // If `toTime` is provided, calculate remaining time by subtracting current timestamp
    // Otherwise, initialize with `startFrom` converted from seconds to milliseconds
    const [countdown, setCountdown] = useState(toTime ? toTime - Date.now() : startFrom * 1000)

    const intervalId = useRef(null)
    const elTime = useRef(null)
    
    useEffect(() => {
        if (countdown <= 0) {
            handleDone()
            return
        }

        intervalId.current = setInterval(() => {
            setCountdown(prevTime => {
                const newTime = prevTime - 1000

                if (newTime <= 0) {
                    handleDone()
                    return 0
                }

                return newTime
            })
        }, 1000)

        return () => clearInterval(intervalId.current)
    }, [])

    useEffect(() => {
        onChangeBackground({backgroundColor: 'lightblue', color: '#0a2694'})

        return(() => {
            onChangeBackground(null)
        })
    }, [])
    
    function handleDone() {
        clearInterval(intervalId.current)
        if (toTime) onDone('Its Time!', elTime.current)
        else onDone('Done!', elTime.current)
    }

    const displayTime = toTime ? utilService.formatTime(Math.floor(countdown / 1000)) : Math.floor(countdown / 1000)

    const className = (countdown / 1000) < 6 ? 'red' : ''

    return (
        <section className="count-down">
            <div className="box box1">
                <div className="box box2">
                    <p ref={elTime} className={`time ${className}`}>{displayTime}</p>
                </div>
            </div>
        </section>
    )
}