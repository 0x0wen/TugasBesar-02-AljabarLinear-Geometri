'use client'
import {useState} from 'react'
import Input from './Input'
import Result from './Result'

const ClientPage = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [inputSubmitted, setInputSubmitted] = useState(false)
	const [result, setResult] = useState({})
	const loadingHandler = () => {
		setIsLoading(!isLoading)
	}
	const searchHandler = ({
		parameter,
		threshold,
		file,
	}: {
		parameter: string
		threshold: number
		file: any
	}) => {
		console.log(parameter)
		console.log(threshold)
		console.log(file)
		setInputSubmitted(true)
		setIsLoading(false)
		setTimeout(() => {
			window.scrollTo({
				top: 800,
				behavior: 'smooth',
			})
		}, 200)
	}
	async function searchHandlers(data: {
		parameter: string
		threshold: number
		file: any
	}) {
		console.log(data.threshold, data.parameter, data.file)
		const URL = process.env.NEXT_PUBLIC_VERCEL_URL
			? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
			: 'http://localhost:3000/api'

		try {
			setInputSubmitted(true)
			setIsLoading(false)
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
			const response = await fetch(`${URL}/query`, {
				method: 'POST',
				body: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			const resData = await response.json()
			console.log(resData)
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
				<Result onLoading={isLoading} resultData={result} />
			) : (
				<h3 className="mx-auto py-20 font-montserrat text-color4 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
					Result will be displayed here.
				</h3>
			)}
		</>
	)
}

export default ClientPage
