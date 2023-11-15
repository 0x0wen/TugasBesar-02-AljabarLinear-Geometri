'use client'
import IconButton from '@mui/material/IconButton'
import HelpIcon from '@mui/icons-material/Help'
import CancelIcon from '@mui/icons-material/Cancel'
import {useState, useEffect} from 'react'
import RevealStagger from './components/animations/RevealStagger'
import RevealWithBG from './components/animations/RevealWithBG'
import Divider from '@mui/material/Divider'
import Link from 'next/link'
const InfoModal = ({style}: {style: string}) => {
	return (
		<div
			className={`" bg-color1 text-color5 text-center py-20 fixed bottom-0 right-0 flex flex-col gap-10 transition-all z-20 duration-500 overflow-y-auto " ${style}`}
		>
			<section className="text-center flex flex-wrap justify-center">
				<RevealWithBG>
					<h1 className="font-anton text-4xl mb-4 drop-shadow-2xl ">
						What is LENSA?
					</h1>
				</RevealWithBG>
				<RevealWithBG>
					<p className="font-montserrat  px-5 sm:px-10 md:px-14 lg:px-64 text-justify">
						LENSA is a implementation of{' '}
						<strong>Content-Based Image Retrieval</strong> (CBIR), which is an
						advanced search technique that allows you to find images not by
						traditional text-based tags, but by their visual content. It's like
						searching with your eyes! CBIR technology assesses images based on
						their texture and color patterns, making it a powerful tool for
						visual search.
					</p>
				</RevealWithBG>
			</section>

			<section className="text-center flex flex-wrap justify-center">
				<RevealWithBG>
					<h1 className="font-anton  text-4xl mb-4 shadow-white drop-shadow-2xl">
						How to use?
					</h1>
				</RevealWithBG>
				<ol className="font-montserrat  px-5 sm:px-10 md:px-14 lg:px-64 text-justify">
					<RevealWithBG>
						<li className="">
							<p className="text-color5 font-bold pl-5 text-lg">
								1. Upload Your Dataset
							</p>
							Begin by uploading your dataset of images to our system. This
							dataset will be used as the source of the query search using CBIR.
							You can use the same dataset more than 1 time without needing to
							re-upload it again and again, but once you change the dataset or
							refresh the page, the dataset will be overwritten.
						</li>
					</RevealWithBG>
					<RevealWithBG>
						<li>
							<p className="text-color5 font-bold pl-5 text-lg">
								2. Add Your Image
							</p>
							Next, you can add your query image in two ways:
							<ul className="ml-10">
								<li>
									<strong>Upload Image File:</strong> Upload an image file from
									your device to use as a query.
								</li>
								<li>
									<strong>Use Integrated Camera:</strong> Alternatively, you can
									use the integrated camera on our website to capture an image
									directly. The camera will automatically screenshot the image
									every 5 seconds, and perform search immediately.
								</li>
							</ul>
						</li>
					</RevealWithBG>
					<RevealWithBG>
						<li>
							<p className="text-color5 font-bold pl-5 text-lg">
								3. Set Your Preferences
							</p>
							Customize your search by setting your preferred parameters. These
							settings will influence the search results. There are 2 settings:
							<ul className="ml-10">
								<li>
									<strong>Parameter:</strong> Search similar images based on the
									'color' or 'texture' of the query image.
								</li>
								<li>
									<strong>Threshold:</strong> Diplay results above certain
									threshold you desire.
								</li>
							</ul>
						</li>
					</RevealWithBG>
					<RevealWithBG>
						<li>
							<p className="text-color5 font-bold pl-5 text-lg">
								4. Click Search
							</p>
							Hit the 'Search' button to initiate the query. Our system will
							process your request and identify images that match your criteria.
						</li>
					</RevealWithBG>
					<RevealWithBG>
						<li>
							<p className="text-color5 font-bold pl-5 text-lg">
								5. View Results
							</p>
							A collection of images and it's similarity percentage that surpass
							the similarity threshold will be presented to you. Explore the
							results to find images that align with your query.
						</li>
					</RevealWithBG>
				</ol>
			</section>

			<section className="text-center flex flex-wrap justify-center">
				<RevealWithBG>
					<h1 className="font-anton  text-4xl mb-4 drop-shadow-2xl">
						About the creators
					</h1>
				</RevealWithBG>
				<RevealWithBG>
					<p className="font-montserrat  px-5 sm:px-10 md:px-14 lg:px-64 text-justify">
						We are just some curious student studying Informatics Engineering at
						Bandung Institute of Technology. We made this website to fulfill the
						Linear Algebra and Geometry project.
					</p>
				</RevealWithBG>
			</section>
		</div>
	)
}
const Info = () => {
	const [modal, setModal] = useState(false)
	const modalHandler = () => {
		setModal(!modal)
	}
	useEffect(() => {
		document.body.style.overflow = modal ? 'hidden' : 'auto'

		// Clean up the effect when the component unmounts
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [modal])
	const styling = modal
		? 'h-full w-full rounded-none'
		: 'h-0 w-0 rounded-tl-full'

	return (
		<div>
			<InfoModal style={styling} />
			<div className="flex items-end fixed bottom-5 right-5 z-20">
				{modal ? (
					<IconButton
						aria-label="delete"
						color="primary"
						onClick={modalHandler}
						className="aspect-square w-20 h-auto"
					>
						<CancelIcon
							fontSize="inherit"
							sx={{scale: '2:hover', color: '#1EFF96'}}
							className="w-full h-full"
						/>
					</IconButton>
				) : (
					<IconButton
						aria-label="delete"
						color="primary"
						onClick={modalHandler}
						className="aspect-square w-20 h-auto"
					>
						<HelpIcon
							fontSize="inherit"
							sx={{
								scale: '2:hover',
								color: '#1EFF96',
							}}
							className="w-full h-full"
						/>
					</IconButton>
				)}
			</div>
		</div>
	)
}

export default Info
