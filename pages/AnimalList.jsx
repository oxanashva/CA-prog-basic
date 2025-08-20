const { useEffect } = React


export function AnimalList({animalInfos, onChangeBackground}) {
    useEffect(() => {
        onChangeBackground({backgroundColor: 'brown', color: 'white'})
    }, [])

    return (
        <section className="animal-list">
            <table>
                <caption>Rare Animals</caption>
                <tbody>
                    {
                    animalInfos.map(({id, type, count}) => 
                        <tr key={id}>
                            <td>{type}</td>
                            <td>{count}</td>
                            <td><a href={`https://www.google.com/search?q=${type}`} target="_blanck">Search</a></td>
                        </tr>
                    )
                }
                </tbody>
        </table>
        </section>
    )
}