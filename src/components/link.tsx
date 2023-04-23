'use client'

import React from 'react'
import NextLink from 'next/link'

import { useIntl } from './intl'



function localePath(lang: string, path: string) {
	const entry = path.split('/')
	entry[0] = lang
	entry.unshift('')
	return entry.join('/')
}

const LinkContext = React.createContext('')

export const LinkUrl: React.FC = () => {
	const target = React.useContext(LinkContext)
	const [host, set_host] = React.useState('')
	React.useEffect(() => { set_host(window.location.host) }, [])
	return <>{host}{target}</>
}

type Props = React.HTMLAttributes<HTMLAnchorElement> & {
	children?: React.ReactNode
	lang?: string
	to: string
}

export const Link: React.FC<Props> = ({ children, lang, to, ...rest }) => {
	const { lang: lang_curr } = useIntl()
	const target = localePath(lang ?? lang_curr, to)

	return <NextLink {...rest} href={target}>
		<LinkContext.Provider value={target}>
			{children ?? <LinkUrl />}
		</LinkContext.Provider>
	</NextLink>
}
