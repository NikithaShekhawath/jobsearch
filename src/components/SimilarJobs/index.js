import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

import {FaStar} from 'react-icons/fa'

import './index.css'

const SimilarJobs = props => {
  const {eachElement} = props

  const {
    description,
    companyLogo,
    title,
    rating,
    location,
    employType,
  } = eachElement

  return (
    <li className="li">
      <div className="companyLogoJobFlex">
        <div>
          <img
            className="CompanyLogo"
            src={companyLogo}
            alt="similar job company logo"
          />
        </div>
        <div className="ratingFlexJob">
          <h1 className="job-title1">{title}</h1>
          <p className="job-title2">
            <FaStar className="star" color="#fbbf24" size={20} />
            {rating}
          </p>
        </div>
      </div>
      <h1 className="desc">Description</h1>
      <p className="each-des">{description}</p>
      <div className="FlexLocationSimilar">
        <div className="cont">
          <IoLocationOutline className="icon" />
          <p className="icon-text">{location}</p>
        </div>
        <div className="cont">
          <BsBriefcaseFill className="icon" />
          <p className="icon-text">{employType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
