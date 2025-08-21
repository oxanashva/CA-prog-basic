
export function AppHeader({page = 'home', onSetPage}) {

    function onPageChange(ev, page) {
        ev.preventDefault()
        onSetPage(page)
    }    

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Starter Proj</h1>
                <nav>
                    <a href="" className={(page === 'home') ? 'active' : ''}
                        onClick={(ev) => onPageChange(ev, 'home')}>
                        Home
                    </a> | 
                    <a href="" className={(page === 'about') ? 'active' : ''}
                        onClick={(ev) => onPageChange(ev, 'about')}>
                        About
                    </a> | 
                    <a href="" className={(page === 'animal-list') ? 'active' : ''} onClick={(ev) => onPageChange(ev, 'animal-list')}>
                        Animal List
                    </a> |
                    <a href="" className={(page === 'season-clock') ? 'active' : ''} onClick={(ev) => onPageChange(ev, 'season-clock')}>
                        Season Clock
                    </a> |
                    <a href="" className={(page === 'count-down') ? 'active' : ''} onClick={(ev) => onPageChange(ev, 'count-down')}>
                        Count Down
                    </a>
                </nav>
            </section>
        </header>
    )
}
