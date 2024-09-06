import React from 'react'
import { Alert } from 'bootstrap'
import MovieSlider from '../../../../common/MovieSlider/MovieSlider'
import { useRecommendMoviesQuery } from '../../../../hooks/useRecommendMovies';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    },
}

const RecommendMovieSlide = ({id}) => {
    const { data, isLoading, isError, error } = useRecommendMoviesQuery({id})

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (isError) {
        return <Alert variand="danger">{error.message}</Alert>
    }
    return (
        <div style={{backgroundColor: 'black'}}>
            <MovieSlider title='Recommend Movies' movies={data.results} responsive={responsive} />
        </div>
    )
}

export default RecommendMovieSlide;