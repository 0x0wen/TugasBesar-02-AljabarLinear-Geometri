'use client'
import ResultCard from './ResultCard'
import {Pagination} from '@mui/material'
import Box from '@mui/material/Box'
import {useEffect, useState} from 'react'
import Skeleton from '@mui/material/Skeleton'
import LinearProgress from '@mui/material/LinearProgress'
import {Button} from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import LoadingButton from '@mui/lab/LoadingButton'
import Reveal from './components/animations/Reveal'
import RevealWithBG from './components/animations/RevealWithBG'
import PDFFile from './PDFFile'
import {PDFDownloadLink} from '@react-pdf/renderer'
const Result = ({
	onLoading,
	resultData,
	time,
	queryImage,
}: {
	onLoading: boolean
	resultData: any
	time: number,
	queryImage: any
}) => {
	const [page, setPage] = useState(1)
	useEffect(() => {
		setPage(1)
	}, [resultData])
	const itemsPerPage = 6

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value)
	}

	const startIndex = (page - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const currentItems = resultData.slice(startIndex, endIndex)
	const totalPages = Math.ceil(resultData.length / itemsPerPage)
	const dataString = JSON.stringify(resultData)

	return (
		<Reveal>
			{resultData.length != 0 ? (
				<section>
					{/* result section */}
					<section className="px-4 w-fit mx-auto flex flex-col gap-2 text-color1 font-montserrat shadow-md shadow-color5 bg-color1 p-5 rounded-xl">
						<section>
							{onLoading ? (
								<Box sx={{width: '100%', color: '#1EFF96'}}>
									<LinearProgress color="inherit" />
								</Box>
							) : (
								<section className="flex justify-between font-montserrat lg:text-lg">
									<RevealWithBG>
										<p className="text-color4 font-extrabold">Result:</p>
									</RevealWithBG>
									<RevealWithBG>
										<p className="text-color4">
											{resultData.length} images in {time.toFixed(3)} seconds.
										</p>
									</RevealWithBG>
								</section>
							)}
						</section>
						<section className="grid grid-cols-2 md:grid-cols-3 gap-4 place-items-stretch w-fit mx-auto">
							{currentItems.map((result: any, index: number) =>
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
										percentage={result.persentasePersamaan}
									/>
								)
							)}
						</section>
						<Pagination
							count={totalPages}
							className="mx-auto bg-color3 rounded-full mt-5 md:mt-10"
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
							<PDFDownloadLink
								document={<PDFFile resultData={resultData} time={time} queryImage={queryImage}/>}
								fileName="result.pdf"
							>
								<Button
									component="label"
									variant="contained"
									endIcon={<FileDownloadIcon />}
									className="bg-color3 hover:bg-color3 text-color1"
								>
									Download
								</Button>
							</PDFDownloadLink>
						)}
					</div>
				</section>
			) : (
				<div className="flex justify-center items-center py-20">
					<h2 className="font-montserrat text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">
						No image found.
					</h2>
				</div>
			)}
		</Reveal>
	)
}

export default Result
