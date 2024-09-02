import React from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.style.css'
const MovieCard = ({movie}) => {
    
  return (
    <div
        style={{backgroundImage:"url("+ `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` + ")"
                ,
                }}
        className='movie-card'


    >
        <div className='overlay'>
            <h5>{movie.title}</h5>
            {movie.genre_ids.map((id)=>(
                    <Badge bg="danger">{id}</Badge>
            ))}
            
            <div>
                <div>
                    <Badge bg="warning">평점</Badge>
                    &nbsp;
                    {parseFloat(Number(movie.vote_average).toFixed(1))}
                </div>
                <div>{movie.popularity}</div>
                <div>
                    {movie.adult? <Badge bg="dark">19</Badge> : "" }
                </div>
            </div>
        </div>
    </div>
  )
}

export default MovieCard