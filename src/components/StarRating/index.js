import './index.css'

export default ({rating = 0, size = 20}) => (
  <p
    className="rating"
    style={{fontSize: `${size}px`, '--rating': `${rating}%`}}
  >
    ★★★★★
  </p>
)
