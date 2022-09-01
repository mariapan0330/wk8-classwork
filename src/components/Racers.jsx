import React, { useState, useEffect } from 'react'

export default function Racers(props){
    const [racers, setRacers] = useState([]);

    // we are going to use these with the useEffect so we know what to fetch based on the season and round.
    const[season, setSeason] = useState(2022);
    const[round, setRound] = useState(1)


    useEffect(() => {
        console.log('useEffect effect callback executed');
        fetch(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let racerStandings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            setRacers(racerStandings)
        })
    }, [season, round]) // [] at the end of useEffect makes it only run if the stuff inside the square brackets is different than before. If the [] are empty, useEffect only runs once.
    // To force it to depend on the current STATE, put the states in the square brackets. This will make it only change if whatever is in the square brackets is different than it previously was


    function handleRacerSubmit(e){
        e.preventDefault()
        console.log(e)
        let newSeason = e.target.season.value // grabbed from 'season' tags in form in Racers.jsx
        let newRound = e.target.round.value
        e.target.season.value = ''
        e.target.round.value = ''

        console.log(newSeason, newRound);

        setSeason(newSeason) // from the useState function, allows it to re-render the current Season and update it to newSeason. Also forces re-render of useEffect because the value of Season is different from before.
        setRound(newRound)
    }



    let tableHeaders = ['#', 'Name','Points','Wins','Nationality','Constructor']
    return (
        <div className='row py-3'>
            <h4 className="text-center">Driver Standings</h4>
            <form onSubmit={handleRacerSubmit}>
                <input type="text" className='form-control' name='season' placeholder='Season' />
                <input type="text" className='form-control' name='round' placeholder='Round' />
                <input type="submit" value='Submit' />
            </form>
            <table className="table table-dark table-striped mt-3">
                <thead>
                    <tr>
                        {tableHeaders.map((th,i) => <th key={i}>{th}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {racers.map((racer, idx) => {
                        return (<tr key={idx}>
                            <th>{racer.position}</th>
                            <td>{racer.Driver.givenName} {racer.Driver.familyName}</td>
                            <td>{racer.points}</td>
                            <td>{racer.wins}</td>
                            <td>{racer.Driver.nationality}</td>
                            <td>{racer.Constructors[0].name}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}