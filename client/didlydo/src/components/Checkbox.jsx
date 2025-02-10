import { useState } from 'react';
import '../style/Checkbox.css'
import { isAvailable } from '../service/api';

const Checkbox = ({id, nom, date, dates}) => {
    const [isChecked, setIschecked] = useState(date.attendees.map(att => att.name === nom ? att : "").filter(elem => elem != "")[0].available)
    const handleAddAvailable = async () => {
            try {
                const newIsChecked = !isChecked
                setIschecked(newIsChecked)

                const available = dates.map(d =>({
                    'date': d.date,
                    'available': d.date === date.date
                            ? newIsChecked
                            : d.attendees.map(att => att.name === nom ? att : "").filter(elem => elem != "")[0].available
                }));

                await isAvailable({
                    "name": nom,
                    "dates": available
                }, id)

            } catch (err) {
                console.error('Error lors du patch', err)
                setIschecked(isChecked)
            }
        }

    return (
        <form>
            <div className="checkbox-container">
                <input 
                    className="form-check-input" 
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