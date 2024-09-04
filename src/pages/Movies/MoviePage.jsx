import React, { useEffect, useState } from 'react'
import { useSearchMoviesQuery } from '../../hooks/useSearchMovies'
import { useSearchParams } from 'react-router-dom'
import { Alert, Col, Container, Dropdown, DropdownButton, Row, Spinner } from 'react-bootstrap'
import MovieCard from '../../common/MovieCard/MovieCard'
import ReactPaginate from 'react-paginate';
import './MoviePage.style.css'
import { useGetGenreQuery } from '../../hooks/useGetGenre'

// nav바에서 클릭해서 온 경우 => popularMovie 보여주기
// keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌
// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭할때마다 page 바꿔주기
// page 값이 바뀔때 마다 useSearchMovie에 page 까지 넣어서 fetch
const MoviePage = () => {
  const [query, setQuery] = useSearchParams()
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [sortText, setSortText] = useState("Sort");
  const [filter, setFilter] = useState("");
  const [filterText, setFilterText] = useState("Filter");
  const [movieList, setMovieList] = useState([]);
  const keyword = query.get("q");
  const [sortedMovies, setSortedMovies] = useState([]);
  const [filteredAndSortedMovies, setFilteredAndSortedMovies] = useState([]);

  const { data: genreData } = useGetGenreQuery()


  const { data, isLoading, isError, error, isSuccess } = useSearchMoviesQuery({ keyword, page })

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1)
  }

  const handleSortSeleted = (eventKey, event) => {
    setSort(eventKey)
    setSortText(event.target.textContent)
  }

  const handleFilterSeleted = (eventKey, event) => {
    setFilter(eventKey)
    setFilterText(event.target.textContent)
  }

  useEffect(() => {
    console.log("sort===>", sort)
    
    if (movieList.length > 0) {
      let filteredMovies = [...movieList];
      //console.log('filteredMovies', filteredMovies)
      // 필터링
      if (filter) {
        //console.log("filter===>", filter)
        filteredMovies = filteredMovies.filter((movie)=> movie.genre_ids.includes(Number(filter)));
        console.log("filteredMovies", filteredMovies)
      }

        
      const sorted = filteredMovies.sort((a, b) => {
        switch (sort) {
          case 'popularity':
            return b.popularity - a.popularity;
          case 'releaseDate':
            return new Date(b.release_date) - new Date(a.release_date);
          case 'ratingScore':
            return b.vote_average - a.vote_average;
          default:
            return 0;
        }
      });
      setFilteredAndSortedMovies(sorted);
      console.log('filteredAndSortedMovies===>', filteredAndSortedMovies)
    }
  }, [sort, filter, movieList])



  useEffect(() => {
  }, [filter])

  useEffect(() => {
    if (data) {
      setMovieList(data.results)
    }
  }, [data])


  if (isLoading) {
    return (
      <div className='spinner-area'>
        <Spinner
          animation='border'
          variant='danger'
          style={{ width: '5rem', height: '5rem' }}
        />
      </div>
    )
  }
  if (isError) {
    return <Alert variant='danger'>{error.message}</Alert>
  }
  return (
    <Container>
      <Row>
        <Col lg={4} xs={12} className="custom-dropdown-col">
          <DropdownButton
            id="dropdown-basic-button"
            title={sortText}
            drop="end" // drop="end"를 사용하면 오른쪽으로 드롭다운이 나타납니다
            className="sort-dropdown-button"
            onSelect={handleSortSeleted}
          >
            <Dropdown.Item eventKey="popularity">인기순</Dropdown.Item>
            <Dropdown.Item eventKey="releaseDate">개봉일</Dropdown.Item>
            <Dropdown.Item eventKey="ratingScore">평점</Dropdown.Item>
          </DropdownButton>

          <DropdownButton
            id="dropdown-basic-button"
            title={filterText}
            drop="end" // drop="end"를 사용하면 오른쪽으로 드롭다운이 나타납니다
            className="filter-dropdown-button"
            onSelect={handleFilterSeleted}
          >
            {genreData?.map((genre) => (
              <Dropdown.Item eventKey={genre.id}>{genre.name}</Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {filteredAndSortedMovies?.map((movie, index) => (
              <Col key={index} lg={4} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <div style={{ marginTop: '10px' }}>
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={data.total_pages}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={page - 1}
            />
          </div>
        </Col>

      </Row>
    </Container>
  )
}

export default MoviePage