import { useRedirect } from '../Redirect/hooks'
import { useGetStaff } from './hooks'

// Components
import Layout from '../../components/layout/Layout'
import TableContainer from '../../components/table/TableContainer'
import HandleLoading from '../../utils/HandleLoading'

function Home() {
  useRedirect()

  const { data, isSuccess } = useGetStaff()

  return (
    <Layout>
      <HandleLoading isLoaded={isSuccess}>
        <TableContainer staff={data?.data || []} />
      </HandleLoading>
    </Layout>
  )
}

export default Home
