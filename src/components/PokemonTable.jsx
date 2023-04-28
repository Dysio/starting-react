import React, { useContext } from "react";
import PokemonRow from "./PokemonRow";
import PokemonContext from "../PokemonContext";

const PokemonTable = () => {
    const { state: { pokemon, filter}, dispatch } = useContext(PokemonContext);
    
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
                onClick={(pokemon) =>
                    dispatch({ 
                        type: "SET_SELECTED_POKEMON",
                        payload: pokemon,
                })
                }/>
        )) }
        </tbody>
    </table>
)};

export default PokemonTable;