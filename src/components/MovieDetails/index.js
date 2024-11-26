import {useLocation} from 'react-router-dom'
import {useContext, useState, useEffect} from 'react'
import Apicontext from '../../apiContext'
import CastDetails from '../CastDetails'
import Loader from '../Loader'
import Navbar from '../Navbar'
import formateObj from '../../snakeToCamelCase'
import './index.css'

const pageStateList = ['loading', 'success', 'fail']

export default () => {
  const [movieDetails, setMovieDetails] = useState({})
  const [pageState, setPageState] = useState(pageStateList[0])
  const [castDetailsList, setCastDetails] = useState([])
  const {apiKey, imgUrl} = useContext(Apicontext)
  const location = useLocation()
  const movieId = location.pathname.slice(14)

  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
  console.log(url)

  async function fetchData() {
    setPageState(pageStateList[0])
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (response.ok) {
        setMovieDetails(formateObj(data))
        setPageState(pageStateList[1])
      } else {
        console.log('something went wrong')
        setPageState(pageStateList[2])
      }
    } catch (error) {
      console.error('the error occured :', error)
      setPageState(pageStateList[2])
    }
  }

  function FailState() {
    return (
      <div className="fail-safe-state">
        <h1 className="fail-state-heading">The page construction got failed</h1>
        <p className="fail-state-para">Please try again...</p>
        <button
          className="fail-state-button"
          onClick={() => {
            fetchData()
          }}
        >
          {' '}
          Retry{' '}
        </button>
      </div>
    )
  }

  async function fetchCastDetails() {
    const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
    const response = await fetch(castUrl)
    const data = await response.json()
    if (response.ok) {
      setCastDetails(data.cast)
    } else {
      console.log('Something went wrong with cast details loading')
    }
  }

  function SuccessState() {
    console.log(movieDetails)
    const {
      backdropPath,
      budget,
      homepage,
      imdbId,
      belongsToCollection,
      genres,
      id,
      originCountry,
      originalTitle,
      overview,
      posterPath,
      productionCompanies,
      productionCountries,
      releaseDate,
      revenue,
      runtime,
      spokenLanguages,
      status,
      tagline,
      title,
      voteAverage,
      voteCount,
    } = movieDetails
    const bgUrl = imgUrl.concat(backdropPath)
    return (
      <div className="movie-details-container">
        <div
          className="header-backdrop"
          style={{backgroundImage: `url(${bgUrl})`}}
        >
          <div className="movie-header-details">
            <div>
              <h1 className="movie-title">{title}</h1>
              <p className="tag-name">{tagline}</p>
            </div>
            <div className="movie-popular-container">
              <p className="detail-of-movie">
                <span className="label-heading">Rating:</span> {voteAverage}
                /10
              </p>
              <p className="detail-of-movie">
                <span className="label-heading">Votes: </span> {voteCount * 100}
              </p>
              <p className="status details-of-movie">
                {status === 'Released' && (
                  <>
                    <span className="label-heading">Release Date: </span>
                    {releaseDate}
                  </>
                )}
                {status !== 'Released' && 'Movie not Released yet'}
              </p>
              <p className="detail-of-movie">
                <span className="label-heading">Budget:</span>{' '}
                {budget === 0 ? '--' : budget * 100}
              </p>
              <p className="detail-of-movie">
                <span className="label-heading">Collection:</span>{' '}
                {revenue === 0 ? '--' : revenue * 100}
              </p>
              <p className="detail-of-movie">
                <span className="label-heading">Runtime:</span> {runtime} min
              </p>
              <p className="detail-of-movie">
                <span className="label-heading">Origin Country:</span>{' '}
                {originCountry.join(', ')}
              </p>
              <p className="detail-of-movie production-country">
                <span className="label-heading">Production Country:</span>{' '}
                {productionCountries.map(e => e.name).join(', ')}
              </p>

              <ul className="production-companies-container">
                <h3 className="production-companies-heading">
                  Production Companies:
                </h3>
                {productionCompanies.map(ele => (
                  <li key={ele.id}>
                    <img
                      src={imgUrl.concat(ele.logo_path)}
                      alt={ele.name}
                      className="companies-logo"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="movie-details-main-content">
            <img
              src={imgUrl.concat(posterPath)}
              alt={title}
              className="movie-poster-image"
            />
            <div className="movie-description-container">
              <h1 className="original-title">{originalTitle}</h1>
              <p className="movie-description">{overview}</p>
              <ul className="genre-container">
                {genres.map(ele => (
                  <li key={ele.id} className="genre-tag-items">
                    {ele.name}
                  </li>
                ))}
              </ul>
              <a
                href={`https://www.imdb.com/title/${imdbId}/`}
                target="_blank"
                className="anchor"
                rel="noopener noreferrer"
              >
                Click here for IMDB rating
              </a>

              <div className="cast-crew-main-container">
                <h3 className="cast-heading">Cast & Crew</h3>
                {castDetailsList.length > 0 && (
                  <ul className="cast-items-container">
                    {castDetailsList.map(item => (
                      <CastDetails
                        key={item.id}
                        castDetails={formateObj(item)}
                      />
                    ))}
                    {castDetailsList.length === 0 && (
                      <div className="cast-items-container">
                        <p>No Cast and Crew has listed ...</p>
                      </div>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchCastDetails()
  }, [])

  return (
    <div className="movie-details-main-container">
      <Navbar />
      {pageState === pageStateList[0] && <Loader />}
      {pageState === pageStateList[1] && <SuccessState />}
      {pageState === pageStateList[2] && <FailState />}
    </div>
  )
}