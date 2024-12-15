import { useContext, useEffect } from "react"
import { useQueryClient } from "react-query"
import AppContext from "../../context/App/AppContext"
import UserContext from "../../context/User/UserContext"
import { useValidateUser } from "../../helpers"
import { useGetRoster } from "./hooks"

// Components
import Layout from "../../components/layout/Layout/Layout"
import RosterContainer from "../../components/roster/RosterContainer/RosterContainer"

function Rosters() {
  const { date } = useContext(AppContext)
  const { dispatch } = useContext(UserContext)

  const queryClient = useQueryClient()

  const { data } = useGetRoster(date)

  useValidateUser(dispatch)

  useEffect(() => { // Invalidate query on date change
    if(date) {
      queryClient.invalidateQueries(['roster', date])
    }
  }, [date, queryClient])

  return (
    <Layout>
      <RosterContainer data={data?.data ?? []} />
    </Layout>
  )
}

export default Rosters
