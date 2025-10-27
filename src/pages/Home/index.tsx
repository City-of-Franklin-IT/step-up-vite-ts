import { useRedirectAfterLogin } from '@/helpers/hooks'
import { useGetStaff } from './hooks'

// Components
import Layout from '../../components/layout/Layout'
import TableContainer from '../../components/step-up/containers/TableContainer'
import HandleLoading from '../../utils/HandleLoading'

function Home() {
  useRedirectAfterLogin()

  const { data, isSuccess } = useGetStaff()

  return (
    <Layout>
      <HandleLoading isLoaded={isSuccess}>
        <TableContainer staff={data?.data} />
      </HandleLoading>
    </Layout>
  )
}

export default Home
