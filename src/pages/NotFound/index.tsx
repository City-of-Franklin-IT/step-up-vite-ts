// Components
import ErrorHandler from "../../utils/Toast/ErrorHandler"

function NotFound() {
  return (
    <ErrorHandler 
      title={'404 nothin to see here..'}
      subtitle={'You will be redirected'} />
  )
}

export default NotFound