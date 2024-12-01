import {useState, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {IoMdSearch} from 'react-icons/io'
import formateObj from '../../snakeToCamelCase'
import Apicontext from '../../apiContext'
import Loader from '../Loader'
import Navbar from '../Navbar'
import Poster from '../Poster'
import './index.css'

export default () => {
  const navigate = useNavigate()
  const [search, updateSearch] = useState('')
  const [moviesList, setMoviesList] = useState([])
  const [pageCount, setPageCount] = useState(1)
  const {apiKey} = useContext(Apicontext)
  const [isLoad, setLoad] = useState(false)

  async function fetchData() {
    setLoad(true)
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&page=${pageCount}`
    console.log(url)
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (response.ok) {
        setMoviesList(data.results)
        setLoad(false)
      } else {
        setLoad(false)
        console.log('something went wrong')
      }
    } catch (error) {
      setLoad(false)
      console.error('The error occured:', error)
    }
  }

  useEffect(() => {
    fetchData()
    console.log('data is trying to fetch')
  }, [])

  return (
    <div className="search-main-container">
      <Navbar />
      <form
        className="search-container"
        onSubmit={ev => {
          ev.preventDefault()
          fetchData()
        }}
      >
        <div className="search-bar-container">
          <input
            type="search"
            onChange={ev => {
              updateSearch(ev.target.value)
            }}
            value={search}
            placeholder="Movies, shows & many more..."
            className="search-bar"
          />
          <button className="search-button" type="submit">
            <IoMdSearch size={25} />
          </button>
        </div>
      </form>
      {moviesList.length > 0 && !isLoad && (
        <div className="success-page-container">
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
                aria-label="pre page"
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
      )}
      {isLoad && <Loader color="red" />}
      {moviesList.length === 0 && !isLoad && (
        <div className="default-msg-container">
          <h1>Search something to find results on page</h1>
        </div>
      )}
    </div>
  )
}
