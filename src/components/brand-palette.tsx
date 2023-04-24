import Color from 'color'
import {
	AiOutlinePushpin,
	AiOutlineTrophy,
	AiOutlineBook,
	AiOutlinePaperClip,
} from 'react-icons/ai'
import * as si from 'react-icons/si'

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
		icon: si.SiAndroid,
		name: 'Android',
		color: Color('#3DDC84'),
	},
	'Ansible': {
		icon: si.SiAnsible,
		name: 'Ansible',
		color: Color('#EE0000'),
	},
	'Bluetooth': {
		icon: si.SiBluetooth,
		name: 'Bluetooth',
		color: Color('#0082FC'),
	},
	'C++': {
		name: 'C++',
		color: Color('#00599C'),
	},
	'CMake': {
		icon: si.SiCmake,
		name: 'CMake',
		color: Color('#064F8C'),
	},
	'Docker': {
		icon: si.SiDocker,
		name: 'Docker',
		color: Color('#2496ED'),
	},
	'Express': {
		icon: si.SiExpress,
		name: 'Express',
		color: Color('#000000'),
	},
	'GoLang': {
		name: 'GoLang',
		color: Color('#00ADD8'),
	},
	'Helm': {
		icon: si.SiHelm,
		name: 'Helm',
		color: Color('#0F1689'),
	},
	'Java': {
		icon: FaJava,
		name: 'Java',
		color: Color('#f29111'),
	},
	'JavaScript': {
		icon: si.SiJavascript,
		name: 'JavaScript',
		color: Color('#F7DF1E'),
	},
	'Kubernetes': {
		icon: si.SiKubernetes,
		name: 'Kubernetes',
		color: Color('#326CE5'),
	},
	'MongoDB': {
		icon: si.SiMongodb,
		name: 'MongoDB',
		color: Color('#47A248'),
	},
	'Node.js': {
		icon: si.SiNodedotjs,
		name: 'Node.js',
		color: Color('#339933'),
	},
	'OpenCV': {
		icon: si.SiOpencv,
		name: 'OpenCV',
		color: Color('#5C3EE8'),
	},
	'PostgreSQL': {
		icon: si.SiPostgresql,
		name: 'PostgreSQL',
		color: Color('#4169E1'),
	},
	'Qt': {
		icon: si.SiQt,
		name: 'Qt',
		color: Color('#41CD52'),
	},
	'React': {
		icon: si.SiReact,
		name: 'React',
		color: Color('#61DAFB'),
	},
	'Redis': {
		icon: si.SiRedis,
		name: 'Redis',
		color: Color('#DC382D'),
	},
	'TypeScript': {
		icon: si.SiTypescript,
		name: 'TypeScript',
		color: Color('#3178C6'),
	},
	'Vite': {
		icon: si.SiVite,
		name: 'Vite',
		color: Color('#646CFF'),
	},
	'Vue.js': {
		icon: si.SiVuedotjs,
		name: 'Vue.js',
		color: Color('#4FC08D'),
	},
	'GitHub': {
		icon: VscGithubAlt,
		name: 'Github',
		color: Color('#181717'),
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
