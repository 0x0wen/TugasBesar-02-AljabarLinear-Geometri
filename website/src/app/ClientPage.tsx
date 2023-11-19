'use client'
import {useState} from 'react'
import Input from './Input'
import Result from './Result'
import Image from 'next/image'
const ClientPage = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [inputSubmitted, setInputSubmitted] = useState(false)
	const [result, setResult] = useState([])
	const [imageURL, setImageURL] = useState('')
	const [time, setTime] = useState(0)
	const loadingHandler = () => {
		setIsLoading(!isLoading)
	}
	async function searchHandler(data: {
		parameter: string
		threshold: number
		file: any
	}) {
		const queryImage = URL.createObjectURL(data.file)
		setImageURL(queryImage)
		setIsLoading(true)
		const path = process.env.NEXT_PUBLIC_VERCEL_URL
			? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
			: 'http://localhost:3000/api'

		try {
			setInputSubmitted(true)
			setTimeout(() => {
				window.scrollTo({
					top: 800,
					behavior: 'smooth',
				})
			}, 200)
			const formData = new FormData()
			formData.append('threshold', data.threshold.toString())
			formData.append('parameter', data.parameter)
			formData.append('file', data.file)
			const response = await fetch(`${path}/query`, {
				method: 'POST',
				body: formData,
			})
			const resData = await response.json()
			setResult(resData.result)
			setTime(resData.time)
		} catch {
			console.error('Error sending query!')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<Input onSearch={searchHandler} />
			{inputSubmitted ? (
				<>
					<Result
						onLoading={isLoading}
						resultData={result}
						time={time}
						queryImage={imageURL}
					/>
				</>
			) : (
				<h3 className="mx-auto py-20 font-montserrat text-color4 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
					Result will be displayed here.
				</h3>
			)}
		</>
	)
}

export default ClientPage
