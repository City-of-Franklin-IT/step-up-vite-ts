import { Suspense } from 'react'
import { useQuery } from 'react-query'
import { getStaff } from '../../context/App/AppActions'

// Components
import Layout from '../../components/layout/Layout/Layout'
import TableContainer from '../../components/table/TableContainer/TableContainer'

function Home() {
  const { data, isError, error } = useQuery(['staff'], () => getStaff(), { suspense: true })

  if(isError) {
    console.log(error)
  }

  return (
    <Layout>
      <Suspense fallback={<div>Loading..</div>}>
        <TableContainer data={data?.data ?? []} />
      </Suspense>
    </Layout>
  )
}

export default Home
