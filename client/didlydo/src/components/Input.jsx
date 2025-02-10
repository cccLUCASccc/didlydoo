import { useState } from "react"
import { addAttendee } from "../service/api"
import '../style/Input.css'

const Input = ({id, date}) => {
    const [name, setName] = useState('')
    const dates = date.map(d => ({"date": d, "available": false}))


    const handleSetName = (e) => {
        setName(e.target.value)
    }
    
    const handleAddName = async () => {
        try {
            await addAttendee({
                "name": name, 
                "dates":dates
            }, id)
        } catch (err) {
            console.log(dates)
        }
    }
    
    // HTML: RAJOUTER UNE NOUVELLE PERSONNE A UN EVENT:
    // ------------------------------------------------
    return (
        <form class="form">
            <label htmlFor='name'>Inscription: </label>
            <input 
                onChange={handleSetName}
                type="text" 
                id="name" 
                placeholder="Enter your name here..." />
            <button class="btn btn-primary" onClick={handleAddName}> Submit</button>
        </form>
    )
}

export default Input;


