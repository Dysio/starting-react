import { useSelector } from "react-redux";

const PokemonInfo = () => {
  const selectedPokemon = useSelector((state) => state.selectedPokemon);

  return selectedPokemon ? (
    <div>
      <h1>{selectedPokemon.name.english}</h1>
      <table>
        <tbody>
            {
            Object.keys(selectedPokemon.base).map(key => (
                <tr key={key}>
                <td>{ key }</td>
                <td>{selectedPokemon.base[key]}</td>
                </tr>
            ))
            }
        </tbody>
      </table>
    </div>
  ) : null;
};

export default PokemonInfo;