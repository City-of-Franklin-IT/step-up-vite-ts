import { Suspense } from "react"
import { useQuery } from "react-query"
import { getRoster } from "../../context/App/AppActions"

// Components
import Layout from "../../components/layout/Layout/Layout"
import RosterContainer from "../../components/roster/RosterContainer/RosterContainer"

function Rosters() {
  const today = new Date()
  const todayStr = `${ today.getFullYear() }-${ today.getMonth() + 1 }-${ today.getDate() }`

  const { data, isError, error } = useQuery(['roster'], () => getRoster(todayStr))

  if(isError) {
    console.log(error)
  }

  return (
    <Layout>
      <RosterContainer data={data?.data ?? []} />
    </Layout>
  )
}

export default Rosters
