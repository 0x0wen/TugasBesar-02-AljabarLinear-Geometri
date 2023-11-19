'use client'
import {motion, useAnimationControls, useInView} from 'framer-motion'
import {useEffect, useRef} from 'react'

interface Props {
	children: JSX.Element
	width?: 'fit-content' | '100%'
}
const RevealWithBG = ({children, width = 'fit-content'}: Props) => {
	const ref = useRef(null)
	const isInView = useInView(ref, {once: false})
	const mainControls = useAnimationControls()
	const slideControls = useAnimationControls()

	useEffect(() => {
		if (isInView) {
			mainControls.start('visible')
			slideControls.start('visible')
		} else {
			mainControls.start('hidden')
			slideControls.start('hidden')
		}
	}, [mainControls, isInView])
	return (
		<div ref={ref} style={{position: 'relative', width, overflow: 'hidden'}}>
			<motion.div
				variants={{
					hidden: {opacity: 0, y: 75},
					visible: {opacity: 1, y: 0},
				}}
				initial="hidden"
				animate={mainControls}
				transition={{delay: 0.25, duration: 0.5}}
			>
				{children}
			</motion.div>
			<motion.div
				variants={{hidden: {left: 0}, visible: {left: '100%'}}}
				initial="hidden"
				animate={slideControls}
				transition={{duration: 0.5, ease: 'easeIn'}}
				style={{
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					background: '#1EFF96',
					zIndex: 20,
				}}
			/>
		</div>
	)
}

export default RevealWithBG
