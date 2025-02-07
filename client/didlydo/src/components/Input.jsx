import { useState } from "react"
import { addAttendee, getEvent } from "../service/api"

const Input = ({id}) => {
    const [name, setName] = useState('')

    const handleSetName = (e) => {
        setName(e.target.value)
    }
    
    const handleAddName = async () => {
        try {
            await addAttendee({"name": name, "dates":[]}, id)
        } catch (err) {
            console.log('Error', err)
        }
    }
    

    // HTML: RAJOUTER UNE NOUVELLE PERSONNE A UN EVENT:
    // ------------------------------------------------
    return (
        <form>
            <label htmlFor='name'>Inscription: </label>
            <input 
                onChange={handleSetName}
                type="text" 
                id="name" 
                placeholder="Enter your name here..." />
            <button 
                onClick={handleAddName}> Submit</button>
        </form>
    )
}

export default Input;


