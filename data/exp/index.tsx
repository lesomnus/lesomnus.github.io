'use server'

import { promises as fs } from 'fs'
import path from 'path'

import React from 'react'
import type { MDXContent } from 'mdx/types'
import dayjs, { Dayjs } from 'dayjs'

import { Excerpt, isExcerpt } from '@data/excerpt'



interface Ref {
	kind: 'GitHub',
	repo: string
}

interface ExpHeader {
	title: string
	sub: string
}

interface ExpMeta {
	tags: string[]
	refs: Ref[]
}

export type ExpEntry = ExpHeader & ExpMeta & {
	lang: string
	slug: string
	date: Dayjs
	Body: MDXContent
	excerpt: React.ReactElement[]
	has_more: boolean
}

const dirpath = path.join(process.cwd(), 'data/exp')

async function readMeta(slug: string): Promise<Partial<ExpMeta>> {
	return await import(`./${slug}/meta.json`) as Partial<ExpMeta>
}

export async function get(slug: string, lang: string): Promise<ExpEntry> {
	const date = dayjs(slug.slice(0, 'YYYY-MM-DD'.length))
	const meta = await readMeta(slug)

	if (lang !== 'en-US') {
		lang = await fs
			.access(path.join(dirpath, slug, `index.${lang}.mdx`), fs.constants.F_OK)
			.then(() => lang)
			.catch(() => 'en-US')
	}

	const { default: Body, ...header } = await import(`./${slug}/index.${lang}.mdx`) as ExpHeader & { default: MDXContent }

	const excerpts: React.ReactElement[] = []
	const body = Body({})
	let has_more = false
	if (body.type === 'p' || isExcerpt(body)) {
		excerpts.push(body)
	} else {
		has_more = true

		const contents = (body.props as { children: React.ReactNode }).children
		React.Children.forEach(contents, (child, i) => {
			if (!React.isValidElement(child)) {
				return
			}

			// Pick first encountered <p> as default excerpts.
			if (excerpts.length === 0 && child.type === 'p') {
				excerpts.push(child)
				return
			}

			if (!isExcerpt(child)) {
				return
			}

			excerpts.push(child)
		})
	}

	// Remove default excerpt if there is user specified excerpt. 
	if (excerpts.length > 1 && !isExcerpt(excerpts[0])) {
		excerpts.shift()
	}

	const excerpt: React.ReactElement[] = []
	for (const v of excerpts) {
		if (!isExcerpt(v)) {
			excerpt.push(React.cloneElement(v, { key: excerpt.length }))
			continue
		}

		React.Children.forEach(v.props.children, child => {
			if (!React.isValidElement(child)) {
				return
			}

			excerpt.push(React.cloneElement(child, { key: excerpt.length }))
		})
	}

	return {
		...header,
		tags: [],
		refs: [],
		slug,
		...meta,
		date,
		lang,
		Body,
		excerpt,
		has_more,
	}
}

export async function list(lang: string): Promise<ExpEntry[]> {
	const rst: ExpEntry[] = []
	for (const postdir of await fs.readdir(dirpath, { withFileTypes: true })) {
		if (!postdir.isDirectory()) {
			continue
		}

		rst.push(await get(postdir.name, lang))
	}

	return rst
}
