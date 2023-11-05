'use client'
import {PDFViewer} from '@react-pdf/renderer'
import PDFFile from './PDFFile'

const PDFPage = () => {
	return (
		<div className='w-screen h-screen'>
			<PDFViewer width={'100%'} height={'100%'}>
				<PDFFile />
			</PDFViewer>
		</div>
	)
}

export default PDFPage
