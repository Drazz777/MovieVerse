import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import '../css/MovieCard.css'
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({movie}) {
    
    const {addToFavorites, removeFromFavorites, isFavorite} = useMovieContext();
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault();
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }
    
    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    <button className="favorite-btn"
                            onClick={onFavoriteClick}>
                            
                            { favorite ? (
                            <FaHeart className="favorite-heart-enabled"/>
                            ) : (
                            <FaRegHeart className="favorite-heart-disabled"/>
                            )}
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
            </div>
        </div>
    )
}

export default MovieCard;