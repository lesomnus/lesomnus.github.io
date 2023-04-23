import React from 'react'

import { IntlProvider } from '@/components/clients'
import '@/styles/globals.scss'



interface Props {
	children: React.ReactNode
	params: { lang: string }
}

const Layout: React.FC<Props> = ({ children, params }) => {
	const { lang } = params
	return <>
		<IntlProvider fallback='en-US' lang={lang} >
			{children}
		</IntlProvider>
	</>
}

export default Layout
