import { AppModal } from "./AppModal.jsx";

export function RemoveWatcherModal({ isOpen, onCloseModal, onRemoveWatcher, selectedWatcher }) {
    return (
        <AppModal isOpen={isOpen} onClose={onCloseModal}>
            <form className="remove-form" method="dialog" onSubmit={(ev) => onRemoveWatcher(ev, selectedWatcher.id)}>
                <p>Are you sure you want to remove the watcher?</p>
                <button className="confirm" type="submit">OK</button>
                <button className="cancel" onClick={onCloseModal}>Cancel</button>
            </form>
        </AppModal>
    )
}