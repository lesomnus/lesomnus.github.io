import React from 'react'

import { getBrandPalette } from '@/components/brand-palette'

type Props = React.HTMLAttributes<HTMLSpanElement> & {
	tags: string[]
}

export const TagBadges: React.FC<Props> = ({ className, tags, ...rest }) => {
	return <>{tags.map(tag => {
		const palette = getBrandPalette(tag) ?? { icon: undefined }

		return <span {...rest} key={tag} className={`badge ${className ?? ''}`}>
			{palette.icon && <palette.icon />} {tag}
		</span>
	})}</>
}
