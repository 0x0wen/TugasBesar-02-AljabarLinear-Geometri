import Image, {StaticImageData} from 'next/image'
import img from '@mui/material/Icon/Icon'
import asd from './asd.png'
import RevealWithBG from './components/animations/RevealWithBG'
const ResultCard = ({
	image,
	percentage,
}: {
	image: string
	percentage: number
}) => {
	return (
		<div className="relative group flex items-center ">
			<div className="aspect-[3/4] w-40 max-h-40 md:w-56 md:max-h-56 lg:w-80 lg:max-h-80 my-auto object-contain">
				<Image src={`data:image/jpeg;base64,${image}`} alt="image" fill={true} />
			</div>
			<div className="absolute top-0 w-full h-full bg-black bg-opacity-0 hover:bg-opacity-60 transition-all duration-500 flex justify-center items-center group">
				<h4 className="opacity-0 group-hover:opacity-100 mx-2 font-montserrat text-color5 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
					{percentage.toFixed(2)}%
				</h4>
			</div>
		</div>
	)
}

export default ResultCard
