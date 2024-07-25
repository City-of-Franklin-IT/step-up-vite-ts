// Types
import { Dispatch, SetStateAction } from "react"
import { TableContainerState } from "../../table/TableContainer/types"

export interface SearchProps {
  searchValue: string,
  setSearchValue: Dispatch<SetStateAction<TableContainerState>>
}