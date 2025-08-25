
import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { AnimalList } from "./pages/AnimalList.jsx"
import { animalInfos } from './assets/data/animals.js';
import { SeasonClock } from "./pages/SeasonClock.jsx"
import { CountDown } from "./pages/CountDown.jsx"
import { WatcherApp } from "./pages/WatcherApp.jsx"
import { utilService } from "./services/util.service.js";


const { useState } = React

export function RootCmp() {
    const [page, setPage] = useState('home')
    const [themeStyles, setThemeStyles] = useState({ backgroundColor: 'white', color: 'black' })

    const mainStyles = (page === 'animal-list' || page === 'season-clock' || page === 'count-down' || page === 'watcher-app') ? 'full-height full main-layout' : ''

    function onChangeBackground(styles) {
        setThemeStyles(styles)
    }

    function onDone(msg, el) {
        console.log(msg)
        utilService.animateCSS(el)
        const audio = new Audio("./assets/sound/alarm.mp3")
        audio.play()
    }

    return (
        <section className="app main-layout">
            <AppHeader page={page} onSetPage={setPage} />
            <main style={themeStyles} className={mainStyles}>
                <main>
                    {page === 'home' && <Home />}
                    {page === 'about' && <About />}
                    {page === 'animal-list' && <AnimalList animalInfos={animalInfos} onChangeBackground={onChangeBackground} />}
                    {page === 'season-clock' && <SeasonClock onChangeBackground={onChangeBackground} />}
                    {page === 'count-down' && <CountDown onChangeBackground={onChangeBackground} toTime={Date.now() + 1000 * 10} startFrom={10} onDone={onDone} />}
                    {page === 'watcher-app' && <WatcherApp onChangeBackground={onChangeBackground} />}
                </main>
            </main>
        </section>
    )
}

// toTime={Date.now() + 1000*10}