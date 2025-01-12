import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import '../css/Home.css'
import { getPopularMovies, searchMovies } from "../services/api";

function Home() {
    
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadPopularMovies = async () => {
        try {
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies);
        } catch(err) {
            setError("Failed to load movies.....")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadPopularMovies();
    }, [])
    
    // const movies = [
    //     {id:1, title: "John Wick", date: "2020", url: "https://placehold.co/600x400"},
    //     {id:2, title: "Terminator", date: "1999", url: "https://placehold.co/600x400"},
    //     {id:3, title: "The Matrix", date: "1998", url: "https://placehold.co/600x400"},
    // ]

    const handleSearch = async (e) => {
        e.preventDefault();
        if(!searchQuery.trim()) return
        if (loading) return

        setLoading(true)

        try{
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            setError("Failed to search movies....")
        } finally {
            setLoading(false)
        }
    };
    
    return(
        <div className="home">

            <form onSubmit={handleSearch} className="search-form">
                <input type="text" 
                        placeholder="Search for movies...." 
                        className="search-input" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} />
                <button type="submit" className="search-button">Search Button</button>
            </form>

            {error && (
                <div className="error-message">{error}</div>
            )}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id}/>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home;