'use client'
import {useCallback, useEffect, useRef, useState} from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
const videoConstraints = {
	width: 540,
	facingMode: 'environment',
}

const Camera = ({onSearch}: {onSearch: (image: any) => void}) => {
	const webcamRef = useRef(null)
	const [url, setUrl] = useState(null)
	const [count, setCount] = useState(5)

	function base64ToBlob(base64String: string, contentType = '') {
		const byteCharacters = atob(base64String)
		const byteNumbers = new Array(byteCharacters.length)

		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i)
		}

		const byteArray = new Uint8Array(byteNumbers)
		return new Blob([byteArray], {type: contentType})
	}

	// Convert a Blob to a File
	function blobToFile(blob: any, fileName: any) {
		return new File([blob], fileName, {type: blob.type})
	}

	const capturePhoto = useCallback(async () => {
		const imageSrc = webcamRef.current.getScreenshot()
		const base64Image = imageSrc.replace(/^data:image\/webp;base64,/, '')
		const blob = base64ToBlob(base64Image, 'image/webp') // Specify the image format
		const file = blobToFile(blob, 'taken_by_webcam.webp') // Specify the file name
		setUrl(imageSrc)
		onSearch(file)
	}, [webcamRef])
	useEffect(() => {
		// Check if the count is zero, and if so, call the onComplete callback
		if (count === 0) {
			capturePhoto()
			setCount(5)
		} else {
			// Decrease the count by 1 every second
			const timer = setTimeout(() => {
				setCount(count - 1)
			}, 1000)

			// Clear the timer when the component unmounts
			return () => clearTimeout(timer)
		}
	}, [count, capturePhoto])
	const onUserMedia = (e: any) => {
		console.log(e)
	}

	return (
		<div className=" w-fit">
			<div className="relative">
				<Webcam
					ref={webcamRef}
					audio={false}
					screenshotFormat="image/webp"
					videoConstraints={videoConstraints}
					onUserMedia={onUserMedia}
					mirrored={true}
					className="aspect-[4/3] w-80 sm:w-96 md:w-[28rem] lg:w-[32rem] "
				/>
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-montserrat text-white text-5xl">
					<h1>{count}</h1>
				</div>
			</div>
			{url && (
				<section className="mt-5">
					<h2 className="font-montserrat">Result:</h2>
					<Image
						src={url}
						width={200}
						height={200}
						alt="Image preview"
						className=" w-full "
					/>
				</section>
			)}
		</div>
	)
}
export default Camera
