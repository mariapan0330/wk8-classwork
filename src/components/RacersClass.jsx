// we want to make Racers into a Class. To do this, inherit the Component class, make render() method, and move everything into it.
// class components have props built-in too, so change anything that said props to 'this.props' instead. 

import React, { Component } from 'react'
export default class RacersClass extends Component {
    constructor(props){ // this basically the __init__ method of RacersClass; it lets you set the states without using the setStates method.
    // it always takes in props and calls super(props)
        super(props)
        this.state = { // just have one state per class, but the state can have multiple properties.
            racers: [],
            season: 2022,
            round: 1
        }
    }

    // want to fetch the data without using useEffect
    // for that you need both componentDidMount for the initial render and componentDidUpdate to render subsequent updates
    componentDidMount(){
        console.log('component mounted');
        // we had called the setRacers function before but that used useState and we also don't want to do that. Instead, change the state using setState method on 'this' class
        // also before, useEffect would be triggered by having an input that's different from what it was before. To do this without useEffect, we gotta use componentDidUpdate() which i put below.
        // this is the INITIAL render
        fetch(`https://ergast.com/api/f1/${this.state.season}/${this.state.round}/driverStandings.json`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let racerStandings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            console.log(racerStandings)
            this.setState({racers: racerStandings}) // reassigns 'this.racers' variable to the current racerStandings.
        })
    }


    componentDidUpdate(prevProps, prevState){
        // console.log(prevProp, this.props);
        // console.log(prevState, this.state);
        // this only renders when the input updates
        if (prevState.round !== this.state.round || prevState.season !== this.state.season){
            fetch(`https://ergast.com/api/f1/${this.state.season}/${this.state.round}/driverStandings.json`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                let racerStandings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                console.log(racerStandings)
                this.setState({racers: racerStandings}) // reassigns 'this.racers' variable to the current racerStandings.
            })
        }
    }


    handleRacerSubmit = (e) => {
        // prevent default of refreshing page
        e.preventDefault();
        let newSeason = e.target.season.value // grabbed from 'season' and 'round' tags in form in your render
        let newRound = e.target.round.value
        e.target.season.value = ''
        e.target.round.value = ''
        this.setState({
            season: newSeason,
            round: newRound
        })
    }


    
    
    
    // 'Component' is a special built-in class with React. 
    // render method is part of 'Component'. it does not accept parameters and it will return our HTML
    render () {
        // console.log(this.props.test);
        let tableHeaders = ['#', 'Name','Points','Wins','Nationality','Constructor']
        return (
            <>
            {/* {this.props.setStandingsActive('active')}
            {this.props.setHomeActive('')}
            {this.props.setRegisterActive('')} */}
            <div className='row py-3'>
                <h4 className="text-center">Driver Standings</h4>
                <form onSubmit={this.handleRacerSubmit}>
                    <input type="text" className='form-control' name='season' placeholder='Season' />
                    <input type="text" className='form-control' name='round' placeholder='Round' />
                    <input type="submit" value='Submit' />
                </form>
                {/* { this.state.racers.length} */}
                <table className="table table-dark table-striped mt-3">
                    <thead>
                        <tr>
                            {tableHeaders.map((th,i) => <th key={i}>{th}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {/* in the following, use this.state to access the state instead of just racers */}
                        {this.state.racers.map((racer, idx) => {
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
            </>
        )
    }
}