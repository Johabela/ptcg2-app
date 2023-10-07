import { useContext, useEffect, useState } from "react"
import { ApiContext } from "../contexts/ApiContext";
import { useParams } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function CardSearchByName() {

	// store the search results -> with the hook useState
	const [searchResults, setSearchResults] = useState([]);

	// api URL -> hook context -> bringing the api from ApiContext file 
	const {api} = useContext(ApiContext);

	// route param for the pokemon name 
	const {pokemonName} = useParams();

	// // api key 
	// let apiKey = "xxxxxxxxxxxxxxxx";
	// api key is stored in .env file set up below using -> process.env.REACT_APP_API_KEY
	let apiKey = process.env.REACT_APP_API_KEY;

	useEffect(() => {
		console.log("Card search component has mounted! Making a fetch request now...");

		async function apiRequest(){
			// built queryParams
			let queryParams = new URLSearchParams({
				q: 'name:' + pokemonName
			})
			let response = await fetch(api + 'cards?' + queryParams, {
				 // set up url api  you want to access then an object including the key 
				headers: {
					'X-Api-Key': apiKey
				}
			});

			//when we get a response it is converted to jason to work with the data
			let responseData = await response.json();
			// getting the data response in jason and putting in the state, here we set the state 
			setSearchResults(responseData.data);
		}

		apiRequest();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pokemonName]);

	return (
		<div>
			<h1>Card Search</h1>
			{/*  when the page loads, it will make a request to the api and once when the 
                data has returned from the api we save it to state and then   */}
			{searchResults.length > 0 && 
			<div>
			{/* it will render the name and id from the card that is in the search results  */}
				<h1>{searchResults[0].name} - {searchResults[0].id}</h1>

				{/* container here with rows and columns */}
				{/* put card in columns and let them responsively organise themselves  */}		
				<Container fluid style={{padding: "5%"}}>
					<Row style={{display: 'flex', flexWrap:'wrap'}}>
						{searchResults.map(result => {
							return <Col md>
							<PokemonCard key={result.id} 
								cardTitle={result.name} 
								imageUrl={result.images.small} 
								cardDescription={result.flavorText} 
							/>
							</Col>
						})}
					</Row>
				</Container>


				{/* we are showing cards for all data 
				we are passing data to a individual card  */}
				{searchResults.map(result => {
					return <PokemonCard key={result.id} 
					cardTitle={result.name} 
					imageUrl={result.images.small} 
					cardDescription={result.flavorText} 
					/>
				})}
			</div>
			}
		</div>
	)
}