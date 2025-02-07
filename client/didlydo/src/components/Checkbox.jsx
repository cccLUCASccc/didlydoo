import { useState} from 'react';
import '../style/Checkbox.css'

const Checkbox = (nom, date) => {
    const [isChecked, setIschecked] = useState(false)

    const handleCheckboxChange = () =>{
        console.log({date})
        console.log({nom})
        setIschecked(!isChecked)
    }

    return (
        <form>
            <div className="checkbox-container">
                <input 
                    className="checkbox" 
                    type="checkbox" 
                    checked={isChecked} 
                    onChange={handleCheckboxChange} 
                />
                <p>{isChecked ? '👌' : '🚫'}</p>
            </div>
        </form>
    );
}

export default Checkbox;