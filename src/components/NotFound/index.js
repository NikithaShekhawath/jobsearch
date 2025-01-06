import './index.css'

const NotFound = () => (
  <div className="err-cont">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
    />
    <h1 className="err-h">Page Not Found</h1>
    <p className="err-p">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
