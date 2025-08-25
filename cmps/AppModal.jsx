const { useEffect, useRef } = React

export function AppModal({isOpen, onClose, children}) {
    const elDialog = useRef(null)

    useEffect(() => {
        if (elDialog.current) {
            if (isOpen) {
                elDialog.current.showModal()
            } else {
                elDialog.current.close()
            }
        }
    }, [isOpen])

    function handleClose() {
        onClose()
    }

    return (
        <dialog className="app-modal" ref={elDialog} onCancel={handleClose}>
            {children}
            <button className="close" onClick={handleClose}>X</button>          
        </dialog>
    )
}