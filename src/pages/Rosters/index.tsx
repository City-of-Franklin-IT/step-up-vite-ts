import { useRedirectAfterLogin } from "@/helpers/hooks"
import { useGetRoster } from "./hooks"

// Components
import RosterContainer from "@/components/roster/containers/RosterContainer"
import HandleLoading from "@/utils/HandleLoading"
import ErrorBoundary from "@/utils/ErrorBoundary"

function Rosters() {
  useRedirectAfterLogin()

  const { data, isLoading } = useGetRoster()

  return (
    <ErrorBoundary>
      <HandleLoading isLoading={isLoading}>
        <RosterContainer rosters={data?.data} />
      </HandleLoading>
    </ErrorBoundary>
  )
}

export default Rosters
