'use client'

import React from 'react'
import { IoSunnyOutline, IoMoon } from 'react-icons/io5'



// Current implementation of theme control assumes there is only one context in app.

const ThemeContext = React.createContext({
	is_dark: false,
	toggle: () => { },
})

export const ThemeConsumer = ThemeContext.Consumer
export function useTheme() {
	return React.useContext(ThemeContext)
}

interface Props {
	children: React.ReactNode
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
	const [is_dark, set_dark] = React.useState(false)
	React.useEffect(() => {
		const value = window.localStorage.getItem('dark')
		if (typeof value === 'string') {
			set_dark(value === 'true')
		} else {
			set_dark(window.matchMedia('(prefers-color-scheme: dark)').matches)
		}
	}, [])


	return <ThemeContext.Provider value={{
		is_dark,
		toggle: () => {
			const tgt = !is_dark
			window.localStorage.setItem('dark', JSON.stringify(tgt))
			set_dark(tgt)
		},
	}}>
		{children}
	</ThemeContext.Provider>
}


export const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
	const { toggle } = useTheme()
	return <span onClick={() => toggle()} className={`inline-block cursor-pointer ${className ?? ''}`}>
		<span className='dark-none'><IoSunnyOutline /></span>
		<span className='dark-block'><IoMoon /></span>
	</span>
}
