import React, { useState, useEffect } from 'react'
import "./player.css"
import BackArrowIcon from "../../assets/icons/BackArrowIcon.png"
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
    title: "",
    overview: "",
    youtubeKey: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGEwOGMxZWNkMzM3ZDhjMDBiMWIyNTBhZWNmZDFjMCIsIm5iZiI6MTc1OTQxMDc1NC45OTUwMDAxLCJzdWIiOiI2OGRlN2E0MjI5NDc0MTAwNTE0MDVkY2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.n0QRdFcwHSPiU7QSj4ajBSU2FQ90SpZUqML-ylwp7iA'
    }
  };

  useEffect(() => {
    if (id) {
      // First, fetch movie details
      const fetchMovieData = async () => {
        try {
          setLoading(true);
          setError(null);
          
          // Fetch movie details from TMDB API
          const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
          const movieData = await movieResponse.json();
          
          // Fetch videos (trailers) from TMDB API
          const videosResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options);
          const videosData = await videosResponse.json();
          
          // Find YouTube trailer
          let youtubeKey = "";
          if (videosData.results && videosData.results.length > 0) {
            const youtubeTrailer = videosData.results.find(video => 
              video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser")
            );
            if (youtubeTrailer) {
              youtubeKey = youtubeTrailer.key;
            }
          }
          
          setApiData({
            name: movieData.title || movieData.original_title || "",
            key: movieData.id || "",
            published_at: movieData.release_date || "",
            type: movieData.genres && movieData.genres.length > 0 ? movieData.genres[0].name : "Movie",
            title: movieData.title || movieData.original_title || "",
            overview: movieData.overview || "",
            youtubeKey: youtubeKey
          });
        } catch (err) {
          console.error("Error fetching movie data:", err);
          setError("Failed to load video information");
          // Set default values in case of error
          setApiData({
            name: "Video Unavailable",
            key: "",
            published_at: "",
            type: "Unknown",
            title: "Video Unavailable",
            overview: "Sorry, video information is not available.",
            youtubeKey: ""
          });
        } finally {
          setLoading(false);
        }
      };
      
      fetchMovieData();
    }
  }, [id]);

  // Function to render video player
  const renderVideoPlayer = () => {
    if (loading) {
      return (
        <div style={{
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white"
        }}>
          <p>Loading video...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div style={{
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          flexDirection: "column"
        }}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      );
    }
    
    if (apiData.youtubeKey) {
      // Render YouTube video
      return (
        <iframe 
          width="100%" 
          height="100%"
          src={`https://www.youtube.com/embed/${apiData.youtubeKey}`}
          title={apiData.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    } else {
      // Fallback: show placeholder with movie information
      return (
        <div style={{
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          flexDirection: "column",
          padding: "20px",
          textAlign: "center"
        }}>
          <h2>{apiData.title || "Video Not Available"}</h2>
          <p>This movie doesn't have a trailer available.</p>
          <p>TMDB ID: {id}</p>
          {apiData.overview && (
            <div style={{marginTop: "20px", maxWidth: "80%"}}>
              <h3>Description:</h3>
              <p>{apiData.overview}</p>
            </div>
          )}
        </div>
      );
    }
  };

  return(
    <div className='player'>
      <img 
        src={BackArrowIcon} 
        alt="back" 
        className='back-icon'
        onClick={() => {
          navigate(-1);
        }}
      />
      
      <div className="video-container">
        {renderVideoPlayer()}
      </div>

      <div className="playerinfo">
        <p>{apiData.published_at ? apiData.published_at.slice(0,10) : "N/A"}</p>
        <p>{apiData.name || "Untitled"}</p>
        <p>{apiData.type}</p>
      </div>
      
      {apiData.overview && !apiData.youtubeKey && (
        <div className="video-description" style={{
          width: "80%",
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#333",
          borderRadius: "10px",
          color: "white"
        }}>
          <h3>Description:</h3>
          <p>{apiData.overview}</p>
        </div>
      )}
    </div>
  )
}

export default Player