import { useGetStaff } from './hooks'

// Components
import Layout from '../../components/layout/Layout'
import TableContainer from '../../components/table/TableContainer'
import HandleLoading from '../../utils/HandleLoading'

function Home() {
  const { data, isSuccess } = useGetStaff()

  return (
    <Layout>
      <HandleLoading isLoaded={isSuccess}>
        <TableContainer data={data?.data ?? []} />
      </HandleLoading>
    </Layout>
  )
}

export default Home
