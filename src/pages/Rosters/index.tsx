import { useRedirect } from "../Redirect/hooks"
import { useGetRoster } from "./hooks"

// Components
import Layout from "../../components/layout/Layout"
import RosterContainer from "../../components/roster/RosterContainer"
import HandleLoading from "../../utils/HandleLoading"

function Rosters() {
  useRedirect()
  
  const { data, isSuccess } = useGetRoster()

  return (
    <Layout>
      <HandleLoading isLoaded={isSuccess}>
        <RosterContainer rosters={data?.data || []} />
      </HandleLoading>
    </Layout>
  )
}

export default Rosters
