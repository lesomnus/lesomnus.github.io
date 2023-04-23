'use client'

import React from 'react'
import Color from 'color'
import dayjs from 'dayjs'

import * as config from '@/config'
import { CheckBox, HistoryConsumer, Link } from '@/components/clients'
import { HList, getBrandPalette } from '@/components/servers'
import styles from './exp-filter.module.scss'


const LS_FILTER_KEY = 'exp-filter-enabled'
const TAGS_RECOMMENDED = ['Pinned', 'Awarded', 'Published', 'Work']

interface ExpFilterItemProps {
	children: React.ReactNode
	lang: string
	year: number
	tags: string[]
}

export const ExpFilterItem: React.FC<ExpFilterItemProps> = ({ children }) => <>{children}</>

interface Props {
	children: React.ReactElement<ExpFilterItemProps>[]
}

interface State {
	tags: Record<string, number>
	tags_enabled: Set<string>
	slug_last: string | null
	is_scrolled: boolean
}

export class ExpFilter extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)

		const tags: Record<string, number> = {}
		for (const child of props.children) {
			for (const tag of child.props.tags) {
				if (tag in tags) {
					tags[tag]++
				} else {
					tags[tag] = 1
				}
			}
		}

		this.state = {
			tags,
			tags_enabled: new Set(TAGS_RECOMMENDED),
			slug_last: null,
			is_scrolled: false,
		}
	}

	componentDidMount(): void {
		const tags_enabled_ = window.localStorage.getItem(LS_FILTER_KEY)
		const tags_enabled = tags_enabled_ === null
			? new Set(TAGS_RECOMMENDED)
			: new Set(JSON.parse(tags_enabled_) as string[])

		const slug_last = window.localStorage.getItem(config.LS_KEY_EXP_LAST_SLUG)

		this.setState({ tags_enabled, slug_last })

	}

	componentDidUpdate(): void {
		const { tags_enabled } = this.state
		if (tags_enabled.size === 0) {
			window.localStorage.removeItem(LS_FILTER_KEY)
		} else {
			const tags_enabled_ = Array.from(tags_enabled)
			window.localStorage.setItem('exp-filter-enabled', JSON.stringify(tags_enabled_))
		}
	}

	reset() {
		window.localStorage.removeItem(LS_FILTER_KEY)
		this.setState({
			tags_enabled: new Set(TAGS_RECOMMENDED),
		})
	}

	render(): React.ReactNode {
		const { children } = this.props
		const { tags, tags_enabled, slug_last } = this.state

		const tags_sorted = Object.keys(tags).sort();
		[...TAGS_RECOMMENDED].reverse().forEach(v => {
			const i = tags_sorted.indexOf(v)
			tags_sorted.splice(i, 1)
			tags_sorted.unshift(v)
		})

		const tag_buttons = tags_sorted.map(tag => {
			const palette = getBrandPalette(tag) ?? { name: tag, color: Color('#aaaaaa') }
			return <CheckBox className='flex-auto justify-center' key={tag} checked={tags_enabled.has(tag)}
				onChange={e => {
					e.target.checked
						? tags_enabled.add(tag)
						: tags_enabled.delete(tag)

					this.setState({ tags_enabled })
				}}
			>
				{palette.icon && <palette.icon />}
				<span>{tag}</span>
				<span className="pill">{tags[tag]}</span>
			</CheckBox>
		})

		let year_last = dayjs().year() + 1
		return <>
			<div className='hidden print:block'>
				<p>I have experience with the following technologies:</p>

				<HList className='my-2 mx-auto text-center w-5/6'>{
					Object.entries(tags)
						.filter(([tag]) => !TAGS_RECOMMENDED.includes(tag))
						.sort((lhs, rhs) => lhs[0].localeCompare(rhs[0]))
						.map(([tag, cnt], i) => {
							const palette = getBrandPalette(tag) ?? { name: tag, color: Color('#aaaaaa') }
							return <span className='whitespace-nowrap' key={i}>
								{palette.icon && <span className='svg-icon-cheat mr-1'><palette.icon /></span>}
								{tag}
								{cnt > 1 && ` (${cnt})`}
							</span>
						})
				}</HList>

				<p>Below is a summary of some of my experiences. To access full contents, please visit:</p>
				<div className='display-block text-center my-2'><Link to="/" /></div>
			</div>
			<div className="flex flex-wrap gap-2 print:hidden">
				<CheckBox
					checked={tags_enabled.size === Object.keys(tags).length}
					onChange={e => this.setState({ tags_enabled: new Set(e.target.checked ? Object.keys(tags) : undefined) })}
				>
					<span>All</span>
					<span className="pill">{Object.values(tags).reduce((a, v) => a + v, 0)}</span>
				</CheckBox>
				<button className='btn' onClick={() => this.reset()}>Reset</button>
				{tag_buttons}
			</div>
			<hr />
			<HistoryConsumer>{(prev) => children.map((child) => {
				const slug = child.key
				const { lang, year, tags } = child.props

				const enabled = tags.some(tag => tags_enabled.has(tag))
				const date_label = (() => {
					if (!enabled || (year_last === year)) {
						return <></>
					}

					year_last = year
					return <div className="text-sub text-sm mb-2 -ml-2">{year}</div>
				})()

				return <React.Fragment key={slug}>
					{date_label}
					<section className='break-inside-avoid' lang={lang} style={{ display: enabled ? undefined : 'none' }} ref={(curr) => {
						// Scroll restoration.
						if (curr === null || this.state.is_scrolled) {
							return
						}

						const [exp, slug_] = (prev ?? '').split('/').slice(2)
						if (!(exp === 'exp' && slug_ === slug)) {
							return
						}

						const { top } = curr.getBoundingClientRect()
						const offset = top + window.pageYOffset - 120

						window.scrollTo({
							top: offset,
							behavior: 'smooth',
						})
						this.setState({ is_scrolled: true })
					}}>
						{slug === slug_last && <div className={styles.bookmark}></div>}
						{child}
					</section>
				</React.Fragment>
			})}</HistoryConsumer>
		</>
	}
}
