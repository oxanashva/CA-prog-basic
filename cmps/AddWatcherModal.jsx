const { useState, useRef } = React
import { AppModal } from "./AppModal.jsx";
import { utilService } from "../services/util.service.js";

export function AddWatcherModal({ isOpen, onCloseModal, onAddWatcher, formData, setFormData }) {
    const elMoviesInput = useRef(null)

    function addMovie(ev) {
        ev.preventDefault();
        const movieName = elMoviesInput.current.value;
        if (movieName) {
            const newMovie = {
                id: utilService.makeId(),
                name: movieName,
            };
            setFormData((prevData) => ({
                ...prevData,
                movies: [...prevData.movies, newMovie],
            }));
        }
        elMoviesInput.current.value = "";
    }

    function removeMovie(ev, id) {
        ev.preventDefault();
        setFormData((prevData) => {
            const updatedMovies = prevData.movies.filter((movie) => movie.id !== id);
            return { ...prevData, movies: updatedMovies };
        });
    }

    function handleInput(ev) {
        const { id, value } = ev.target
        setFormData(prevData => ({ ...prevData, [id]: value }))
    }

    return (
        <AppModal isOpen={isOpen} onClose={onCloseModal}>
            <h2>Add Whatcher</h2>
            <form className="add-form" method="dialog" onSubmit={onAddWatcher}>
                <label htmlFor="fullName">Name</label>
                <input type="text" id="fullName" onChange={handleInput} />
                <label htmlFor="color">Avtar color</label>
                <input type="text" id="color" onChange={handleInput} />
                <label htmlFor="movies">Movie</label>
                <div className="movie-input">
                    <input ref={elMoviesInput} type="text" id="movies" />
                    <button className="add-btn" type="button" onClick={addMovie}>
                        Add
                    </button>
                </div>
                <div className="movies-container">
                    {formData &&
                        formData.movies &&
                        formData.movies.map((movie) => (
                            <div className="movie" key={movie.id}>
                                <span>{movie.name}</span>
                                <button onClick={(ev) => removeMovie(ev, movie.id)}>X</button>
                            </div>
                        ))}
                </div>
                <div className="action-btns">
                    <button type="button" onClick={onCloseModal}>Cancel</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </AppModal>
    );
}
