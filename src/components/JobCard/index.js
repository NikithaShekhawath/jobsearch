import {Link} from 'react-router-dom'
import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaStar} from 'react-icons/fa'
import './index.css'

const JobCard = props => {
  const {each} = props

  return (
    <li className="Card">
      <Link to={`/jobs/${each.id}`} className="BgForDetailsOfJobs">
        <div className="companyLogoJobFlex">
          <div>
            <img
              className="CompanyLogo"
              src={each.companyLogo}
              alt="company logo"
            />
          </div>
          <div className="ratingFlexJob">
            <h1 className="job-title1">{each.title}</h1>

            <p className="job-title2">
              <FaStar className="star" color="#fbbf24" size={20} />

              {each.rating}
            </p>
          </div>
        </div>
        <div className="packageFlex">
          <div className="locationFlexJob">
            <div className="cont">
              <IoLocationOutline className="icon" />
              <p className="icon-text">{each.location}</p>
            </div>
            <div className="cont">
              <BsBriefcaseFill className="icon" />
              <p className="icon-text">{each.employmentType}</p>
            </div>
          </div>
          <p className="package">{each.packagePerAnnum}</p>
        </div>
        <hr className="seperator" />
        <h1 className="des">Description</h1>

        <p className="each-des">{each.jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
