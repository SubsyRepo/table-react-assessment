import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [details, setDetails] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [deleteClick, setDeleteClick] = useState(false);
  const [rowNumber, setRowNumber] = useState(0);
  const [currentName, setCurrentName] = useState('');
  const [editedName, setEditedName] = useState('');
  const [inputModified, setInputModified] = useState(false);

  useEffect(() => {
    fetch('https://assets.alippo.com/catalog/static/data.json')
    .then((response) => response.json())
    .then((json) => {
      setDetails(json)
    });
  }, []);

  const handleEditClick = (value, index) => {
     setEditClick(true);
     setCurrentName(value);
     setRowNumber(index)
  };

  const handleDeleteClick = (index) => {
     setDeleteClick(true);
     setRowNumber(index)
  };

  const handleCloseClick = () => {
     setDeleteClick(false);
     setEditClick(false);
  };

  const handleConfirmClick = (rowIndex) => {
     details.splice(rowIndex, 1);
     setDeleteClick(false);
  };

  const handleInputChange = (event) => {
    setEditedName(event.target.value);
    setInputModified(true);
  };

  const handleSaveClick = (rowIndex) => {
    if (editedName === null || currentName === null) {
      details.find((a, i) => i === rowIndex).name = currentName;
      setCurrentName(null);
      setEditedName(null);
    } 

    if (currentName !== null && editedName === '') {
      if (currentName.length === 0) {
        details.find((a, i) => i === rowIndex).name = editedName;
      } else {
        if (inputModified && editedName.length === 0) {
          setCurrentName(null);
          setInputModified(false);
          details.find((a, i) => i === rowIndex).name = editedName;
        } else {
          details.find((a, i) => i === rowIndex).name = currentName;
        }
      }
    }
    
    if (currentName !== null){
      if (editedName !== '' && editedName !== currentName) {
        details.find((a, i) => i === rowIndex).name = editedName;
      }
    } else {
      details.find((a, i) => i === rowIndex).name = editedName;
    }
  
    setEditClick(false);
  }

  return (
    <div className='App'>
      <table className='table'>
        <thead className='table-header'>
          <th className='serial-no-header'>S.No</th>
          <th className='name-header'>Name</th>
          <th className='age-header'>Age</th>
          <th className='city-header'>City</th>
          <th className='pincode-header'>PinCode</th>
          <th className='actions'>Actions</th>
        </thead>
        <tbody className='table-body'>
          {details.map((a, i) => 
            <tr className='table-row'>
              <td className='serial-no'>{i}</td>
              <td className='name'>{a.name}</td>
              <td className='age'>{a.age}</td>
              <td className='city'>{a.city}</td>
              <td className='pincode'>{a.pinCode}</td>
              <td className='action-buttons'>
                <button onClick={() => handleEditClick(a.name, i)} className='edit-button'>Edit</button>
                <button onClick={() => handleDeleteClick(i)} className='delete-button'>Delete</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {editClick ? (
        <div>
          <div className='modal'>
             <span className='modal-header'>Edit</span>
             <input type='text' placeholder='Edit Name' defaultValue={currentName} className='edit-name-input' onChange={handleInputChange}></input>
             <div className='edit-modal-buttons'>
             <button className='cancel-button' onClick={handleCloseClick}>Cancel</button>
              <button className='confirm-button' onClick={() => handleSaveClick(rowNumber)}>Save</button>
             </div>
          </div>         
        </div>
      ) : ('')}
      {deleteClick ? (
        <div>
          <div className='modal'>
            <span className='modal-header'>Delete row {rowNumber}</span>
            <div className='modal-buttons'>
              <button className='cancel-button' onClick={handleCloseClick}>Cancel</button>
              <button className='confirm-button' onClick={() => handleConfirmClick(rowNumber)}>Confirm</button>
            </div>
          </div>
        </div>
      ) : ('')}
    </div>
  );
}

export default App;
