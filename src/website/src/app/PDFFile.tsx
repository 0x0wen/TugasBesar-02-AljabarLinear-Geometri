import {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
	Image,
} from '@react-pdf/renderer'
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
		minWidth: 100,
		minHeight: 100,
		objectFit: 'contain',
		maxHeight: 100,
		maxWidth: 100,
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
		gap: 10,
	},
	resultItem: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
		marginHorizontal: 10,
		width: 100,
		height: 150,
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

const PDFFile = ({
	resultData,
	time,
	queryImage,
}: {
	resultData: any
	time: any
	queryImage: any
}) => (
	<Document title={`Result ${formattedDate}`}>
		<Page size="A4" style={styles.body}>
			<Text style={styles.text}>Created at {formattedDate}</Text>
			<Text style={styles.header}>CBIR Query Result</Text>
			<View>
				<Image src={queryImage} style={styles.image} />
				<Text style={styles.description}>Query image</Text>
				<Text style={styles.description}>
					Searched in {time.toFixed(2)} seconds
				</Text>
			</View>
			<View>
				<Text style={styles.result}>Results:</Text>
				<View style={styles.results}>
					{resultData.map((result: any) => (
						<View style={styles.resultItem}>
							<Image
								src={`data:image/jpeg;base64,${result.image}`}
								style={styles.resultImage}
							/>
							<Text style={styles.percentage}>
								{result.persentasePersamaan.toFixed(2)}%
							</Text>
						</View>
					))}
				</View>
			</View>
		</Page>
	</Document>
)

export default PDFFile
