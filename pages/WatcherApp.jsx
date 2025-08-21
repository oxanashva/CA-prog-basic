const { useState, useEffect } = React
import { watchers }  from '../assets/data/watchers.js';

export function WatcherApp({onChangeBackground}) {


    useEffect(() => {
        onChangeBackground({backgroundColor: '#debaab', color: '#0a2694'})

        return(() => {
            onChangeBackground(null)
        })
    }, [])

    return (
        <section className="watcher-app">
            <h1>WatcherApp</h1>
            <button className="add-btn">Add Wathcer</button>
            <div className="cards-container">
                {
                    watchers.map((watcher) =>
                        <article>
                            <img src="../assets/img/watcher.svg" alt="Watcher" />
                            <p className="name">Puki Ba</p>
                            <hr />
                            <div className="btns-container">
                                <button className="remove">Remove</button>
                                <button className="select">Select</button>
                            </div>
                        </article>
                    )
                }
            </div>
        </section>
    )
}

// #1d3baa - blue
// #5aad93 - green
// #c4515d - red