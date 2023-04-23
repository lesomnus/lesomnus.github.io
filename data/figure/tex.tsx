import React from 'react'

import { TeX as TeX_ } from 'mathjax-full/js/input/tex'
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages'
import { HTMLDocument } from 'mathjax-full/js/handlers/html/HTMLDocument'
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor'
import { STATE } from 'mathjax-full/js/core/MathItem'
import { SerializedMmlVisitor } from 'mathjax-full/js/core/MmlTree/SerializedMmlVisitor'
import type { MmlNode } from 'mathjax-full/js/core/MmlTree/MmlNode'



const tex_ctx = {
	tex: new TeX_({ packages: AllPackages.filter((name) => name !== 'bussproofs') }),
	visitor: new SerializedMmlVisitor(),
	adaptor: liteAdaptor(),
}

interface MathProps {
	expr: string
	inline?: boolean
}

// TODO: https://github.com/mathjax/MathJax-demos-node/blob/master/direct/tex2mml
export const TeX: React.FC<MathProps> = ({ expr, inline }) => {
	const doc = new HTMLDocument('', tex_ctx.adaptor, { InputJax: tex_ctx.tex })
	const node = doc.convert(expr, { display: !(inline === true), end: STATE.CONVERT }) as MmlNode
	const mml = tex_ctx.visitor.visitTree(node)

	return <span dangerouslySetInnerHTML={{ __html: mml }}></span>
}
