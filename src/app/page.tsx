import React from 'react'

import Page from '@/app/[lang]/page'
import { Redirect } from '@/app/redirect'



const PageWithLang = () => {
	return <>
		<Redirect />
		{/* @ts-expect-error Async Server Component */}
		<Page params={{ lang: 'en-US' }} />
	</>
}

export default PageWithLang
