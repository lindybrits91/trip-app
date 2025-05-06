import './ErrorPage.css';

import issueLoadingIcon from './assets/issue-loading.png';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <img src={issueLoadingIcon} className="centered-image" />
      <h1>Sorry, something went wrong!</h1>
    </div>
  );
};

export default ErrorPage;
