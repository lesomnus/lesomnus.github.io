import React from 'react'
import { Dayjs } from 'dayjs'

export interface DateRange {
	from: Dayjs
	to?: Dayjs
}

export interface Header {
	title: React.ReactNode
	date: Dayjs | DateRange
}
