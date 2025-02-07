import { Link } from "react-router-dom"
import {getEvents} from "../service/api"
import { useEffect, useState } from "react"
import Input from "./Input"
import '../style/Home.css'
import Checkbox from "./Checkbox"

const Home = () => {
    const[events, setEvents] = useState([])
    const[num, setNum] = useState(0)
    const[date, setDate] = useState("")
    useEffect(() => {
        const grabEvents = async () => {
            try {
                const response = await getEvents()
                setEvents(response.data)
            } catch (err) {
                console.log("Error grabing events", err);
            }
        }
        grabEvents()
    }, [])
    

    const handleChangeNumber = (e) => {
        setNum(Number(e.target.value))
    }

    return (
        <>
        <div className="container">
            <div>
                <h1>Didlydoo</h1>
                <Link to="/Formulaire">
                    <button>Add Event</button>
                </Link>
                <form>
                    <input 
                        id ="num" 
                        type="number"
                        value={num}
                        onChange={handleChangeNumber}>
                    </input>
                </form>
                {num > 0  && num <= events.length ?  
                (<div>
                    <h3>{events[num - 1].name} by {events[num - 1].author}</h3>
                    <p>{events[num - 1].description}</p>
                    <div>
                        <table border={1}>
                            <thead>
                                <tr>
                                    <th>Noms</th>
                                    {events[num-1].dates.map((d, i) => (<th><p key={i}>{d.date}</p></th>))}
                                </tr>
                            </thead>
                            <tbody>
                                {[...new Set(events[num - 1].dates.flatMap(d => (d.attendees.map(a => a.name ,setDate(a.date)))))].map((name, i) => (
                                    <tr>
                                        <td><p key={i}>{name}</p></td>
                                        {events[num-1].dates.map(() =>
                                            <td><Checkbox nom={name} date={date}/></td>
                                        )}
                                    </tr>))}
                            </tbody>
                        </table>
                    </div>
                    <Input id = {events[num-1].id}/>
                    <hr />
                </div>)
                : 
                (events.length > 0 ? (events.map((e, index) => (
                    <div key={index}>
                        <h3>{e.name} (by {e.author})</h3>
                        <p>{e.description}</p>
                        <div >
                            <table  border={1}>
                                <thead>
                                    <tr>
                                        <th>Noms</th>
                                        {e.dates.map((d, i) => (<th><p key={i}>{d.date}</p></th>))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...new Set(e.dates.flatMap(d => (d.attendees.map(a => a.name))))].map((name, i) => (
                                        <tr>
                                            <td><p key={i}>{name}</p></td>
                                            {e.dates.map(() =>
                                                <td><Checkbox /></td>
                                            )}
                                        </tr>))}
                                </tbody>
                            </table>
                        </div>
                        <Input id = {e.id}/>
                        <hr />
                    </div>
                ))
                ) : (
                <h2>Pas d'événement dans la liste.</h2>
                ))}
            </div>
        </div>
        </>
    )
}

export default Home;























