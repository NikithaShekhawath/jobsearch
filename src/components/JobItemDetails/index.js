import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaStar, FaShareSquare} from 'react-icons/fa'

import Header from '../Header'

import SimilarJobs from '../SimilarJobs'

import './index.css'

const statusForJobs = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADER',
}

class JobItemDetails extends Component {
  state = {
    statusForJobsSession: 'initial',
    jobCard: {},
    skill: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.dataForEachJobFinding()
  }

  dataForEachJobFinding = async () => {
    this.setState({statusForJobsSession: statusForJobs.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    const urlData = `https://apis.ccbp.in/jobs/${id}`

    const optionsJobs = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const fetchingJobs = await fetch(urlData, optionsJobs)
    console.log(fetchingJobs)
    const fetchingInJson = await fetchingJobs.json()
    console.log(fetchingInJson)

    if (fetchingJobs.ok) {
      this.setState({
        statusForJobsSession: statusForJobs.success,
      })
      const dataCollecting = {
        description: fetchingInJson.job_details.job_description,
        companyLogo: fetchingInJson.job_details.company_logo_url,
        title: fetchingInJson.job_details.title,
        rating: fetchingInJson.job_details.rating,
        location: fetchingInJson.job_details.location,
        employType: fetchingInJson.job_details.employment_type,
        package: fetchingInJson.job_details.package_per_annum,
        lifeAt: fetchingInJson.job_details.life_at_company.description,
        imageLifeAt: fetchingInJson.job_details.life_at_company.image_url,
        companyWebSite: fetchingInJson.job_details.company_website_url,
        id: fetchingInJson.job_details.id,
      }
      const similardataCollecting = fetchingInJson.similar_jobs.map(each => ({
        description: each.job_description,
        companyLogo: each.company_logo_url,
        title: each.title,
        rating: each.rating,
        location: each.location,
        employType: each.employment_type,
        id: each.id,
      }))

      console.log(similardataCollecting)

      const skillForJob = fetchingInJson.job_details.skills.map(each => ({
        name: each.name,
        imageSkill: each.image_url,
        id: each.name,
      }))

      this.setState({
        jobCard: dataCollecting,
        skill: skillForJob,
        similarJobs: similardataCollecting,
      })
    } else {
      this.setState({statusForJobsSession: statusForJobs.failure})
    }
  }

  loaderViewJobs = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  successViewJobs = () => {
    const {jobCard, skill, similarJobs} = this.state
    console.log(similarJobs)

    return (
      <div className="DetailsOfSingleJob">
        <div className="detailsOfSmallScreens">
          <div className="companyLogoJobFlex">
            <div>
              <img
                className="CompanyLogo"
                src={jobCard.companyLogo}
                alt="job details company logo"
              />
            </div>
            <div className="ratingFlexJob">
              <h1 className="job-title1">{jobCard.title}</h1>
              <p className="job-title2">
                <FaStar className="star" color="#fbbf24" size={20} />

                {jobCard.rating}
              </p>
            </div>
          </div>
          <div className="packageFlex">
            <div className="locationFlexJob">
              <div className="cont">
                <IoLocationOutline className="icon" />
                <p className="icon-text">{jobCard.location}</p>
              </div>
              <div className="cont">
                <BsBriefcaseFill className="icon" />
                <p className="icon-text">{jobCard.employType}</p>
              </div>
            </div>
            <div>
              <p className="package">{jobCard.package}</p>
            </div>
          </div>
          <hr className="seperator" />
          <div className="DiscriptionFlex">
            <h1 className="desc">Description</h1>
            <div className="Visit">
              <a className="anchor" href={jobCard.companyWebSite}>
                Visit
              </a>

              <FaShareSquare className="share" color="#6366f1" />
            </div>
          </div>
          <p className="each-des">{jobCard.description}</p>

          <h1 className="desc">Skills</h1>
          <div className="flexingJobsSkills">
            {skill.map(each => (
              <div className="eachSkill" key={each.id}>
                <img
                  className="ImageOfEachSkill"
                  src={each.imageSkill}
                  alt={each.name}
                />
                <p className="eachSkillPara">{each.name}</p>
              </div>
            ))}
          </div>
          <div className="LifeAtFlex">
            <div className="LifeAtCompany">
              <h1 className="desc">Life at Company</h1>
              <p className="each-des">{jobCard.lifeAt}</p>
            </div>
            <div>
              <img
                className="lifeAtCompanySmallScreens"
                src={jobCard.imageLifeAt}
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className="SimilarJobsHeadingSmallScreens">Similar Jobs</h1>
          <ul className="ul-similar">
            {similarJobs.map(each => (
              <SimilarJobs eachElement={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  failureViewJobs = () => (
    <div className="err-cont">
      <div>
        <img
          className="err-img"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
      </div>
      <h1 className="err-h">Oops! Something Went Wrong</h1>
      <p className="err-p">
        We cannot seem to find the page you are looking for
      </p>
      <button
        onClick={this.dataForEachJobFinding}
        type="button"
        className="retry"
      >
        Retry
      </button>
    </div>
  )

  conditionCheckingForJobs = () => {
    const {statusForJobsSession} = this.state

    switch (statusForJobsSession) {
      case 'SUCCESS':
        return this.successViewJobs()
      case 'FAILURE':
        return this.failureViewJobs()
      case 'LOADER':
        return this.loaderViewJobs()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bgJobItemDetail">
        <Header />

        {this.conditionCheckingForJobs()}
      </div>
    )
  }
}
export default JobItemDetails
