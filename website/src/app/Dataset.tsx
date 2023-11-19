'use client'
import Button from '@mui/material/Button'
import {styled} from '@mui/material'
import {ChangeEvent, useState} from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Image from 'next/image'
const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
})

const Dataset = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [dataset, setDataset] = useState(null)
	const [image, setImage] = useState(null)

	const uploadHandler = async (event: any) => {
		setIsLoading(true)
		document.body.style.overflow = 'hidden'
		setDataset(event.target.files)
		try {
			const formData = new FormData()
			for (let i = 0; i < event.target.files.length; i++) {
				formData.append('files', event.target.files[i])
			}
			const response = await fetch(`http://127.0.0.1:8000/dataset/`, {
				method: 'POST',
				body: formData,
			})
			// Example: Handle the backend response
			const resData = await response.json()
		} catch (error) {
			console.error('Error uploading dataset:', error)
		} finally {
			setIsLoading(false)
			document.body.style.overflow = ''
		}
	}
	return (
		<>
			{/* upload dataset section */}
			<section className="mx-auto">
				<Button
					component="label"
					variant="contained"
					className="w-fit bg-color3 text-color1 hover:bg-color3"
				>
					Upload Dataset
					<input
						hidden
						onChange={uploadHandler}
						type="file"
						directory=""
						webkitdirectory=""
						mozdirectory=""
						accept=".jpeg, .jpg, .png, .webp,"
					/>
				</Button>
				{dataset ? (
					<p className="text-color5 font-montserrat flex justify-center text-center">
						Total images in dataset:{' '}
						<span className="text-color3"> {dataset?.length}</span>
					</p>
				) : (
					<></>
				)}
				{isLoading ? (
					<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 z-10 ">
						<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center gap-5">
							<p className="text-color5 font-montserrat">
								Processing dataset...
							</p>
							<CircularProgress className="mx-auto" sx={{color: '#1EFF96'}} />
						</div>
					</div>
				) : (
					<></>
				)}
			</section>
		</>
	)
}

export default Dataset
