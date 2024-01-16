import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const AddPetLog = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    pet_id: id,
    description: '',
    status: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://vetbee-backend.glitch.me/v1/logs/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Log added successfully!');
        // Redirect to the pet log page
        navigate(`/pet-log/${id}`);
      } else {
        console.error('Failed to add log.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="log">
        <h1>Lucky Log</h1>
        <form onSubmit={onSubmit}>
          <h2>Status</h2>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            placeholder="Huberium Celiulitus"
            required
          />
          <h2>Description</h2>
          <input
            type="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Removed some fat..."
            required
          />
          <input id='submit' type="submit" value="ADD PET" />
          <Link to={`/pet-log/${id}`}>GO BACK</Link>
        </form>
      </div>
    </>
  );
};

export default AddPetLog;
