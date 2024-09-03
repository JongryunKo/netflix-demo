import React from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.style.css'
import { useGetGenreQuery } from '../../hooks/useGetGenre'
const MovieCard = ({ movie }) => {
    const { data: genreData } = useGetGenreQuery()
    const showGenre = (genreIdList) => {
        if (!genreData) return [];
        
        const genreNameList = genreIdList.map((id) => {
            const genreObj = genreData.find((genre) => genre.id === id)
            return genreObj.name
        })
        return genreNameList;
    }
    return (
        <div
            style={{
                backgroundImage: "url(" + `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` + ")"
                ,
            }}
            className='movie-card'


        >
            <div className='overlay'>
                <h5>{movie.title}</h5>
                <div>
                    {showGenre(movie.genre_ids).map((genre, index) => (
                        <Badge bg="danger" className='me-1' key={index}>{genre}</Badge>
                    ))}
                </div>
                <div>
                    <div>
                        <Badge bg="warning">평점</Badge>
                        &nbsp;
                        {parseFloat(Number(movie.vote_average).toFixed(1))}
                    </div>
                    {/* <div>{movie.popularity}</div> */}
                    <div>
                        {movie.adult ? <Badge bg="dark">19</Badge> : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard