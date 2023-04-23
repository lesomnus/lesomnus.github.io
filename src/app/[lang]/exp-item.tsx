import React from 'react'

import { TagBadges, getBrandPalette } from '@/components/servers'
import { Link, LinkUrl } from '@/components/clients'
import { ExpEntry } from '@data/exp'

import styles from './exp-item.module.scss'



const RefBadges: React.FC<Pick<ExpEntry, 'refs'>> = ({ refs }) => {
	return <>{refs.map((ref, i) => {
		switch (ref.kind) {
			case 'GitHub': {
				const palette = getBrandPalette('GitHub')
				if (palette === undefined) {
					return <></>
				}

				return <a href={`https://github.com/${ref.repo}`} key={i} className='badge-link' target='_blank'>
					{palette.icon && <palette.icon />} {ref.repo}
				</a>
			}

			default: return <></>
		}
	})}</>
}

export const ExpItem: React.FC<{ entry: ExpEntry }> = ({ entry: {
	slug,
	title,
	sub,
	tags,
	refs,
	excerpt,
	has_more,
} }) => {
	const children = excerpt
	if (has_more) {
		const i = children.findLastIndex(v => React.isValidElement(v) && v.type === 'p')
		if (i >= 0) {
			const child = children[i]
			children[i] = <div className={styles['read-more']} key={child.key}>
				{child}
				<Link to={`/exp/${slug}`} className='link whitespace-nowrap print:hidden'>...read more</Link>
			</div>
		}
	}

	return <>
		<header>
			<Link to={`/exp/${slug}`}>
				<h3 className="link-target break-keep">{title}</h3>
				<p className="empty:hidden font-light break-keep">{sub}</p>
			</Link>
			<div className="inline-flex flex-wrap gap-1 text-sm mt-2">
				<TagBadges tags={tags} />
				<RefBadges refs={refs} />
			</div>
		</header>
		<p className='hidden print:block mt-1'>
			Read full content at — <Link to={`/exp/${slug}`} className='link break-keep inline' />
		</p>
		<div className="text-justify mt-1">
			{children}
		</div>
	</>
}

