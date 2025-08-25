const { useState, useEffect } = React
import { sampleWatchers } from '../assets/data/watchers.js';
import { AddWatcherModal } from '../cmps/AddWatcherModal.jsx';
import { RemoveWatcherModal } from '../cmps/RemoveWatcherModal.jsx';
import { SelectedWatcherModal } from '../cmps/SelectedWatcherModal.jsx';
import { WatcherIcon } from '../cmps/WathcerIcon.jsx'
import { utilService } from '../services/util.service.js';
import { watcherService } from '../services/watcher.service.js';

export function WatcherApp({ onChangeBackground }) {
    const [watchers, setWatchers] = useState([])
    const [selectedWatcher, setSelectedWatcher] = useState(null)
    const [formData, setFormData] = useState({ fullName: '', color: '', movies: [] })
    const [modalType, setModalType] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        watcherService.loadWatchers()
            .then(watchers => setWatchers(watchers))
            .catch(error => {
                console.error("Error loading watchers: ", error)
            })

        onChangeBackground({ backgroundColor: '#debaab', color: '#0a2694' })

        return (() => {
            onChangeBackground(null)
        })
    }, [])

    function onAddWatcher(ev) {
        ev.preventDefault()

        if (!formData.fullName || !formData.color || !formData.movies.length) {
            alert('Please enter a name , color and at least one movie for the watcher!')
            return
        }

        const watcher = {
            ...formData,
            id: utilService.makeId()
        }
        watcherService.addWatcher(watcher)
            .then((watcher) => {
                setWatchers(prevWatchers => [...prevWatchers, watcher])
                onCloseModal()
            })
            .catch(error => {
                console.error("Error adding watcher: ", error)
            })
    }

    function onRemoveWatcher(ev, id) {
        ev.preventDefault()
        watcherService.removeWatcher(id)
            .then(() => setWatchers(prevWatchers => {
                return prevWatchers.filter(watchers => watchers.id !== id)
            }))
            .catch(error => {
                console.error("Error removing watcher: ", error)
            })
        onCloseModal()
    }

    function onCloseModal() {
        setSelectedWatcher(null)
        setFormData({ fullName: '', color: '', movies: [] })
        setModalType('')
        setIsOpen(false)
    }

    function onOpenModal(type, id) {
        if (type === "add") {
            setModalType("add")
        } else if (type === "select") {
            setModalType("select")
            const selectedWatcher = watchers.find(watcher => watcher.id === id)
            setSelectedWatcher(selectedWatcher)
        } else if (type === "remove") {
            const watcherToRemove = watchers.find(watcher => watcher.id === id)
            setSelectedWatcher(watcherToRemove)
            setModalType("remove")
        }
        setIsOpen(true)
    }

    return (
        <React.Fragment>
            <section className="watcher-app">
                <h1>WatcherApp</h1>
                <button className="add-btn" onClick={() => onOpenModal("add")}>Add Wathcer</button>
                <div className="cards-container">
                    {
                        watchers &&
                        watchers.map(({ id, fullName, color }) =>
                            <article key={id}>
                                <WatcherIcon fill={color} />
                                <p className="name">{fullName}</p>
                                <hr />
                                <div className="btns-container">
                                    <button className="remove" onClick={() => onOpenModal("remove", id)}>Remove</button>
                                    <button className="select" onClick={() => { onOpenModal("select", id) }}>Select</button>
                                </div>
                            </article>
                        )
                    }
                </div>
            </section>
            {modalType === "add" && <AddWatcherModal isOpen={isOpen} onCloseModal={onCloseModal} onAddWatcher={onAddWatcher} formData={formData} setFormData={setFormData} />}

            {modalType === "select" && selectedWatcher && <SelectedWatcherModal isOpen={isOpen} onCloseModal={onCloseModal} selectedWatcher={selectedWatcher} />}

            {modalType === "remove" && selectedWatcher && <RemoveWatcherModal isOpen={isOpen} onCloseModal={onCloseModal} onRemoveWatcher={onRemoveWatcher} selectedWatcher={selectedWatcher} />}
        </React.Fragment>
    )
}