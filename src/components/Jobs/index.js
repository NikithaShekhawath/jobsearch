import {Component} from 'react'
import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import JobCard from '../JobCard'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstanst = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  load: 'LOADER',
}

class Jobs extends Component {
  state = {
    checkingProfileData: apiStatusConstanst.initial,
    profileDetails: {},
    searchInput: '',
    totalJobs: [],
    radioInput: '',
    employmentType: [],
    checkingJobData: apiStatusConstanst.initial,
  }

  componentDidMount() {
    this.getProfileData()

    this.getJobsData()
  }

  getProfileData = async () => {
    this.setState({CheckingProfileData: apiStatusConstanst.load})
    const jwtToken = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const DataFetching = await fetch(profileUrl, options)
    const DetailsOfUser = await DataFetching.json()
    console.log(DetailsOfUser)

    if (DataFetching.ok) {
      const updatedProfile = {
        name: DetailsOfUser.profile_details.name,
        bio: DetailsOfUser.profile_details.short_bio,
        profileImg: DetailsOfUser.profile_details.profile_image_url,
      }

      this.setState({
        profileDetails: updatedProfile,
        checkingProfileData: apiStatusConstanst.success,
      })
    } else {
      this.setState({checkingProfileData: apiStatusConstanst.failure})
    }
  }

  getJobsData = async () => {
    this.setState({checkingJobData: apiStatusConstanst.initial})

    const {searchInput, radioInput, employmentType} = this.state
    console.log(employmentType)
    const employmentTypeString = employmentType.join()
    console.log(employmentTypeString)
    const jwtToken = Cookies.get('jwt_token')
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeString}&minimum_package=${radioInput}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const FetchingJobsDetails = await fetch(jobsUrl, options)
    console.log(FetchingJobsDetails)
    const DetailsOfJobs = await FetchingJobsDetails.json()
    console.log(DetailsOfJobs)

    if (FetchingJobsDetails.ok) {
      const jobsDataAll = DetailsOfJobs.jobs.map(each => ({
        packagePerAnnum: each.package_per_annum,
        companyLogo: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        totalJobs: jobsDataAll,
        checkingJobData: apiStatusConstanst.success,
      })
    } else {
      this.setState({checkingJobData: apiStatusConstanst.failure})
    }
  }

  loaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  successViewProfile = () => {
    const {profileDetails} = this.state
    const {name, bio, profileImg} = profileDetails
    console.log(profileDetails)
    return (
      <div className="CardOfUser">
        <img className="imageOfUser" src={profileImg} alt="profile" />

        <h1 className="UserName">{name}</h1>
        <p className="Description">{bio}</p>
      </div>
    )
  }

  failureViewProfile = () => {
    console.log('err')
    return (
      <div className="retry-view">
        <button type="button" onClick={this.getProfileData} className="retry">
          Retry
        </button>
      </div>
    )
  }

  profileChecking = () => {
    const {checkingProfileData} = this.state

    switch (checkingProfileData) {
      case apiStatusConstanst.success:
        return this.successViewProfile()
      case apiStatusConstanst.failure:
        return this.failureViewProfile()
      case apiStatusConstanst.load:
        return this.loaderView()
      default:
        return null
    }
  }

  DataNotFound = () => (
    <div className="err-cont">
      <img
        className="err-img"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        alt="no jobs"
      />
      <h1 className="err-h">No Jobs Found</h1>
      <p className="err-p">We could not find any jobs. Try other filters</p>
    </div>
  )

  renderSuccessView = () => {
    const {totalJobs} = this.state
    return (
      <>
        {totalJobs.length > 0 ? (
          <ul className="job-list">
            {totalJobs.map(each => (
              <JobCard each={each} key={each.id} />
            ))}
          </ul>
        ) : (
          this.DataNotFound()
        )}
      </>
    )
  }

  failureView = () => (
    <div className="err-cont">
      <img
        className="err-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />

      <h1 className="err-h">Oops! Something Went Wrong</h1>
      <p className="err-p">
        We cannot seem to find the page you are looking for
      </p>
      <button onClick={this.getJobsData} type="button" className="retry">
        Retry
      </button>
    </div>
  )

  dataChecking = () => {
    const {checkingJobData} = this.state
    switch (checkingJobData) {
      case apiStatusConstanst.success:
        return this.renderSuccessView()
      case apiStatusConstanst.failure:
        return this.failureView()
      case apiStatusConstanst.load:
        return this.loaderView()
      default:
        return null
    }
  }

  selectEmployType = event => {
    const {employmentType} = this.state

    if (employmentType.includes(event.target.id)) {
      const filterData = employmentType.filter(each => each !== event.target.id)
      this.setState(
        {
          employmentType: filterData,
        },
        this.getJobsData,
      )
    } else {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, event.target.id],
        }),
        this.getJobsData,
      )
    }
  }

  changeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  searchInputDown = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  buttonSearch = () => {
    this.getJobsData()
  }

  RadioChange = event => {
    this.setState({radioInput: event.target.id}, this.getJobsData)
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobs-page-cont">
        <Header />
        <div className="job-page">
          <div className="section-1">
            <div className="sm-searchBar">
              <input
                className="inputSearch"
                onChange={this.changeInput}
                type="search"
                placeholder="Search"
                value={searchInput}
                onKeyDown={this.searchInputDown}
              />
              <button
                className="ButtonSearch"
                onClick={this.buttonSearch}
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" size={18} color="#f1f5f9" />
              </button>
            </div>
            {this.profileChecking()}
            <hr className="seperator" />
            <h1 className="filter-heading">Type of Employment</h1>
            <div>
              <ul className="Ul">
                {employmentTypesList.map(each => (
                  <li key={each.employmentTypeId} className="filter-item">
                    <input
                      onChange={this.selectEmployType}
                      value={each.label}
                      type="checkbox"
                      id={each.employmentTypeId}
                    />
                    <label htmlFor={each.employmentTypeId} className="label">
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="seperator" />
            <div>
              <h1 className="filter-heading">Salary Range</h1>
              <ul className="Ul">
                {salaryRangesList.map(each => (
                  <li key={each.salaryRangeId} className="filter-item">
                    <input
                      id={each.salaryRangeId}
                      value={each.label}
                      type="radio"
                      onChange={this.RadioChange}
                      name="salary-radio"
                    />
                    <label htmlFor={each.salaryRangeId} className="label">
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="section-2">
            <div className="lg-searchBar">
              <input
                className="inputSearch"
                onChange={this.changeInput}
                type="search"
                placeholder="Search"
                value={searchInput}
                onKeyDown={this.searchInputDown}
              />
              <button
                className="ButtonSearch"
                onClick={this.buttonSearch}
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" size={18} color="#f1f5f9" />
              </button>
            </div>
            {this.dataChecking()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
