import React from 'react'



interface Props {
	children: React.ReactNode
}

export const Excerpt: React.FC<Props> = ({ children }) => {
	return <>{children}</>
}

// TODO: is it safe?
export function isExcerpt(v: object): v is React.ReactElement<Props> {
	if (!('type' in v)) {
		return false
	}
	if (typeof v.type !== 'function') {
		return false
	}

	return v.type.name === Excerpt.name
}
