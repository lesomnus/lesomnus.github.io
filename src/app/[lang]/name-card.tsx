import React from 'react'
import { VscGithubAlt, VscMail } from 'react-icons/vsc'

import { HList } from '@/components/servers'
import { Clipboard, IntlToggle, ThemeToggle } from '@/components/clients'
import styles from './name-card.module.scss'

interface Props {
	lang: string
}

export const NameCard: React.FC<Props> = ({ lang }) => {
	let display = 'Seunghyun Hwang'
	let sub = ''

	if (lang == 'ko-KR') {
		sub = display
		display = '황승현'
	}

	return <header className={styles['name-card']}>
		<h1>{display}</h1>
		<p className="h-6 font-bold">{sub}</p>
		<HList className='svg-icon-cheat hidden print:block'>
			<span>
				<VscGithubAlt />
				<span className="pl-1">lesomnus</span>
			</span>
			<span>
				<VscMail />
				<span className='pl-1'>lesomnus@gmail.com</span>
			</span>
		</HList>
		<HList className='svg-icon-cheat print:hidden'>
			<IntlToggle />
			<ThemeToggle />
			<a href="https://github.com/lesomnus" target='_blank'>
				<VscGithubAlt />
				<span className="pl-1">lesomnus</span>
			</a>
			<Clipboard value='lesomnus@gmail.com'>
				<a className="cursor-pointer">
					<VscMail />
					<span className='pl-1'>lesomnus@gmail.com</span>
				</a>
			</Clipboard>
		</HList>
	</header>
}
