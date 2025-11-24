import React, {useEffect, useRef} from 'react'
import "./TitleCard.css"
import { Link } from 'react-router-dom'

const TitleCard = ({title, category}) => {
    const [apiData, setApiData] = React.useState([]);
    const cardsRef = useRef();

    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGEwOGMxZWNkMzM3ZDhjMDBiMWIyNTBhZWNmZDFjMCIsIm5iZiI6MTc1OTQxMDc1NC45OTUwMDAxLCJzdWIiOiI2OGRlN2E0MjI5NDc0MTAwNTE0MDVkY2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.n0QRdFcwHSPiU7QSj4ajBSU2FQ90SpZUqML-ylwp7iA'
        }
      };

    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }

    useEffect(() => {
        // Use the correct TMDB API endpoint for fetching movies
        const categoryEndpoint = category ? category.replace(" ", "_").toLowerCase() : "now_playing";
        let url = `https://api.themoviedb.org/3/movie/${categoryEndpoint}?language=en-US&page=1`;
        
        // If no specific category, use popular movies as default
        if (!category) {
            url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
        }

        fetch(url, options)
        .then(res => res.json())
        .then(res => {
            // Set the full results array instead of just the first result
            setApiData(res.results || []);
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            setApiData([]);
        });

        const currentRef = cardsRef.current;
        if (currentRef) {
            currentRef.addEventListener('wheel', handleWheel);
        }

        // Cleanup event listener
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('wheel', handleWheel);
            }
        };
    }, [category]);

  return (
    <div className='titlecards'>
        <h2>{title ? title: "Popular Videos"} </h2>
        <div className='card-list' ref={cardsRef}>
            {apiData && apiData.length > 0 ? (
                apiData.map((card, index) => {
                    // Only render cards that have backdrop_path
                    if (!card.backdrop_path) return null;
                    
                    return (
                        <Link to={`/player/${card.id}`}
                              className='card'
                              key={card.id}>
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} 
                                alt={card.title || card.original_title}
                                className='card-image'
                            />
                            <p>{card.original_language}</p>
                            <p>{card.title || card.original_title}</p>
                        </Link>
                    );
                })
            ) : (
                <p>Loading videos...</p>
            )}
        </div>
    </div>
  )
}

export default TitleCard