import {Link, useLocation} from 'react-router-dom'
import './index.css'

const navItems = ['Popular', 'Top Rated', 'Upcoming']
const navPath = ['/', '/top-rated', '/upcoming']

function Navbar() {
  // const [navItems, setNavItem] = useState(navItems[0])
  const location = useLocation()
  console.log(location.pathname)

  return (
    <div className="header">
      <h1 className="nav-heading">movieDB</h1>
      <ul className="nav-items-container">
        {navItems.map((ele, i) => (
          <Link key={ele} to={navPath[i]}>
            <li>
              <button className="nav-buttons">{ele}</button>
            </li>
          </Link>
        ))}
        <Link to="/search">
          <li>
            <button className="nav-buttons">Search</button>
          </li>
        </Link>
      </ul>
    </div>
  )
}

export default Navbar
