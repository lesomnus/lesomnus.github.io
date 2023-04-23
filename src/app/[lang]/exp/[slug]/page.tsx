import React from 'react'
import { SlHome } from 'react-icons/sl'

import * as config from '@/config'
import { getBrandPalette, HList, TagBadges } from '@/components/servers'
import { IntlToggle, ThemeToggle, MermaidRenderer, Link } from '@/components/clients'
import { Bookmark } from './bookmark'
import styles from './page.module.scss'

import * as exp from '@data/exp'



interface Props {
	params: {
		lang: string
		slug: string
	}
}

const Page = async (props: Props) => {
	const { lang, slug } = props.params

	const {
		date,
		title,
		sub,
		tags,
		refs,
		Body,
	} = await exp.get(slug, lang)

	const datetime = date.format('YYYY-MM-DD')
	const ref_icons: React.ReactNode[] = refs.map((ref, i) => {
		const palette = getBrandPalette(ref.kind) ?? { icon: undefined }

		return <a key={i} href={`https://github.com/${ref.repo}`} target="_blank" rel="noreferrer">{
			palette.icon ? <palette.icon /> : ref.kind
		}</a>
	})

	return <article>
		<Bookmark value={slug} />
		<header className="text-center mb-3">
			<h1 className="text-4xl font-normal break-keep">{title}</h1>
			<p className="empty:hidden text-2xl font-light break-keep w-4/5 mx-auto">{sub}</p>
			<p className="mt-2"><time dateTime={datetime}>{datetime}</time></p>
			<HList className="mt-2 svg-icon-cheat">
				<Link to="/"><SlHome /></Link>
				<IntlToggle />
				<ThemeToggle className='inline-flex items-center' />
				{ref_icons}
			</HList>
		</header>
		<hr />
		<div>
			<div className="inline-flex flex-wrap gap-1 text-sm">
				<TagBadges tags={tags} />
			</div>
			<section className={styles.content}>
				<MermaidRenderer>
					<Body />
				</MermaidRenderer>
			</section>
		</div>
	</article>
}

export default Page

export async function generateStaticParams() {
	const rst: { lang: string, slug: string }[] = []

	for (const l of config.supported_langs) {
		for (const { lang, slug } of await exp.list(l)) {
			rst.push({ lang, slug })
		}
	}

	return rst
}
