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
	const searchHandler = (data: {
		parameter: string
		threshold: number
		file: File
	}) => {
		console.log(data)
		setInputSubmitted(true)
		setIsLoading(false)
	}
	async function searchHandlers(data: {
		parameter: string
		threshold: number
		file: File
	}) {
		console.log(data.file, data.threshold, data.parameter)
		const URL = process.env.NEXT_PUBLIC_VERCEL_URL
			? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
			: 'http://localhost:3000/api'
		try {
			const input = {
				threshold: data.threshold,
				parameter: data.parameter,
				file: data.file,
			}
			const response = await fetch(`${URL}/input`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(input),
			})
			const resData = await response.json()
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
				<h3 className="mx-auto py-20 font-montserrat text-color2 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
					Result will be displayed here.
				</h3>
			)}
		</>
	)
}

export default ClientPage