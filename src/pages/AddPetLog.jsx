import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const AddPetLog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pet_id: id,
    description: '',
    status: ''
  });
  const [petName, setPetName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchPetInfo = async () => {
      try {
        const response = await fetch(`https://vetbee-backend.glitch.me/v1/pets/${id}`);
        if (response.ok) {
          const petData = await response.json();
          setPetName(petData.name);
        } else {
          console.error('Failed to fetch pet information. Server returned:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPetInfo();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Submitting form data:', formData); // Pridėtas console.log

      const response = await fetch(`https://vetbee-backend.glitch.me/v1/logs/`, {
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
        console.error('Failed to add log. Server returned:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  console.log('Rendering AddPetLog component'); // Pridėtas console.log

  return (
    <>
      <div className="log">
        <h1>{petName} Log</h1>
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
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Removed some fat..."
            required
          />
          <div className="logbuttons">
            <input id='submit' type="submit" value="ADD PET" />
            <Link className='petlog-link' to={`/pet-log/${id}`}>GO BACK</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPetLog;
