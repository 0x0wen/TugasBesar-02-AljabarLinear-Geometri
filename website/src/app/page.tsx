import Pagination from '@mui/material/Pagination'
import Input from './Input'
import Result from './Result'
import Dataset from './Dataset'
import Info from './Info'
import Header from './Header'

export default function Home() {
	
	return (
		<main className="bg-color2 min-h-screen flex flex-col gap-8">
			<Info />
			<Header
				title="lensa."
				description="CBIR (Content-Based Image Retrieval) is about finding images based on
					their visual content, not text. It's used in image search engines and
					medical imaging to make retrieval more accurate."
			/>
			<Dataset />
			<Input />
			<Result />
		</main>
	)
}
