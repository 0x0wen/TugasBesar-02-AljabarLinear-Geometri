import {motion, useAnimationControls, useInView} from 'framer-motion'
import { Tourney } from 'next/font/google'
import {useEffect, useRef} from 'react'
const Reveal = ({children, noTranslate = false, amount, margin, once = true, root}: {children: JSX.Element, noTranslate?: boolean} & Parameters<typeof useInView>[1]) => {
	const ref = useRef(null)
	const isInView = useInView(ref, { amount, margin, once, root })
	const mainControls = useAnimationControls()

	useEffect(() => {
		if (isInView) {
			mainControls.start('visible')
		} else {
			mainControls.start('hidden')
		}
	}, [mainControls, isInView])
	return (
		<motion.div
			ref={ref}
			variants={{
				hidden: {opacity: 0, ...(!noTranslate ? { y: 75 } : {})},
				visible: {opacity: 1, ...(!noTranslate ? { y: 0 } : {})},
			}}
			initial="hidden"
			animate={mainControls}
			transition={{ease: 'easeIn', duration: 0.5}}
		>
			{children}
		</motion.div>
	)
}

export default Reveal
