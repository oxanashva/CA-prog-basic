
import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { AnimalList } from "./pages/AnimalList.jsx"
import { animalInfos }  from './assets/data/animals.js';

const {useState } = React

export function RootCmp() {
    const [page, setPage] = useState('home')
    const animalListLayout = (page === 'animal-list') ? 'animal-list-theme full main-layout' : ''

    return (
            <section className="app main-layout">
                <AppHeader page={page} onSetPage={setPage} />
                <main className={animalListLayout}>
                    <main>
                        {page === 'home' && <Home />}
                        {page === 'about' && <About />}
                        {page === 'animal-list' && <AnimalList animalInfos={animalInfos} />}
                    </main>
                </main>
            </section>
    )
}