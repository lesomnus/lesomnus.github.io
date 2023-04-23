import React from 'react'

import styles from './check-box.module.scss'



interface Props {
	children: React.ReactNode
	className?: string
	disabled?: boolean
	checked?: boolean
	onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export const CheckBox: React.FC<Props> = (props) => {
	const {
		children,
		className,
		checked,
		onChange,
	} = props

	return <label className={['btn', styles.checkBox, className].filter(v => v).join(' ')}>
		<input type="checkbox" checked={checked} onChange={onChange?.bind(this)} />
		{children}
	</label>
}
