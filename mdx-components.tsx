import React from 'react'
import type { MDXComponents } from 'mdx/types'

import styles from '@/styles/mdx.module.scss'



export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,
		a: ({ children, className, ...rest }) => <a {...rest} className={'link ' + (className ?? '')}>{children}</a>,
		ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
		code: ({ children }) => <code className={styles.code}>{children}</code>,
	}
}
