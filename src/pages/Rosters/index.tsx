import { useRedirectAfterLogin } from "@/helpers/hooks"
import { useGetRoster } from "./hooks"

// Components
import RosterContainer from "@/components/roster/containers/RosterContainer"
import Loading from "@/components/loading/Loading"
import ErrorBoundary from "@/utils/ErrorBoundary"

function Rosters() {
  useRedirectAfterLogin()
  const { data, isLoading } = useGetRoster()

  if(isLoading) return <Loading />

  return (
    <ErrorBoundary>
      <RosterContainer rosters={data?.data} />
    </ErrorBoundary>
  )
}

export default Rosters
