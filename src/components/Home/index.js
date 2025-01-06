import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => {
  const JwtToken = Cookies.get('jwt_token')

  if (JwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-cont">
        <h1 className="FindJobsHeading">Find The Job That Fits Your Life</h1>
        <p className="home-text">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>

        <Link to="/jobs">
          <button className="FindJobsButton" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}

export default Home
