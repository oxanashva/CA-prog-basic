const { useState, useEffect, useRef } = React
import { utilService } from "../services/util.service.js"

export function SeasonClock({onChangeBackground}) {
    const [isDark, setIsDark] = useState(true)
    const [timestamp, setTimestamp] = useState(new Date())
    const [count, setCount] = useState(0)

    const intervalId = useRef(null)

    const season = utilService.getSeasonName(new Date(timestamp))
    const month = utilService.getMonthName(new Date(timestamp))
    const day = utilService.getDayName(new Date(timestamp))

    const backgrounds = {
        winter: {
            dark: '#000080',
            light: '#ADD8E6'
        },
        spring: {
            dark: '#228B22',
            light: '#78d86b'
        },
        summer: {
            dark: '#b9ae00',
            light: '#faf1cb'
        },
        autumn: {
            dark: '#CC5500',
            light: '#ffcf7f'
        },
        
    }
    const textColor = isDark ? 'white' : "black"

    const themeStyles = {
        backgroundColor: isDark ? backgrounds[season.toLowerCase()].dark : backgrounds[season.toLowerCase()].light,
        color: textColor
    }

    function handleClick() {
        setIsDark(isDark => !isDark)
    }

    useEffect(() => {
        intervalId.current = setInterval(() => {
            setCount((count) => count + 1)
        }, 1000)

        return (() => {
            clearInterval(intervalId.current)
        })
    }, [])

    useEffect(() => {
        onChangeBackground(themeStyles)

        return(() => {
            onChangeBackground(null)
        })
    }, [isDark])

    return (
        <section className="season-clock" onClick={handleClick}>
            <h2><span className="month">{month}</span><span className="season">({season})</span></h2>
            <img src={`../assets/img/season-imgs/${season.toLowerCase()}.png`} alt="Winter" width="200" />
            <p className="day">{day}</p>
            <p className="clock">{utilService.formatTime(count)}</p>
        </section>
    )
}

// Test:
// January 1, 2025: 1735689600000
// March 1, 2025: 1740873600000
// June 1, 2025: 1748985600000
// September 1, 2025: 1756848000000