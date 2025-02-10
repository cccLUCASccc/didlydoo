import { Link } from "react-router-dom"
import {getEvents, deleteEvent} from "../service/api"
import { useEffect, useState } from "react"
import Input from "./Input"
import '../style/Home.css'
import Checkbox from "./Checkbox"
const Home = () => {
    const[events, setEvents] = useState([])
    const[eventCopy, setEventsCopy] = useState([])

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
    
    const handleDelete = async (e) => {
        
        const isConfirmed = window.confirm("Are you sure you want to delete this event?");
        if (!isConfirmed) return;

        try {
            await deleteEvent(e.id)
            setEvents(events.filter(event => event.id !== e.id));
        } catch (err) {
            console.log('Error', err)
        }
    }

    const chooseevent = (e) => {
        setEventsCopy(events)
        setEvents(events.filter(elem => elem.name === e.target.value))
    }

    const home = () => {
        setEvents(eventCopy)
    }

    return (
        <>
        <div className="container">
            <div>
                <h1>Didlydoo</h1>
                <hr style={{ border: "3px solid" }} />
                <div className="menu">
                    <Link to="/Formulaire">
                        <button class="btn btn-primary">Add Event</button>
                    </Link>
                    <button class="btn btn-primary" onClick={home}>Home</button>
                </div>
                <form className="form-input">
                    <select class="form-select" onChange={chooseevent}>
                        {events.map(e =>
                            <option id ={e.id} value={e.name}>{e.name}</option>
                        )}
                    </select>
                </form>
                
                {(events.length > 0 ? (events.map((e, index) => (
                    <div key={index}>
                        <h3>{e.name} (by {e.author})</h3>
                        <p>{e.description}</p>
                        <div >
                            <table class="table table-stripped table-hover" border={1}>
                                <thead>
                                    <tr>
                                        <th>Noms</th>
                                        {e.dates.map((d, i) => (<th><p key={i}>{d.date}</p>
                                            </th>))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...new Set(e.dates.flatMap(d => (d.attendees.map(a => a.name))))].map((name, i) => (
                                        <tr>
                                            <td><p key={i}>{name}</p></td>
                                            {e.dates.map((d) =>
                                                <td><Checkbox id={e.id} nom={name} date={d} dates={e.dates}/></td>
                                            )}
                                        </tr>
                                    ))}                                   
                                </tbody>
                            </table>
                        </div>
                        <div class='row'>
                            <Input class="form" id = {e.id} date={e.dates.map(d => d.date)}/>
                            <button class="btn btn-primary" onClick={() => handleDelete(e)}>Delete Event</button>
                        </div>
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























