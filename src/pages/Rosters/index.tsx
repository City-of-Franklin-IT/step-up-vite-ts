import { useRedirectAfterLogin } from "@/helpers/hooks"
import { useGetRoster } from "./hooks"

// Components
import Layout from "@/components/layout/Layout"
import RosterContainer from "@/components/roster/containers/RosterContainer"
import HandleLoading from "@/utils/HandleLoading"

function Rosters() {
  useRedirectAfterLogin()

  const { data, isSuccess } = useGetRoster()

  return (
    <Layout>
      <HandleLoading isLoaded={isSuccess}>
        <RosterContainer rosters={data?.data} />
      </HandleLoading>
    </Layout>
  )
}

export default Rosters
