import { useContext } from 'react'
import UserContext from '../../context/User/UserContext'
import { useValidateUser } from '../../helpers'
import { useGetStaff } from './hooks'

// Components
import Layout from '../../components/layout/Layout'
import TableContainer from '../../components/table/TableContainer'

function Home() {
  const { user, dispatch } = useContext(UserContext)

  const { data } = useGetStaff(user)

  useValidateUser(dispatch)

  return (
    <Layout>
      <TableContainer data={data?.data ?? []} />
    </Layout>
  )
}

export default Home
