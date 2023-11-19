'use client'
import pattern from '../../public/assets/pattern.png'
import RevealWithBG from './components/animations/RevealWithBG'
import Image from 'next/image'
const Header = ({title, description}: {title: string; description: string}) => {
	return (
		<section className="pt-20 p-5 mx-auto flex flex-col items-center justify-center text-center text-color5">
			<Image
				src={pattern}
				alt=""
				className="absolute left-1/2 top-10 hidden md:block opacity-70 w-96"
			/>
			<RevealWithBG>
				<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-anton text-center ">
					{title}
				</h1>
			</RevealWithBG>
			<RevealWithBG>
				<p className="text-xl font-montserrat text-center mt-4 sm:w-96 md:w-[28rem] lg:w-[32rem] sm:mx-auto">
					{description}
				</p>
			</RevealWithBG>
		</section>
	)
}

export default Header
