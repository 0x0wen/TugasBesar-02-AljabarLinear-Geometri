'use client'

import Reveal from './components/animations/Reveal'
const Header = ({title, description}: {title: string; description: string}) => {
	return (
		<Reveal>
			<section className="pt-20">
				<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-anton text-center text-color1">
					{title}
				</h1>
				<p className="text-xl text-color1 font-montserrat text-center mt-4 sm:w-96 md:w-[28rem] lg:w-[32rem] sm:mx-auto">
					{description}
				</p>
			</section>
		</Reveal>
	)
}

export default Header
