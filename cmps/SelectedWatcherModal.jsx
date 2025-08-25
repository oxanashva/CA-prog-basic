import { AppModal } from "./AppModal.jsx"

export function SelectedWatcherModal({ isOpen, onCloseModal, selectedWatcher }) {
    return (
        <AppModal isOpen={isOpen} onClose={onCloseModal}>
            <h2>{selectedWatcher.fullName}</h2>
            <ul>
                {selectedWatcher.movies && selectedWatcher.movies.map(movie => (
                    <li key={movie.id}>{movie.name}</li>
                ))}
            </ul>
        </AppModal>
    )
}