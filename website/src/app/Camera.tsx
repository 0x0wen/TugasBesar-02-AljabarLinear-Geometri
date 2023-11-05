'use client'
import {useCallback, useEffect, useRef, useState} from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
const videoConstraints = {
	width: 540,
	facingMode: 'environment',
}

const Camera = () => {
	const webcamRef = useRef(null)
	const [url, setUrl] = useState(null)
	const [count, setCount] = useState(15)

	const capturePhoto = useCallback(async () => {
		const imageSrc = webcamRef.current.getScreenshot()
		setUrl(imageSrc)
	}, [webcamRef])
	useEffect(() => {
		// Check if the count is zero, and if so, call the onComplete callback
		if (count === 0) {
			capturePhoto()
			setCount(15)
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
	const onRefresh = () => {
		setUrl(null)
		setCount(3)
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
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
					<h1>{count}</h1>
				</div>
			</div>
			{url && (
				<section className='mt-5'>
					<h2 className='font-montserrat'>Result:</h2>
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
