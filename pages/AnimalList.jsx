

export function AnimalList({animalInfos}) {
    return (
        <table className="animal-list">
            <caption>Rare Animals</caption>
            {
                animalInfos.map(({type, count}) => 
                    <tr>
                        <td>{type}</td>
                        <td>{count}</td>
                        <td><a href={`https://www.google.com/search?q=${type}`} target="_blanck">Search</a></td>
                    </tr>
                )
            }
        </table>
    )
}