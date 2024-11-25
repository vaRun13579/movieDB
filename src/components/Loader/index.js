import './index.css'

function Loader({color = '#53bdd8'}) {
  return (
    <div className="loader-container-con">
      <div className="loader-container" style={{'--col': color}}>
        {' '}
      </div>
    </div>
  )
}

export default Loader
