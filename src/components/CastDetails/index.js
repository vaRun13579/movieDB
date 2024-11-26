import {useState, useContext} from 'react'
import Apicontext from '../../apiContext'
// import Loader from "../Loader"
import './index.css'

export default ({castDetails}) => {
  const {
    gender,
    name,
    originalName,
    profilePath,
    character,
    knownForDepartment,
  } = castDetails
  const {imgUrl} = useContext(Apicontext)
  const [imgState, setImgState] = useState('loading')
  console.log('cast image:', imgUrl.concat(profilePath))
  console.log(castDetails)
  return (
    <li className="profile-list-item">
      {imgState === 'loading' && (
        <div className="loader-alt-container">
          <img
            src={
              gender === 2
                ? 'https://i.pinimg.com/736x/e3/9a/c2/e39ac2e4a10765ee3479d70fda5b191a.jpg'
                : 'https://i.pinimg.com/736x/3b/0f/a0/3b0fa0a852492e9d65b3be32ca91600d.jpg'
            }
            alt="alternative-dummy"
            className="profile-pic"
          />
        </div>
      )}
      <img
        src={imgUrl.concat(profilePath)}
        alt={name}
        className="profile-pic"
        onLoad={() => {
          setImgState(false)
        }}
        style={{display: imgState === 'loading' ? 'none' : 'inline-block'}}
      />
      <h3 className="character-name">{character}</h3>
      <p className="original-name">
        {
          (name === originalName ? name : `${originalName} famously called as`,
          (<strong>{name}</strong>))
        }
      </p>
      <p className="department">Department: {knownForDepartment}</p>
    </li>
  )
}
