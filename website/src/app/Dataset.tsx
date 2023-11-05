'use client'
import Button from '@mui/material/Button'
import { styled } from '@mui/material'


const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
})
const Dataset = () => {
	return (
		<>
			{/* upload dataset section */}
			<section className="mx-auto">
				<Button component="label" variant="contained" className="w-fit mx-auto">
					Upload Dataset
					<VisuallyHiddenInput type="file" />
				</Button>
			</section>
		</>
	)
}

export default Dataset
