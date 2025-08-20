
import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { AnimalList } from "./pages/AnimalList.jsx"
import { animalInfos }  from './assets/data/animals.js';
import { SeasonClock } from "./pages/SeasonClock.jsx"


const {useState } = React

export function RootCmp() {
    const [page, setPage] = useState('home')
    const [themeStyles, setThemeStyles] = useState({backgroundColor: 'white', color: 'black'})

    const mainStyles = (page === 'animal-list' || page === 'season-clock') ? 'full-height full main-layout' : ''

    function onChangeBackground(styles) {
        setThemeStyles(styles)
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
                    </main>
                </main>
            </section>
    )
}