const { useState, useEffect } = React

export function MouseMonitor() {
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const [isOn, setIsOn] = useState(true)

    useEffect(() => {
        if (isOn) addMouseListener()

        return () => removeMouseListener()
    }, [isOn])

    function addMouseListener() {
        document.addEventListener('mousemove', updatePos)
    }

    function removeMouseListener() {
        document.removeEventListener('mousemove', updatePos)
    }

    function updatePos(ev) {
        setPos(prevPos => {
            return {
                ...prevPos,
                x: ev.x,
                y: ev.y
            }
        })
    }

    function toggleIsOn() {
        setIsOn(prev => !prev)
    }

    return (
        <div className="mouse-monitor">
            <section className="mouse-info">
                <p>Mouse Position</p>
                <p>x: <span>{pos.x}</span>, y: <span>{pos.y}</span></p>
                <button onClick={toggleIsOn}>{isOn ? 'Pause' : 'Resume'}</button>
            </section>
        </div>
    )
}