import React from 'react'

import styles from './hlist.module.scss'



type Props = React.HTMLAttributes<HTMLUListElement> & {
	children: React.ReactNode
}

export const HList: React.FC<Props> = (props: Props) => {
	const {
		children,
		className,
		...rest
	} = props

	return <ul {...rest} className={[styles.hlist, className].join(' ')}>
		{React.Children.map(children, (child, i) => (
			<li key={i}>{child}</li>
		))}
	</ul>
}
