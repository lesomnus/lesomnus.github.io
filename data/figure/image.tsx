import React from 'react'
import type { ImageProps as NextImageProps } from 'next/image'



type ImageProps
	= Pick<NextImageProps, 'src'>
	& {
		'dark-invert': boolean
	}
	& (
		{ caption: string } | { alt: string }
	)

export const Image: React.FC<ImageProps> = (props) => {
	let { src } = props

	if (typeof src !== 'string') {
		if ('default' in src) {
			src = src.default
		}

		src = src.src
	}

	const classNames: string[] = []
	if (props['dark-invert']) {
		classNames.push('dark-invert')
	}

	if ('alt' in props) {
		{ /* eslint-disable-next-line @next/next/no-img-element */ }
		return <img src={src} alt={props.alt} className={classNames.join(' ')} />
	}

	const { caption } = props
	return <figure className='grid grid-cols-1'>
		{/* eslint-disable-next-line @next/next/no-img-element */}
		<img src={src} alt={caption} className={classNames.join(' ')} />
		<figcaption>{caption}</figcaption>
	</figure>
}
