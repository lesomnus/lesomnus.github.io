import dayjs, { Dayjs } from 'dayjs'

export interface DateRange {
	from: Dayjs
	to?: Dayjs
}

export interface Header {
	title: string
	date: DateRange
}


function resolveData<T, K extends keyof T>({
	meta,
	body,
}: {
	meta: Omit<Pick<T, K>, 'date'> & {date: string | {from: string, to?: string}},
	body: Partial<Record<string, Omit<T, K>>> & { 'en-US': Omit<T, K> },
}) {
	const rst: Partial<Record<string, T>> = {}
	const { date, ...rest } = meta
	const d: DateRange = typeof date === 'string'
		? {
			from: dayjs(date),
			to: dayjs(date),
		}
		: {
			from: dayjs(date.from),
			to: date.to === undefined ? undefined : dayjs(date.to),
		}

	for (const [lang, entry] of Object.entries(body)) {
		rst[lang] = {
			...rest,
			date: d,
			...entry,
		} as T
	}

	return rst as Partial<Record<string, T>> & {'en-US': T}
}



type Award = Header & {
	given_by: string
}

import award_ from './award.json'
export const award = award_.map(v => resolveData<Award, 'date'>(v))



type Education = Header & {
	placename: string,
	gpa: {
		val: number,
		max: number,
	},
	note: string,
}

import education_ from './education.json'
export const education = education_.map(v => resolveData<Education, 'date' | 'gpa'>(v))



type Publication= Header & {
	doi?: string
	authors: string[],
	part_of: string,
	pp?: {
		from: number,
		to: number,
	}
}

import publication_ from './publication.json'
export const publication = publication_.map(v => resolveData<Publication, 'date' | 'pp'>(v))



type WorkExperience= Header & {
	company_name: string
	activities: string[]
}

import work_experience_ from './work-experience.json'
export const work_experience = work_experience_.map(v => resolveData<WorkExperience, 'title' | 'date'>(v))
