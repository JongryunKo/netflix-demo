import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import { Container, Row, Col, Badge, Button, Modal } from 'react-bootstrap';
import './MovieDetail.style.css'
import { useGetGenreQuery } from '../../hooks/useGetGenre';
import { useMovieReviewsQuery } from '../../hooks/useMovieRevies';
import Reviews from '../ReviewPage/Reviews';
import RecommendMovieSlide from '../Homepage/components/RecommendMovieSlide/RecommendMovieSlide';
import { FaYoutube } from 'react-icons/fa';
import YouTube from 'react-youtube';
import { useYoutubeIdQuery } from '../../hooks/useYoutubeId';

const MovieDetailPage = () => {
  let { id } = useParams();
  const { data, isLoading, isError, error, isSuccess } = useMovieDetailQuery({ id })
  const { data: genreData } = useGetGenreQuery()
  const { data: rewviewData } = useMovieReviewsQuery({ id });
  const {data : youtubeId} = useYoutubeIdQuery({id});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let youtubeKey;
  if(youtubeId){
    youtubeKey = youtubeId.key
  }
  

  

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((item1) => {
      const genreObj = genreData.find((genre) => genre.id == item1.id)
      return genreObj.name
    })
    return genreNameList;


  }


  return (
    <Container style={{ height: '100%', backgroundColor: "black" }}>
      <Row>
        <Col lg={5} xs={12} className="custom-dropdown-col">
          <div className='movie-poster' style={{ backgroundImage: "url(" + `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data?.poster_path}` + ")" }}></div>
        </Col>
        <Col lg={7} xs={12}>
          <Row>
            <div>
              {showGenre(data?.genres).map((genre, index) => (
                <Badge bg="danger" className='me-2' key={index} style={{ fontSize: '1.0rem' }}>{genre}</Badge>
              ))}

            </div>
            <div style={{ marginTop: '10px' , display: 'flex', alignItems: 'center', marginTop: '10px'}}>
              <h4 style={{display:'contents'}}>{data?.title}</h4>
              <Button variant="" onClick={handleShow}>
                <FaYoutube size={27} style={{ color: '#fff' }}/> {/* 유튜브 아이콘 추가 */}
              </Button>

              <Modal show={show} onHide={handleClose} className="custom-modal" size='lg'>
                <Modal.Body>
                  <YouTube videoId={youtubeKey} opts={{
                    height: '490',
                    width : '100%',
                    playerVars:{
                      autoplay: 1,
                    }
                  }}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div>{data?.overview}</div>
            <div>
              <p style={{ borderBottom: '2px solid white', marginTop: '10px' }}>

              </p>
            </div>
            <div>
              <Badge bg="warning" text="dark">
                평점 : {parseFloat(Number(data?.vote_average).toFixed(1))}
              </Badge>
            </div>
            <div>
              <Badge bg="success" text="dark">
                상영시간 : {data?.runtime}분
              </Badge>
            </div>
            <div>
              <Badge bg="info" text="dark">
                개봉일 : {data?.release_date}
              </Badge>

              <div>
                {data?.adult ? <Badge bg="danger">19</Badge> : <Badge bg="warning">전체</Badge>}
              </div>
              <div>
                <Badge bg="light" text="dark">
                  인기도 : {data?.popularity}
                </Badge>
              </div>
              <div>
                <p style={{ borderBottom: '2px solid white', marginTop: '10px' }}>
                </p>
              </div>
              <div>
                <Container>
                  <Row>
                    <Col lg={4}>
                    </Col>
                    <Col lg={8}>
                      <div style={{ marginTop: '20px' }}>
                        <Badge bg="danger" className='me-2' style={{ fontSize: '1.0rem' }}>
                          Revenue
                        </Badge>
                        ${data?.revenue}
                      </div>
                      <div style={{ marginTop: '20px' }}>
                        <Badge bg="danger" className='me-2' style={{ fontSize: '1.0rem' }}>
                          Budget
                        </Badge>
                        ${data?.budget}
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </Row>
        </Col>
      </Row>
      <div style={{ marginTop: '10px' }}>
        <RecommendMovieSlide id={id} />
      </div>


      <h1 style={{ marginTop: '20px' }}>Reviews</h1>
      {rewviewData?.map((review, index) => (
        <div className='review-container'>
          <Reviews review={review} key={index} />
        </div>
      ))}
    </Container>

  )
}

export default MovieDetailPage