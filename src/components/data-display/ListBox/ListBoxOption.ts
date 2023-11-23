export type ListBoxAction = (event: { preventDefault: () => void; data: ListBoxOption }) => any
export type ListBoxOption = { name: string; value: any; action: ListBoxAction }
