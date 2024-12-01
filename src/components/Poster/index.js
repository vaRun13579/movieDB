import {useState, useContext} from 'react'
import Loader from '../Loader'
import Apicontext from '../../apiContext'
import StarRating from '../StarRating'
import './index.css'

function Poster({obj, navigate}) {
  const {posterPath, originalTitle, voteAverage, id} = obj
  const [isLoad, setLoadValue] = useState(true)
  // const [deviceWidth, setDeviceWidth] = useState(window.innerWidth)
  const {imgUrl} = useContext(Apicontext)
  // window.addEventListener('resize', () => {
  //   setDeviceWidth(window.innerWidth)
  //   console.log(`Updated viewport width: ${deviceWidth}px`)
  // })

  return (
    <li className="movie-poster-item">
      {isLoad && (
        <div className="img-placeholder" style={{'--width': '200px'}}>
          <Loader color="gold" />
        </div>
      )}
      <img
        src={imgUrl.concat(posterPath)}
        alt={originalTitle}
        className="movie-poster"
        onLoad={() => {
          setLoadValue(false)
        }}
        style={{display: !isLoad ? 'inline-block' : 'none'}}
      />
      <div className="movie-poster-details">
        <h1 className="movie-name">{originalTitle}</h1>
        <p className="movie-rating">{voteAverage}</p>
        <StarRating rating={voteAverage * 10} size={15} />
        <button
          className="movie-details-button"
          type="button"
          aria-label="view details"
          onClick={() => {
            navigate(`/moviedetails/${id}`)
          }}
        >
          view details
        </button>
      </div>
    </li>
  )
}

export default Poster
