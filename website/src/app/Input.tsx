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
	onSearch = ({
		parameter,
		threshold,
		file,
	}: {
		parameter: string
		threshold: number
		file: any | null
	}) => {},
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
				<div className="relative border-2 border-color4 aspect-[4/3] w-80 sm:w-96 md:w-[28rem] lg:w-[32rem] h-auto flex justify-center items-center">
					<Button
						component="label"
						variant="text"
						className="w-full h-full "
						startIcon={<CollectionsIcon />}
						sx={{color: '#1EFF96'}}
					>
						<VisuallyHiddenInput
							type="file"
							onChange={handleFileChange}
							accept=".webp, .png, .jpeg, .jpg"
						/>
					</Button>
					{selectedFile && (
						<Image
							src={imageURL ? imageURL : ''}
							alt="Image preview"
							width={400}
							height={300}
							className="absolute sm:w-full top-0 object-contain h-full mx-auto mb-4 sm:mb-0 pointer-events-none"
						/>
					)}
				</div>
			)}

			<section className="flex flex-col gap-8 justify-center sm:place-content-between sm:py-2 text-color5">
				<section>
					<h2 className="font-montserrat font-bold mb-2 md:mb-4">
						Choose your method
					</h2>
					<section className="flex gap-4">
						<Button
							component="label"
							variant={showCamera ? 'outlined' : 'contained'}
							className={
								showCamera
									? 'w-fit mx-auto border-none  hover:border-color3'
									: 'bg-color3 hover:bg-color3 text-color1'
							}
							startIcon={<FileUploadIcon />}
							onClick={onCloseCamera}
							sx={{color: '#1EFF96'}}
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
							className={
								showCamera
									? 'bg-color3 hover:bg-color3  text-color1'
									: 'w-fit mx-auto border-none hover:border-color3'
							}
							startIcon={<PhotoCameraIcon />}
							onClick={onOpenCamera}
							sx={{color: '#1EFF96'}}
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
						className="mx-auto text-color5"
					>
						<Typography
							className={
								checked
									? 'font-montserrat text-color4'
									: 'font-montserrat text-color5'
							}
						>
							Color
						</Typography>
						<FormControlLabel
							control={
								<MaterialUISwitch checked={checked} onChange={checkHandler} />
							}
							label=""
						/>
						<Typography
							className={
								checked
									? 'font-montserrat text-color5'
									: 'font-montserrat text-color4'
							}
						>
							Texture
						</Typography>
					</Stack>
					<Box sx={{width: 250}}>
						<Typography
							id="non-linear-slider"
							gutterBottom
							className="text-color4"
						>
							Threshold: {threshold}%
						</Typography>
						<Slider
							value={threshold}
							min={20}
							step={1}
							max={100}
							onChange={thresholdHandler}
							aria-labelledby="non-linear-slider"
							sx={{color: '#1EFF96'}}
						/>
					</Box>
					<Button
						variant="outlined"
						className="w-fit mx-auto bg-color3 border-color3 hover:border-color3 text-color1 hover:bg-color3"
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
