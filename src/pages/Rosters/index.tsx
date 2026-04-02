import { useRedirectAfterLogin } from "@/helpers/hooks"
import { useGetRoster } from "./hooks"

// Components
import Layout from "@/components/layout/Layout"
import RosterContainer from "@/components/roster/containers/RosterContainer"
import HandleLoading from "@/utils/HandleLoading"
import ErrorBoundary from "@/utils/ErrorBoundary"

function Rosters() {
  useRedirectAfterLogin()

  const { data, isLoading } = useGetRoster()

  return (
    <Layout>
      <ErrorBoundary>
        <HandleLoading isLoading={isLoading}>
          <RosterContainer rosters={data?.data} />
        </HandleLoading>
      </ErrorBoundary>
    </Layout>
  )
}

export default Rosters
