export interface QualifiedBtnProps { // QualifiedBtn props
  type: Type | '',
  label: Type | 'Remove Filter'
}

type Type =
  | "Engineer"
  | "Lieutenant"
  | "Captain"
  | "BC"