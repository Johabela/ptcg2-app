


export default function CardSearchByName() {

		// store the search results -> with the hook useState
		const [searchResults, setSearchResults] = useState([]);

		// api URL -> hook context -> bringing the api from ApiContext file  
		const {api} = useContext(ApiContext);
	
		// route param for the pokemon name 
		const {pokemonName} = useParams();
	
		// api key 
		let apiKey = "9d26c7cf-9185-4fb7-be27-38c00c67dcda";
	
		useEffect(() => {
			console.log("Card search component has mounted! Making a fetch request now...");
	
			async function apiRequest(){

				// built queryParams 
				let queryParams = new URLSearchParams({
					q: 'name:' + pokemonName
				})
				let response = await fetch (api + 'cards?' + queryParams{
					// set up url api  you want to access then an object including the key 
					headers: {
					'X-Api-Key': apiKey
					}
				})

			}
	
		}, []);
	
		return (
			<div>
				<h1>Card Search</h1>
			</div>
		)
}

