'use client'

import React from 'react'

import * as config from '@/config'



export const Bookmark: React.FC<{ value: string }> = ({ value }) => {
	React.useEffect(() => {
		window.localStorage.setItem(config.LS_KEY_EXP_LAST_SLUG, value)
	})
	return <></>
}
