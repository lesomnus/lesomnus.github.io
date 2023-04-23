import Color from 'color'
import {
	AiOutlinePushpin,
	AiOutlineTrophy,
	AiOutlineBook,
	AiOutlinePaperClip,
} from 'react-icons/ai'
import {
	SiAndroid,
	SiAnsible,
	SiBluetooth,
	SiTypescript,
	SiCmake,
	SiDocker,
	SiJavascript,
	SiKubernetes,
	SiHelm,
	SiMongodb,
	SiNodedotjs,
	SiOpencv,
	SiRedis,
	SiPostgresql,
	SiReact,
	SiVuedotjs,
	SiVite,
	SiQt,
	SiExpress,
} from 'react-icons/si'
import {
	FaJava,
} from 'react-icons/fa'
import { VscGithubAlt } from 'react-icons/vsc'

export interface BrandPalette {
	name: string
	icon?: (props: object) => JSX.Element
	color: Color<string>
}

const palettes: Record<string, BrandPalette> = {
	'Pinned': {
		icon: AiOutlinePushpin,
		name: 'Pinned',
		color: Color('#000000'),
	},
	'Awarded': {
		icon: AiOutlineTrophy,
		name: 'Awarded',
		color: Color('#000000'),
	},
	'Published': {
		icon: AiOutlineBook,
		name: 'Published',
		color: Color('#000000'),
	},
	'Work': {
		icon: AiOutlinePaperClip,
		name: 'Work',
		color: Color('#000000'),
	},

	'Android': {
		icon: SiAndroid,
		name: 'Android',
		color: Color('#3ddc84'),
	},
	'Ansible': {
		icon: SiAnsible,
		name: 'Ansible',
		color: Color('#000000'),
	},
	'Bluetooth': {
		icon: SiBluetooth,
		name: 'Bluetooth',
		color: Color('#0082fc'),
	},
	'C++': {
		name: 'C++',
		color: Color('#004482'),
	},
	'TypeScript': {
		icon: SiTypescript,
		name: 'TypeScript',
		color: Color('#007acc'),
	},
	'CMake': {
		icon: SiCmake,
		name: 'CMake',
		color: Color('#199a46'),
	},
	'GitHub': {
		icon: VscGithubAlt,
		name: 'Github',
		color: Color('#000000'),
	},
	'GoLang': {
		name: 'GoLang',
		color: Color('#00acd7'),
	},
	'Docker': {
		icon: SiDocker,
		name: 'Docker',
		color: Color('#006db8'),
	},
	'Express': {
		icon: SiExpress,
		name: 'Express',
		color: Color('#000000'),
	},
	'Java': {
		icon: FaJava,
		name: 'Java',
		color: Color('#f29111'),
	},
	'JavaScript': {
		icon: SiJavascript,
		name: 'JavaScript',
		color: Color('#f0da50'),
	},
	'Kubernetes': {
		icon: SiKubernetes,
		name: 'Kubernetes',
		color: Color('#326de6'),
	},
	'Helm': {
		icon: SiHelm,
		name: 'Helm',
		color: Color('#0f1689'),
	},
	'MongoDB': {
		icon: SiMongodb,
		name: 'MongoDB',
		color: Color('#00ed64'),
	},
	'Node.js': {
		icon: SiNodedotjs,
		name: 'Node.js',
		color: Color('#81bd03'),
	},
	'OpenCV': {
		icon: SiOpencv,
		name: 'OpenCV',
		color: Color('#000000'),
	},
	'Redis': {
		icon: SiRedis,
		name: 'Redis',
		color: Color('#dc382c'),
	},
	'PostgreSQL': {
		icon: SiPostgresql,
		name: 'PostgreSQL',
		color: Color('#336791'),
	},
	'React': {
		icon: SiReact,
		name: 'React',
		color: Color('#61dbfb'),
	},
	'Vue.js': {
		icon: SiVuedotjs,
		name: 'Vue.js',
		color: Color('#41b883'),
	},
	'Vite': {
		icon: SiVite,
		name: 'Vite',
		color: Color('#ffd22a'),
	},
	'Qt': {
		icon: SiQt,
		name: 'Qt',
		color: Color('#41cd52'),
	},
}

// function alias(name: string, vs: string[]) {
// 	const p = palettes[name]
// 	for(const v of vs){
// 		palettes[v] =  p
// 	}
// }

// alias('C++', [
// 	'c++',
// 	'cpp',
// 	'Cpp',
// ])

export function getBrandPalette(name: string): BrandPalette | undefined {
	return palettes[name]
}
