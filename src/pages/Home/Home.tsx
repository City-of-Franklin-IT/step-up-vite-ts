import { useContext } from 'react'
import UserContext from '../../context/User/UserContext'
import { useValidateUser } from '../../helpers'
import { useGetStaff } from '.'

// Components
import Layout from '../../components/layout/Layout/Layout'
import TableContainer from '../../components/table/TableContainer/TableContainer'

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
