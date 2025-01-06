import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import {TiHome} from 'react-icons/ti'

import {BsBriefcaseFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const deleteUserCookie = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="header-cont">
      <Link to="/">
        <img
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>

      <ul className="HomeAndJobsSmallScreens">
        <Link className="HJ" to="/">
          <li className="HomeAndJobsStyleSmallScreens">
            <TiHome className="icon" color="white" size={30} />
          </li>
        </Link>

        <Link className="HJ" to="/jobs">
          <li className="HomeAndJobsStyleSmallScreens">
            <BsBriefcaseFill className="icon" color="white" size={30} />
          </li>
        </Link>
        <li className="HomeAndJobsStyleSmallScreens">
          <button
            onClick={deleteUserCookie}
            className="sm-LogoutButton"
            type="button"
          >
            <FiLogOut className="icon" color="white" size={30} />
          </button>
        </li>
      </ul>

      <ul className="HomeAndJobs">
        <Link className="HJ" to="/">
          <li className="HomeAndJobsStyle">Home</li>
        </Link>

        <Link className="HJ" to="/jobs">
          <li className="HomeAndJobsStyle">Jobs</li>
        </Link>
      </ul>
      <button
        onClick={deleteUserCookie}
        className="lg-LogoutButton"
        type="button"
      >
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
