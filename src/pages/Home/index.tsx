import { useGetStaff } from './hooks'

// Components
import TableContainer from '../../components/step-up/containers/TableContainer'
import Loading from '@/components/loading/Loading'
import ErrorBoundary from '@/utils/ErrorBoundary'

function Home() {
  const { data, isLoading } = useGetStaff()

  if(isLoading) return <Loading />

  return (
    <ErrorBoundary>
      <TableContainer staff={data?.data} />
    </ErrorBoundary>
  )
}

export default Home
