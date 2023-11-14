'use client'
import ResultCard from './ResultCard'
import {Pagination} from '@mui/material'
import Box from '@mui/material/Box'
import Link from 'next/link'
import {useState} from 'react'
import Skeleton from '@mui/material/Skeleton'
import LinearProgress from '@mui/material/LinearProgress'
import {Button} from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import LoadingButton from '@mui/lab/LoadingButton'
import car from '../../public/assets/car.jpg'
import Reveal from './components/animations/Reveal'
const Result = ({
	onLoading,
	resultData,
}: {
	onLoading: boolean
	resultData: any
}) => {
	const [page, setPage] = useState(1)
	const itemsPerPage = 6

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value)
	}
	const dataResult = [
		{id: 1, image: car, percentage: 0.5234},
		{id: 2, image: car, percentage: 0.662},
		{id: 3, image: car, percentage: 0.6245},
		{id: 4, image: car, percentage: 0.5312},
		{id: 5, image: car, percentage: 0.534},
		{id: 6, image: car, percentage: 0.5456},
		{id: 7, image: car, percentage: 0.5456},
		{id: 5, image: car, percentage: 0.534},
		{id: 6, image: car, percentage: 0.5456},
		{id: 7, image: car, percentage: 0.5456},
		{id: 5, image: car, percentage: 0.534},
		{id: 6, image: car, percentage: 0.5456},
		{id: 7, image: car, percentage: 0.5456},
	]

	const startIndex = (page - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const currentItems = dataResult.slice(startIndex, endIndex)
	const totalPages = Math.ceil(dataResult.length / itemsPerPage)

	return (
		<Reveal>
			<section>
				{/* result section */}
				<section className="px-4 w-fit mx-auto flex flex-col gap-2 text-color1 font-montserrat shadow-md bg-color1 p-5 rounded-xl">
					<section>
						{onLoading ? (
							<Box sx={{width: '100%', color: '#1EFF96'}}>
								<LinearProgress color="inherit" />
							</Box>
						) : (
							<section className="flex justify-between font-montserrat lg:text-lg">
								<p className="text-color4 font-extrabold">Result:</p>
								<p className="text-color4">54 images in 0.57 seconds.</p>
							</section>
						)}
					</section>
					<section className="grid grid-cols-2 md:grid-cols-3 gap-4 place-items-stretch w-fit mx-auto">
						{currentItems.map((result, index) =>
							onLoading ? (
								<Skeleton
									variant="rectangular"
									className="w-40 aspect-[4/3] h-auto sm:w-72 md:w-60 lg:w-80 opacity-10 bg-opacity-30 bg-color3"
									key={index}
								/>
							) : (
								<ResultCard
									key={index}
									image={result.image}
									percentage={result.percentage}
								/>
							)
						)}
					</section>
					<h3 className="text-center">Treshold {'>'} % similarity</h3>
					<Pagination
						count={totalPages}
						className="mx-auto"
						size="large"
						page={page}
						onChange={handlePageChange}
					/>
				</section>
				<div className="flex justify-center mt-14 mb-20">
					{onLoading ? (
						<LoadingButton
							loading
							loadingPosition="end"
							endIcon={<FileDownloadIcon />}
							variant="outlined"
						>
							download
						</LoadingButton>
					) : (
						<Link href="/pdf">
							<Button
								component="label"
								variant="contained"
								endIcon={<FileDownloadIcon />}
								className="bg-color3 hover:bg-color3 text-color1"
							>
								Download
							</Button>
						</Link>
					)}
				</div>
			</section>
		</Reveal>
	)
}

export default Result
