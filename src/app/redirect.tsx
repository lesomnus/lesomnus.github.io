'use client'

import React from 'react'
import { useRouter } from 'next/navigation'



export const Redirect: React.FC = () => {
	const router = useRouter()
	React.useEffect(() => {
		const lang_tgt = window.navigator.language.startsWith('ko')
			? 'ko-KR'
			: 'en-US'

		router.push(`/${lang_tgt}`)
	})

	return <></>
}
