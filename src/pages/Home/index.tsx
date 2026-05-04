import { useGetStaff } from './hooks'

// Components
import TableContainer from '../../components/step-up/containers/TableContainer'
import HandleLoading from '../../utils/HandleLoading'
import ErrorBoundary from '@/utils/ErrorBoundary'

function Home() {
  const { data, isLoading } = useGetStaff()

  return (
    <ErrorBoundary>
      <HandleLoading isLoading={isLoading}>
        <TableContainer staff={data?.data} />
      </HandleLoading>
    </ErrorBoundary>
  )
}

export default Home
