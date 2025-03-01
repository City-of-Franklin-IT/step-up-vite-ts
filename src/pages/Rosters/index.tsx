import { useGetRoster } from "./hooks"

// Components
import Layout from "../../components/layout/Layout"
import RosterContainer from "../../components/roster/RosterContainer"
import HandleLoading from "../../utils/HandleLoading"

function Rosters() {
  const { data, isSuccess } = useGetRoster()

  return (
    <Layout>
      <HandleLoading isLoaded={isSuccess}>
        <RosterContainer data={data?.data ?? []} />
      </HandleLoading>
    </Layout>
  )
}

export default Rosters
