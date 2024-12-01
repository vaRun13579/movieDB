import {Link, useLocation} from 'react-router-dom'
import {useState} from 'react'
import {RxHamburgerMenu} from 'react-icons/rx'
import {IoMdSearch} from 'react-icons/io'
import './index.css'

const navItems = ['Popular', 'Top Rated', 'Upcoming']
const navPath = ['/', '/top-rated', '/upcoming']

function Navbar() {
  const [selected, setSelected] = useState(false)
  const location = useLocation()
  console.log(location.pathname)

  return (
    <div className="nav-main-container">
      <div className="header">
        <Link to="/"><h1 className="nav-heading">movieDB</h1></Link>
        <ul className="nav-items-container">
          <Link to="/search">
            <li className="nav-list-item">
              <button
                className={`nav-buttons ${
                  location.pathname === '/search' ? 'golden-button' : ''
                }`}
                type="button"
                aria-label="serach"
              >
                Search
              </button>
            </li>
          </Link>
          {navItems.map((ele, i) => (
            <Link key={ele} to={navPath[i]}>
              <li className="nav-list-item">
                <button
                  className={`nav-buttons ${
                    location.pathname === navPath[i] ? 'golden-button' : ''
                  }`}
                  type="button"
                  aria-label={ele}
                >
                  {ele}
                </button>
              </li>
            </Link>
          ))}
        </ul>
        <div className="ham-icons-holder">
          <Link to="/search">
            <button
              className={`nav-buttons ${
                location.pathname === '/search' ? 'golden-button' : ''
              }`}
              type="button"
              aria-label="serach"
            >
              <IoMdSearch size={25} />
            </button>
          </Link>
          <button
            onClick={() => {
              setSelected(ps => !ps)
            }}
            className={selected ? 'selected-ham-icon' : 'ham-icon'}
          >
            <RxHamburgerMenu />
          </button>
        </div>
      </div>
      {selected && (
        <ul className="ham-items-container">
          {navItems.map((ele, i) => (
            <Link key={ele} to={navPath[i]}>
              <li
                onClick={() => {
                  setSelected(false)
                }}
                className={`ham-list-item ${
                  location.pathname === navPath[i] ? 'ham-golden-item' : ''
                }`}
              >
                <button className="ham-buttons" type="button" aria-label={ele}>
                  {ele}
                </button>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Navbar
