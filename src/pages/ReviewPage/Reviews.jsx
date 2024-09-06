import React, { useState } from 'react'
import './Reviews.style.css'

const Reviews = (reviewMap) => {
    const [isExpanded, setIsExpanded]=useState(false);
    const maxLength = 300
    //console.log('reviewMap' , reviewMap.review.content)
    // 300자 기준으로 텍스트 자르기
    const truncatedText = reviewMap.review.content.length > maxLength ? reviewMap.review.content.substring(0, maxLength) + "..." : reviewMap.review.content

    const toggleExpansion = () =>{
        setIsExpanded(!isExpanded);
    }

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      };

    const buttonStyle = {
        backgroundColor: 'black',
        color: 'white',
        border: 'none',
        padding: '10px',
        cursor: 'pointer',
        fontSize: '16px',
        marginLeft: '10px'
      };
  return (
    <div>
        <div style={{marginLeft: '10px'}}>Author : {reviewMap.review.author} &nbsp;&nbsp;&nbsp;last update: {formatDate(reviewMap.review.updated_at)}</div>
        <div style={{marginLeft: '10px', border: 'red'}}>
            {isExpanded ? reviewMap.review.content : truncatedText} 
        </div>
        {reviewMap.review.content.length > maxLength && (
        <button onClick={toggleExpansion} className='exapend-button' style={buttonStyle}>
          {isExpanded ? '접기' : '더보기'}
        </button>
      )}
    </div>
  )
}

export default Reviews