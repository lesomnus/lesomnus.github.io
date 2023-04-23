import React from 'react'
import type { Dayjs } from 'dayjs'

import { HList } from '@/components/servers'
import { DateRange } from '@/types'

import {
	education,
	award,
	publication,
	work_experience,
} from '@data/index'
import * as exp from '@data/exp'

import { NameCard } from './name-card'
import { ExpFilter, ExpFilterItem } from './exp-filter'
import { ExpItem } from './exp-item'



interface Props {
	params: { lang: string }
}

const Page = async (props: Props) => {
	const { lang } = props.params

	return <>
		<NameCard lang={lang} />

		<Article title="Work Experience">
			{work_experience.map((v, i) => {
				const c = v[lang] ?? v['en-US']
				return <section className='break-inside-avoid' key={i}>
					<SectionHeader
						title={`${c.title} at ${c.company_name}`}
						date={c.date} />
					<HList className='text-sm'>
						{c.activities.map((v, i) => <span key={i}>{v}</span>)}
					</HList>
				</section>
			})}
		</Article>

		<Article title="Education">
			{education.map((v, i) => {
				const c = v[lang] ?? v['en-US']
				return <section className='break-inside-avoid' key={i}>
					<SectionHeader
						title={c.title}
						date={c.date} />
					<HList className='text-sm'>
						<span>{c.placename}</span>
						<span className='whitespace-nowrap'>{`GPA ${c.gpa.val}/${c.gpa.max}`}</span>
						<span>{c.note}</span>
					</HList>
				</section>
			})}
		</Article>

		<Article title="Honors and Awards">
			{award.map((v, i) => {
				const c = v[lang] ?? v['en-US']
				return <section className='break-inside-avoid' key={i}>
					<SectionHeader
						title={c.title}
						date={c.date}
						format='YYYY'
					/>
					<p>{c.given_by}</p>
				</section>
			})}
		</Article>

		<Article title="Publications">
			{publication.map((v, i) => {
				const c = v[lang] ?? v['en-US']
				return <section className='break-inside-avoid' key={i}>
					<header>
						<p className="font-light text-sm">{c.authors.join(', ')}</p>
						<h3 className="leading-tight">{c.title}</h3>
					</header>
					<p>
						{`${c.part_of}, ${c.date.from.year()}. `}
						{c.pp && <small className="text-sub ml-1 whitespace-nowrap">{`pp.${c.pp.from}-${c.pp.to}. `}</small>}
						{c.doi && <a href={`https://doi.org/${c.doi}`} className='text-sub hover:underline ml-1'><small>{`${c.doi}. `}</small></a>}
					</p>
				</section>
			})}
		</Article>

		<Article title="Experience" className='break-before-page'>
			<ExpFilter>
				{(await exp.list(lang)).sort((lhs, rhs) => rhs.date.diff(lhs.date)).map((entry) => {
					const { slug, lang, date, tags } = entry
					return <ExpFilterItem key={slug} lang={lang} year={date.year()} tags={tags}>
						<ExpItem entry={entry} />
					</ExpFilterItem>
				})}
			</ExpFilter>
		</Article>
	</>
}

export default Page



const Article: React.FC<{
	children: React.ReactNode
	title: string
	className?: string
}> = ({ children, title, ...rest }) => {
	return <article {...rest}>
		<header>
			<h2 className="leading-snug" style={{ fontVariant: 'small-caps' }}>{title}</h2>
		</header>
		<hr />
		<div>
			{children}
		</div>
	</article>
}

function asTimeEl(date: Dayjs, format: string): React.ReactElement {
	return <time dateTime={date.format('YYYY-MM-DD')}>{date.format(format)}</time>
}

const SectionHeader: React.FC<{
	title: React.ReactNode
	date: DateRange
	format?: string
}> = ({ title, date, format }) => {
	const period = date.from.isSame(date.to)
		? asTimeEl(date.from, format ?? 'YYYY')
		: <>
			{asTimeEl(date.from, format ?? 'YYYY.MM.DD')}
			<span className="mx-1">{'~'}</span>
			{date.to ? asTimeEl(date.to, format ?? 'YYYY.MM.DD') : 'present'}
		</>

	return <header className="flex max-sm:flex-col-reverse justify-between items-start gap-x-2">
		<h3 className="text-lg font-bold">{title}</h3>
		<small className="inline-flex text-sub max-sm:mt-0 mt-2">
			{period}
		</small>
	</header>
}



export function generateStaticParams() {
	return [
		{ lang: 'en-US' },
		{ lang: 'ko-KR' },
	]
}
