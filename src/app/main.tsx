'use client'

import React from 'react'

import { useTheme } from '@/components'
import styles from '@/styles/mdx.module.scss'



interface Props {
	children: React.ReactNode
}

export const Main: React.FC<Props> = ({ children }) => {
	const { is_dark } = useTheme()

	React.useEffect(() => {
		document.documentElement.classList[is_dark ? 'add' : 'remove']('dark')
	}, [is_dark])

	return <main className={['max-w-3xl', 'p-3', 'mx-auto', styles.noop].join(' ')}>
		{children}
	</main>
}
