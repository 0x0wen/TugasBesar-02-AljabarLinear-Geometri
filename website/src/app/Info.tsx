'use client'
import IconButton from '@mui/material/IconButton'
import HelpIcon from '@mui/icons-material/Help'
import CancelIcon from '@mui/icons-material/Cancel'
import {useState, useEffect} from 'react'
import RevealStagger from './components/animations/RevealStagger'
import Link from 'next/link'
const InfoModal = ({style}: {style: string}) => {
	return (
		<div
			className={`" bg-color3 text-center py-20 fixed bottom-0 right-0 flex flex-col gap-10 transition-all duration-500 overflow-y-auto " ${style}`}
		>
			<RevealStagger custom={5}>
				<section>
					<h1 className="font-anton text-color1 text-4xl mb-4">
						What is this shit?
					</h1>
					<p className="font-montserrat text-color1 px-5 text-justify">
						Content-Based Image Retrieval (CBIR) is an advanced search technique
						that allows you to find images not by traditional text-based tags,
						but by their visual content. It's like searching with your eyes!
						CBIR technology assesses images based on their texture and color
						patterns, making it a powerful tool for visual search.
					</p>
				</section>
			</RevealStagger>
			<RevealStagger custom={6}>
				<section>
					<h1 className="font-anton text-color1 text-4xl mb-4">How to use?</h1>
					<p className="font-montserrat text-color1 px-5 text-justify">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
						magni blanditiis maiores culpa illum dignissimos ducimus alias aut
						officiis consequatur dolorum minima ratione nemo, quisquam labore
						autem facere tempore in placeat voluptas consequuntur. Quidem, aut
						voluptatum. Architecto voluptates officiis esse!
					</p>
					<ol className="font-montserrat text-color1 px-5 text-justify">
						<li>
							<strong>Upload Your Dataset:</strong> Begin by uploading your
							dataset of images to our system. This dataset will be used as a
							reference for future searches.
						</li>
						<li>
							<strong>Add Your Image:</strong> Next, you can add your query
							image in two ways:
							<ul className="ml-10">
								<li>
									<strong>Upload Image File:</strong> Upload an image file from
									your device to use as a query.
								</li>
								<li>
									<strong>Use Integrated Camera:</strong> Alternatively, you can
									use the integrated camera on our website to capture an image
									directly.
								</li>
							</ul>
						</li>
						<li>
							<strong>Set Your Preferences:</strong> Customize your search by
							setting your preferred parameters. These settings will influence the search results. There are 2 settings:
							<ul className="ml-10">
								<li>
									<strong>Parameter</strong> Upload an image file from
									your device to use as a query.
								</li>
								<li>
									<strong>Threshold</strong> Alternatively, you can
									use the integrated camera on our website to capture an image
									directly.
								</li>
							</ul>
						</li>
						<li>
							<strong>Click Search:</strong> Hit the 'Search' button to initiate
							the query. Our system will process your request and identify
							images that match your criteria.
						</li>
						<li>
							<strong>View Results:</strong> A collection of images that surpass
							the similarity threshold will be presented to you. Explore the
							results to find images that align with your query.
						</li>
					</ol>
				</section>
			</RevealStagger>
			<RevealStagger custom={7}>
				<section>
					<h1 className="font-anton text-color1 text-4xl mb-4">
						About the creators
					</h1>
					<p className="font-montserrat text-color1 px-5 text-justify">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
						magni blanditiis maiores culpa illum dignissimos ducimus alias aut
						officiis consequatur dolorum minima ratione nemo, quisquam labore
						autem facere tempore in placeat voluptas consequuntur. Quidem, aut
						voluptatum. Architecto voluptates officiis esse!
					</p>
				</section>
			</RevealStagger>
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
			<div className="flex items-end fixed bottom-5 right-5 z-20 ">
				{modal ? (
					<IconButton
						aria-label="delete"
						color="primary"
						onClick={modalHandler}
					>
						<CancelIcon
							fontSize="inherit"
							sx={{width: '50px', height: '50px', scale: '2:hover'}}
						/>
					</IconButton>
				) : (
					<IconButton
						aria-label="delete"
						color="primary"
						onClick={modalHandler}
					>
						<HelpIcon
							fontSize="inherit"
							sx={{width: '50px', height: '50px', scale: '2:hover'}}
						/>
					</IconButton>
				)}
			</div>
		</div>
	)
}

export default Info
