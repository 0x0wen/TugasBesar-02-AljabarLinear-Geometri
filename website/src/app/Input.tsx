'use client'
import Image from 'next/image'
import Button from '@mui/material/Button'
import {styled} from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import {Switch} from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import SearchIcon from '@mui/icons-material/Search'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import CollectionsIcon from '@mui/icons-material/Collections'
import VisuallyHiddenInput from './components/input/VisuallyHiddenInput'
import color from '../../public/assets/color.png'
import texture from '../../public/assets/texture.png'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import MaterialUISwitch from './components/buttons/MaterialUISwitch'
import {useState} from 'react'
import Camera from './Camera'
const Input = () => {
	const [selectedFile, setSelectedFile] = useState(null)
	const [value, setValue] = useState<number>(60)
	const [showCamera, setShowCamera] = useState(false)

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
	const handleChange = (event: Event, newValue: number | number[]) => {
		if (typeof newValue === 'number') {
			setValue(newValue)
		}
	}
	const onSearch = () =>{

	}
	const imageURL = selectedFile ? URL.createObjectURL(selectedFile) : null
	return (
		/* upload image section */
		<section className="upload text-center w-fit mx-auto flex flex-wrap justify-center  gap-4 md:gap-8 lg:gap-20 m-4 p-4 rounded-xl text-color1 shadow-md shadow-color2">
			{showCamera ? (
				<Camera />
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
							variant="contained"
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
							variant="contained"
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
							control={<MaterialUISwitch defaultChecked />}
							label=""
						/>
						<Typography>Texture</Typography>
					</Stack>

					<Box sx={{width: 250}}>
						<Typography id="non-linear-slider" gutterBottom>
							Threshold: {'>'}
							{value}%
						</Typography>
						<Slider
							value={value}
							min={5}
							step={1}
							max={100}
							onChange={handleChange}
							valueLabelDisplay="auto"
							aria-labelledby="non-linear-slider"
						/>
					</Box>
					<Button
						component="label"
						variant="contained"
						className="w-fit mx-auto"
						endIcon={<SearchIcon />}
						onSubmit={onSearch}
					>
						Search
					</Button>
				</section>
			</section>
		</section>
	)
}

export default Input
