import React, { useEffect, useState } from 'react'
import Banner from './components/Banner/Banner'
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide'
import TopRatedMovieSlide from './components/TopRatedMovieSlide/TopRatedMovieSlide'
import UpcomingMovieSlide from './components/UpcomingMoviesSlide/UpcomingMovieSlide'
import { useGetGenre } from '../../hooks/useGetGenre'

// 1. 배너 => popular movie 영화를 들고와서 첫번째 아이템을 보여준다
// 2. popular movie
// 3. top rated movie
// 4. upcoming movie
const Homepage = () => {
  const [genre, setGenres] = useState([]);
  const { data, isLoading, isError, error } = useGetGenre()
  useEffect(() =>{
    if(data){
      setGenres(data.genres);
    }
  },[data]);
  return (
    <div>
      <Banner />
      <PopularMovieSlide genre={genre}/>
      <TopRatedMovieSlide genre={genre}/>
      <UpcomingMovieSlide genre={genre}/>
    </div>
  )
}

export default Homepage