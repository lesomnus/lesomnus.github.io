import NextMdx from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	reactStrictMode: true,
	experimental: {
		appDir: true,
		images: { unoptimized: true }
	},
	webpack: (config, options) => {
		// mermaid
		config.module.rules.push({
			test: /\.mmd/,
			type: 'asset/source',
		})

		// TeX
		config.module.rules.push({
			test: /\.tex/,
			type: 'asset/source',
		})

		return config
	}
}

const withMDX = NextMdx({
	options: {
		remarkPlugins: [
			remarkFrontmatter,
			remarkMdxFrontmatter,
		],
	}
});

export default withMDX(nextConfig);
