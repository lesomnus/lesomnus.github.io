'use client'

import React from 'react'

interface Props {
	className?: string
	children: React.ReactNode
	value: string
}


export const Clipboard: React.FC<Props> = ({ className, children, value }) => {
	const [copied, set_copied] = React.useState(false)

	return <span className={`tooltip-target ${className ?? ''}`}
		onClick={() => {
			navigator.clipboard.writeText(value)
			set_copied(true)
		}}
		onMouseOut={() => set_copied(false)}
	>
		{children}
		<span className='tooltip'>{copied ? 'copied!' : 'click to copy'}</span>
	</span>
}
