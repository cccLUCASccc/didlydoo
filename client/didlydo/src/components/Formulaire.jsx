import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import '../style/Formulaire.css'
import { addEvent } from "../service/api"

const Formulaire = () => {

const [name, setName] = useState('')
const [firstname, setFirstname] = useState('')
const [lastname, setLastname] = useState('')
const [description, setDescription] = useState('')
const [dates, setDates] = useState([])
    
const handleSetName = (e) => {
    setName(e.target.value)
}
const handleSetFirstname = (e) => {
    setFirstname(e.target.value)
}

const handleSetLastname = (e) => {
    setLastname(e.target.value)
}

const handleSetDescription = (e) => {
    setDescription(e.target.value)
}
const handleSetDate = (e) => {
    if(dates.length < 5)
        setDates([...dates, e.target.value])
    else
        alert("Vous ne pouvez pas ajouter de dates supplémentaire.")
}

const handleAddEvent = async () => {
    try {
       const author = `${firstname} ${lastname}`
        const event = {
        name: name,
        description: description,
        author: author,
        dates: dates
        }
        await addEvent(event)
        alert('Event added successfully')
    } catch (err) {
        console.log("Error to submit event", err);
    }
}

// HTML: FORMULAIRE POUR CREER UN NOUVELLE EVENT:
// ----------------------------------------------
    return (
        <div className="container">
            <h2>Add a new event</h2>
            <form class="input-group"action="submit">
                <h3>Name of the event:</h3>
                <input 
                    type="text"
                    onChange={handleSetName}
                    placeholder="Enter a name..." 
                />
                <h3>Firstname:</h3>
                <input 
                    type="text" 
                    onChange={handleSetFirstname}
                    placeholder="Enter your firstname..."
                />
                <h3>Lastname:</h3>
                <input 
                    type="text" 
                    onChange={handleSetLastname}
                    placeholder="Enter your lastname..."
                />
                <h3>Description of the event:</h3>
                <textarea
                    class = "description" 
                    onChange={handleSetDescription}
                    placeholder="Enter a description for this event..."
                >
                </textarea>
                <h3>Dates:</h3>
                <div className ="dates">
                    <input type="date" 
                    onChange={handleSetDate}/>
                    <table><tr>{dates.map((d => <td>{d}</td>))}</tr></table>
                </div>

                <Link to='/'>
                    <button class="btn btn-primary" onClick={handleAddEvent}>Submit</button>
                </Link>
            </form>
        </div>
    )
}


export default Formulaire;