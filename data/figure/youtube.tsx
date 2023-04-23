import React from 'react'



interface YouTubProps {
	code: string
	caption: string
}

export const YouTube: React.FC<YouTubProps> = ({ code, caption }) => {
	return <figure>
		<iframe style={{ width: '100%', aspectRatio: 16 / 9 }}
			src={`https://www.youtube.com/embed/${code}`}
			allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
			allowFullScreen></iframe>
		<figcaption>{caption}</figcaption>
	</figure>
}
