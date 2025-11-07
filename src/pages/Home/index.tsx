import { useRedirectAfterLogin } from '@/helpers/hooks'
import { useGetStaff } from './hooks'

// Components
import Layout from '../../components/layout/Layout'
import TableContainer from '../../components/step-up/containers/TableContainer'
import HandleLoading from '../../utils/HandleLoading'
import ErrorBoundary from '@/utils/ErrorBoundary'

function Home() {
  useRedirectAfterLogin()

  const { data, isSuccess } = useGetStaff()

  return (
    <Layout>
      <ErrorBoundary>
        <HandleLoading isLoaded={isSuccess}>
          <TableContainer staff={data?.data} />
        </HandleLoading>
      </ErrorBoundary>
    </Layout>
  )
}

export default Home
