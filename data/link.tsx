import React from 'react'



export interface Props {
	children?: React.ReactNode
	lang: string
	to: string
}

export const Link: React.FC<Props> = ({ children, lang, to }) => {
	return <a className='link' href={`/${lang}${to}`}>{children}</a>
}
