import { useState} from 'react';
import '../style/Checkbox.css'
import { isAvailable } from '../service/api';

const Checkbox = ({id, nom, date}) => {
    const [isChecked, setIschecked] = useState(false)

     const handleAddAvailable = async () => {
            try {
                const newIsChecked = !isChecked
                setIschecked(newIsChecked)
                await isAvailable({
                    "name": nom,
                    "dates":[{
                        "date":date,
                        "available": newIsChecked
                        }]
                }, id)
            } catch (err) {
                console.log('Error', err)
                setIschecked(isChecked)
            }
        }

    return (
        <form>
            <div className="checkbox-container">
                <input 
                    className="checkbox" 
                    type="checkbox" 
                    checked={isChecked} 
                    onChange={handleAddAvailable} 
                />
                <p>{isChecked ? '👌' : '🚫'}</p>
            </div>
        </form>
    );
}

export default Checkbox;