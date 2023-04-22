//@ts-check
import PropTypes from "prop-types";
import './App.css';
import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{ pokemon.name.english }</td>
    <td>{ pokemon.type.join(", ") }</td>
    <td>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onSelect(pokemon)}
      >Select</Button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon : PropTypes.shape({
    name : PropTypes.shape({
      english: PropTypes.string,
    }),
    type: PropTypes.arrayOf(PropTypes.string),
  })
};

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {
        Object.keys(base).map(key => (
          <tr key={key}>
            <td>{ key }</td>
            <td>{base[key]}</td>
          </tr>
        ))
      }
    </table>
  </div>
)

const Title = styled.h1`
  text-align: center;
`;
const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1rem;
`;
const Container = styled.div`
  margin: auto;
  width: 800px;
  paddingTop: 1rem;
`;
const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;

function App() {
  const [filter, filterSet] = React.useState("");
  const [pokemon, pokemonSet] = React.useState([]);
  const [selectedItem, selectedItemSet] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then(resp => resp.json())
      .then(data => pokemonSet(data))
  }, [])

  return (
    <Container>
      <Title>Pokemon Search</Title>
      <TwoColumnLayout>
        <div>
          <Input  
            value={filter}
            onChange={(evt) => filterSet(evt.target.value)}      
          />
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              { pokemon
                .filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLocaleLowerCase()))
                .slice(0,20).map(pokemon => (
                <PokemonRow 
                  pokemon={pokemon} 
                  key={pokemon.id} 
                  onSelect={(pokemon) => selectedItemSet(pokemon)}/>
            )) }
            </tbody>
          </table>
        </div>
        {selectedItem && <PokemonInfo {...selectedItem} />}
      </TwoColumnLayout>
    </Container>
  );
}

export default App;
