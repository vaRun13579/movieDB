import {useContext, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Loader from '../Loader'
import Poster from '../Poster'
import Navbar from '../Navbar'
import Apicontext from '../../apiContext'
import formateObj from '../../snakeToCamelCase'
import './index.css'

const pageStateList = ['loading', 'success', 'fail']

function PopularMovies() {
  const [pageState, setPageState] = useState(pageStateList[0])
  const [moviesList, setMoviesList] = useState([])
  const [pageCount, setPageCount] = useState(1)
  const {apiKey} = useContext(Apicontext)

  async function fetchData() {
    setPageState(pageStateList[0])
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${pageCount}`
    try {
      const response = await fetch(url)
      const data = await response.json()

      setMoviesList(data.results)
      setPageState(pageStateList[1])
    } catch (error) {
      console.log(error)
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
          type="button"
          aria-label="retry"
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

  function SuccessState() {
    const navigate = useNavigate()
    return (
      <div className="success-page-container">
        <h1 className="section-heading">Popular Movies</h1>
        <ul className="success-container">
          {moviesList.map(obj => (
            <Poster key={obj.id} obj={formateObj(obj)} navigate={navigate} />
          ))}
        </ul>
        <div className="page-control-container">
          {pageCount > 1 && (
            <button
              className="page-count-buttons"
              type="button"
              aria-label="previous page"
              onClick={() => {
                setPageCount(ps => {
                  if (ps === 1) {
                    return ps
                  }
                  return ps - 1
                })
              }}
            >
              {'<'}
            </button>
          )}
          <p className="page-count">{pageCount}</p>
          <button
            className="page-count-buttons"
            type="button"
            aria-label="next page"
            onClick={() => {
              setPageCount(ps => ps + 1)
            }}
          >
            {'>'}
          </button>
        </div>
      </div>
    )
  }

  function ComponentRender() {
    switch (pageState) {
      case 'loading':
        return <Loader />
      case 'success':
        return <SuccessState />
      case 'fail':
        return <FailState />
      default:
        return <h1>something went wrong</h1>
    }
  }

  useEffect(() => {
    fetchData()
  }, [pageCount])

  return (
    <div className="main-container">
      <Navbar />
      <ComponentRender />
    </div>
  )
}
export default PopularMovies
