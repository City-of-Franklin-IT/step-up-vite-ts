import { useQuery } from 'react-query'
import { getStaff } from '../../context/App/AppActions'

// Components
import Layout from '../../components/layout/Layout/Layout'
import TableContainer from '../../components/table/TableContainer/TableContainer'

function Home() {
  const { data } = useQuery(['staff'], () => getStaff())

  return (
    <Layout>
      <TableContainer data={data?.data ?? []} />
    </Layout>
  )
}

export default Home
