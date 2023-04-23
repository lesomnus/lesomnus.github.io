// Force to generate `/index.html`.
// Copy `out/root/index.html` to `out/index.html`.
export { default } from '@/app/page'

export function generateStaticParams() {
	return [
		{ slot: 'index' },
	]
}
