'use client'

import React from 'react'



const IntlContext = React.createContext({
	fallback: 'en-US',
	lang: 'en-US',
})

export const IntlConsumer = IntlContext.Consumer
export function useIntl() {
	return React.useContext(IntlContext)
}

interface Props {
	children: React.ReactNode
	fallback: string
	lang: string
}

export const IntlProvider: React.FC<Props> = (props) => {
	const {
		children,
		fallback,
		lang,
	} = props

	React.useEffect(() => {
		document.documentElement.setAttribute('lang', lang)
	}, [lang])

	return <IntlContext.Provider value={{
		fallback,
		lang: lang,
	}}>
		{children}
	</IntlContext.Provider>
}
