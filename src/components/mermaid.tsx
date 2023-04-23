'use client'

import React from 'react'
import mermaid from 'mermaid'



type Props = React.PropsWithChildren

interface State {
	rendered?: React.ReactNode
}

export class MermaidRenderer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {}
	}

	componentDidMount(): void {
		const { children } = this.props

		const rendered: React.ReactNode[] = []
		React.Children.forEach(children, (child, i) => {
			if (!React.isValidElement(child)) {
				return
			}

			child = child as React.ReactElement
			const elem = React.cloneElement(child, {
				key: i,
				ref: (curr: unknown) => {
					if (!(curr instanceof HTMLElement)) {
						return
					}

					mermaid.run({ nodes: curr.querySelectorAll('.language-mermaid') })
				},
			})

			rendered.push(elem)
		})

		this.setState({ rendered })
	}

	render(): React.ReactNode {
		return this.state.rendered ?? this.props.children
	}
}
