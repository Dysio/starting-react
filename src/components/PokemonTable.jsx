import React, { useContext } from "react";
import PokemonRow from "./PokemonRow";
import PokemonContext from "../PokemonContext";

const PokemonTable = () => {
    const { pokemon, filter, selectedPokemonSet } = useContext(PokemonContext);
    
    return (
    <table width="100%">
        <thead>
            <tr>
            <th>Name</th>
            <th>Type</th>
            </tr>
        </thead>
        <tbody>
            {pokemon
            .filter((pokemon) => 
                pokemon.name.english
                .toLowerCase()
                .includes(filter.toLocaleLowerCase()))
            .slice(0,20).map(pokemon => (
            <PokemonRow 
                pokemon={pokemon} 
                key={pokemon.id} 
                onSelect={(pokemon) => selectedPokemonSet(pokemon)}/>
        )) }
        </tbody>
    </table>
)};

export default PokemonTable;