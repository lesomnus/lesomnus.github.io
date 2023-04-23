'use client'

import React from 'react'
import { usePathname } from 'next/navigation'



const HistoryContext = React.createContext<string | undefined>(undefined)

export const HistoryConsumer = HistoryContext.Consumer
export function useHistory() {
	return React.useContext(HistoryContext)
}

interface Props {
	children: React.ReactNode
}

interface State {
	curr: string
	prev?: string
}

const HistoryProvider_: React.FC<Props> = ({ children }) => {
	const pathname = usePathname()
	const [history, set_history] = React.useState<State>({
		curr: pathname,
		prev: undefined,
	})

	React.useEffect(() => {
		if (history.curr === pathname) {
			return
		}

		set_history({
			curr: pathname,
			prev: history.curr,
		})
	}, [pathname, history.curr])

	return <HistoryContext.Provider value={history.prev}>
		{children}
	</HistoryContext.Provider>
}

export const HistoryProvider = React.memo(HistoryProvider_)
