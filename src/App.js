import {Routes, Route, Navigate} from 'react-router-dom'
import Apicontext from './apiContext'
import PopularMovies from './components/PopularMovies'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import NotFound from './components/NotFound'
import SearchMovie from './components/SearchMovie'
import MovieDetails from './components/MovieDetails'
import './App.css'

const App = () => {
  const apiKey = '430ae7a436aac5231149c89b87e093eb'
  const imgUrl = 'https://image.tmdb.org/t/p/original'
  return (
    <Apicontext.Provider value={{apiKey, imgUrl}}>
      <Routes>
        <Route path="/" element={<PopularMovies />} />
        <Route path="/top-rated" element={<TopRatedMovies />} />
        <Route path="/upcoming" element={<UpcomingMovies />} />
        <Route path="/search" element={<SearchMovie />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/moviedetails/:id" element={<MovieDetails />} />
        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>
    </Apicontext.Provider>
  )
}

export {Apicontext}
export default App
