import React from 'react'


interface Props {
	src: string
}

export const Video: React.FC<Props> = (props) => {
	const { src } = props
	return <video className='grid grid-cols-1' controls>
		<source src={src} />
	</video>
}
