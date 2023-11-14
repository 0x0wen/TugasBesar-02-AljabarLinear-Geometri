import Image, {StaticImageData} from 'next/image'
import img from '@mui/material/Icon/Icon'
import asd from './asd.png'
const ResultCard = ({
	image,
	percentage,
}: {
	image: StaticImageData
	percentage: number
}) => {
	return (
		<div className="relative group flex items-center ">
			<Image
				src={asd}
				alt="image"
				className="w-40 max-h-40 md:w-56 md:max-h-56 lg:w-80 lg:max-h-80 my-auto object-contain"
			/>
			<div className="absolute top-0 w-full h-full bg-black bg-opacity-0 hover:bg-opacity-60 transition-all duration-500"></div>
			<div className="absolute h-0 group-hover:h-[80%] transition-all duration-500 bg-color5 bottom-0 left-1/2 -translate-x-1/2 flex justify-center items-center">
				<h4 className="opacity-0 group-hover:opacity-100 mx-2">
					{(percentage * 100).toFixed(2)}%
				</h4>
			</div>
		</div>
	)
}

export default ResultCard
