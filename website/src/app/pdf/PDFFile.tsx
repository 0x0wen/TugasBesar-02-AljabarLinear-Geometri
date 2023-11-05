import {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
	Image,
} from '@react-pdf/renderer'
import anjay from '../../../public/assets/car.jpg'
// Create styles
const styles = StyleSheet.create({
	body: {
		paddingTop: 35,
		paddingBottom: 65,
		paddingHorizontal: 35,
	},
	header: {
		margin: 12,
		fontSize: 24,
		textAlign: 'center',
	},
	text: {
		margin: 12,
		fontSize: 10,
		textAlign: 'justify',
	},
	image: {
		marginVertical: 10,
		marginHorizontal: 'auto',
		width: 300,
		objectFit: 'contain',
	},
	resultImage: {
		marginVertical: 15,
		marginHorizontal: 100,
		width: 200,
		minHeight: 100,
		objectFit: 'contain',
	},
	description: {
		fontSize: 12,
		marginBottom: 20,
		textAlign: 'center',
		color: 'grey',
	},
	result: {
		fontSize: 14,
		marginBottom: 20,
	},
	results: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
	},
	percentage: {
		fontSize: 10,
		marginBottom: 20,
		color: 'blue',
		marginHorizontal: 'auto',
	},
	pageNumber: {
		position: 'absolute',
		fontSize: 12,
		bottom: 30,
		left: 0,
		right: 0,
		textAlign: 'center',
		color: 'grey',
	},
})

const date = new Date()
const formattedDate =
	date.getDate() +
	'/' +
	(date.getMonth() + 1) +
	'/' +
	date.getFullYear() +
	' ' +
	date.getHours() +
	':' +
	date.getMinutes() +
	':' +
	date.getSeconds()

const dataResult = [
	{id: 1, image: '/assets/car.jpg', percentage: 0.5234},
	{id: 2, image: '/assets/car.jpg', percentage: 0.662},
	{id: 3, image: '/assets/car.jpg', percentage: 0.6245},
	{id: 4, image: '/assets/car.jpg', percentage: 0.5312},
	{id: 5, image: '/assets/car.jpg', percentage: 0.534},
	{id: 6, image: '/assets/car.jpg', percentage: 0.5456},
]
// Create Document Component
const PDFFile = () => (
	<Document title={`Result ${formattedDate}`}>
		<Page size="A4" style={styles.body}>
			<Text style={styles.text}>Created at {formattedDate}</Text>
			<Text style={styles.header}>CBIR Query Result</Text>
			<View>
				<Image src="/assets/car.jpg" style={styles.image} />
				<Text style={styles.description}>Query image</Text>
			</View>
			<View>
				<Text style={styles.result}>Results:</Text>
				<View style={styles.results}>
					{dataResult.map((result) => (
						<div>
							<Image src={result.image} style={styles.resultImage} />
							<Text style={styles.percentage}>
								{(result.percentage * 100).toFixed(2)}%
							</Text>
						</div>
					))}
				</View>
			</View>
		</Page>
	</Document>
)

export default PDFFile
