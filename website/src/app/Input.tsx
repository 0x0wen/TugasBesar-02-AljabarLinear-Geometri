'use client'
import Image from 'next/image'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import FormControlLabel from '@mui/material/FormControlLabel'
import SearchIcon from '@mui/icons-material/Search'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import CollectionsIcon from '@mui/icons-material/Collections'
import VisuallyHiddenInput from './components/input/VisuallyHiddenInput'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import MaterialUISwitch from './components/buttons/MaterialUISwitch'
import {useState, useRef, useEffect} from 'react'
import Camera from './Camera'
const Input = ({
	onSearch,
}: {
	onSearch: (data: {
		parameter: string
		threshold: number
		file: File | null
	}) => void
}) => {
	const [selectedFile, setSelectedFile] = useState(null)
	const [showCamera, setShowCamera] = useState(false)
	const [threshold, setThreshold] = useState(60)
	const [checked, setChecked] = useState(true)
	const formRef = useRef(null)

	// Use useEffect to submit the form after each photo is taken
	useEffect(() => {
		let intervalId: any

		if (showCamera) {
			// Enable automatic form submission only when the camera is open
			intervalId = setInterval(() => {
				formRef.current && formRef.current.submit()
			}, 5000)
		}
		return () => clearInterval(intervalId)
	}, [showCamera])
	const checkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked)
	}
	const onOpenCamera = () => {
		setShowCamera(true)
	}
	const onCloseCamera = () => {
		setShowCamera(false)
	}
	const handleFileChange = (event: any) => {
		const file = event.target.files[0]
		setSelectedFile(file)
	}
	const thresholdHandler = (event: Event, newValue: number | number[]) => {
		if (typeof newValue === 'number') {
			setThreshold(newValue)
		}
	}
	const handleSearch = (e: any) => {
		e.preventDefault()
		onSearch({parameter, threshold, selectedFile})
	}
	const handleSearchCamera = (image: any) => {
		setSelectedFile(image)
	}
	const imageURL = selectedFile ? URL.createObjectURL(selectedFile) : null
	const parameter = checked ? 'texture' : 'color'
	return (
		/* upload image section */
		<form
			ref={formRef}
			onSubmit={handleSearch}
			className="upload text-center w-fit mx-auto flex flex-wrap justify-center  gap-4 md:gap-8 lg:gap-20 m-4 p-4 rounded-xl text-color1 shadow-md shadow-color2"
		>
			{showCamera ? (
				<Camera onSearch={handleSearchCamera} />
			) : (
				<div className="relative border-2 border-white aspect-[4/3] w-80 sm:w-96 md:w-[28rem] lg:w-[32rem] h-auto flex justify-center items-center">
					<Button
						component="label"
						variant="text"
						className="w-full h-full "
						startIcon={<CollectionsIcon />}
					>
						<VisuallyHiddenInput
							type="file"
							onChange={handleFileChange}
							accept=".webp, .png, .jpeg, .jpg"
						/>
					</Button>
					{selectedFile && (
						<Image
							src={imageURL}
							alt="Image preview"
							width={400}
							height={300}
							className="absolute sm:w-full top-0 object-contain h-full mx-auto mb-4 sm:mb-0 pointer-events-none"
						/>
					)}
				</div>
			)}

			<section className="flex flex-col gap-8 justify-center sm:place-content-between sm:py-2 ">
				<section>
					<h2 className="font-montserrat font-bold mb-2 md:mb-4">
						Choose your method
					</h2>
					<section className="flex gap-4">
						<Button
							component="label"
							variant={showCamera ? 'outlined' : 'contained'}
							className="w-fit mx-auto"
							startIcon={<FileUploadIcon />}
							onClick={onCloseCamera}
						>
							Upload file
							<VisuallyHiddenInput
								type="file"
								onChange={handleFileChange}
								accept=".webp, .png, .jpeg, .jpg"
							/>
						</Button>
						<Button
							component="label"
							variant={showCamera ? 'contained' : 'outlined'}
							className="w-fit mx-auto"
							startIcon={<PhotoCameraIcon />}
							onClick={onOpenCamera}
						>
							Take photo
						</Button>
					</section>
				</section>
				<section className="flex flex-col gap-4 mx-auto">
					<Stack
						direction="row"
						spacing={1}
						alignItems="center"
						className="mx-auto"
					>
						<Typography>Color</Typography>
						<FormControlLabel
							control={
								<MaterialUISwitch checked={checked} onChange={checkHandler} />
							}
							label=""
						/>
						<Typography>Texture</Typography>
					</Stack>

					<Box sx={{width: 250}}>
						<Typography id="non-linear-slider" gutterBottom>
							Threshold: {threshold}%
						</Typography>
						<Slider
							value={threshold}
							min={10}
							step={1}
							max={100}
							onChange={thresholdHandler}
							aria-labelledby="non-linear-slider"
						/>
					</Box>
					<Button
						variant="outlined"
						className="w-fit mx-auto"
						endIcon={<SearchIcon />}
						type="submit"
					>
						Search
					</Button>
				</section>
			</section>
		</form>
	)
}

export default Input
