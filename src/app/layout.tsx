import React from 'react'
import Script from 'next/script'

import { HistoryProvider, ThemeProvider } from '@/components/clients'
import { Main } from '@/app/main'
import '@/styles/globals.scss'



interface Props {
	children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
	return <html lang='en-US'>
		<head>
			<title>CV Seunghyun Hwang</title>
			<Script id="theme" strategy="beforeInteractive">{`
				(()=>{
					// Initial theme resolve before React render.
					const is_dark = (()=>{
						const value = window.localStorage.getItem('dark')
						if (typeof value === 'string') {
							return value === 'true'
						}

						return window.matchMedia('(prefers-color-scheme: dark)').matches
					})();

					document.documentElement.classList[is_dark ? 'add' : 'remove']('dark')
				})();
			`}</Script>
		</head>
		<body>
			<ThemeProvider>
				<Main>
					<HistoryProvider>
						{children}
					</HistoryProvider>
				</Main>
			</ThemeProvider>
		</body>
	</html>
}

export default Layout
