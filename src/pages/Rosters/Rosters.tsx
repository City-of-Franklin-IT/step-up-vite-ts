import { useContext, useEffect } from "react"
import { useQuery, useQueryClient } from "react-query"
import AppContext from "../../context/App/AppContext"
import { getRoster } from "../../context/App/AppActions"

// Components
import Layout from "../../components/layout/Layout/Layout"
import RosterContainer from "../../components/roster/RosterContainer/RosterContainer"

function Rosters() {
  const { date } = useContext(AppContext)

  const queryClient = useQueryClient()

  const today = new Date()
  const todayStr = `${ today.getFullYear() }-${ today.getMonth() + 1 }-${ today.getDate() }`

  const { data } = useQuery(['roster', date ? date : todayStr], () => getRoster(date ? date : todayStr))

  useEffect(() => { // Invalidate query on date change
    if(date) {
      queryClient.invalidateQueries(['roster', date])
    }
  }, [date])

  return (
    <Layout>
      <RosterContainer data={data?.data ?? []} />
    </Layout>
  )
}

export default Rosters
