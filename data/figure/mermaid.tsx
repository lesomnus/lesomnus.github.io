import React from 'react'



interface MermaidProps {
	src: string
	caption: string
}

export const Mermaid: React.FC<MermaidProps> = ({ src, caption }) => {
	return <figure>
		<pre>
			<code className='language-mermaid dark-invert'>{src}</code>
		</pre>
		<figcaption>{caption}</figcaption>
	</figure>
}
