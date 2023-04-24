'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import { useIntl } from './intl'
import { Link } from './link'



export const IntlToggle: React.FC = () => {
	const pathname = usePathname()
	const { lang } = useIntl()
	const entries = pathname.split('/')

	const [lang_tgt, text_tgt, text_cur]
		= lang === 'en-US'
			? ['ko-KR', 'Ko', 'En']
			: ['en-US', 'En', 'Ko']

	entries.shift()
	entries[0] = ''
	return <Link className='w-5 text-center tooltip-target'
		lang={lang_tgt}
		to={entries.join('/')}
		replace={true}
	>
		<span className='font-bold underline'>{text_cur}</span>
		<span className='tooltip'>{lang_tgt === 'ko-KR' ? 'to Korean' : 'to English'}</span>
	</Link>
}
