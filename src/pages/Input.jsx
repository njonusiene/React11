import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Input = () => {
    const [formData, setFormData] = useState({
      name: '',
      dob: '',
      client_email: ''
    })
    const navigate = useNavigate()
  
    const handleChange = (e) => {
      const { name, value } = e.target
      setFormData((prevData) => ({
        ...prevData, [name]: value }))
    };
  
    const onSubmit = async (e) => {
      e.preventDefault()
    
      try {
        console.log('Siunčiami duomenys:', {
          name: formData.name,
          dob: new Date(formData.dob).toISOString(),
          client_email: formData.client_email,
        })
    
        const response = await fetch('https://vetbee-backend.glitch.me/v1/pets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            dob: new Date(formData.dob).toISOString(),
            client_email: formData.client_email,
          }),
        })
    
        const result = await response.json()
    
        if (response.ok) {
          console.log('Gyvūnas pridėtas sėkmingai!')
          alert("Pridėta sėkmingai! ✅")
          navigate('/')
        } else {
          console.error('Įvyko klaida pridedant gyvūną.', result)
        }
      } catch (error) {
        console.error('Įvyko klaida:', error)
      }
    }
  
    return (
      <div className="input">
          <h1>Add Your Pet</h1>
          <h3>Pet Name:</h3>
          <form onSubmit={onSubmit}>
              <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Lockis"
                  required
               />
               <h3>Pet Birthday:</h3>
              <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  placeholder="mm/dd/yyyy"
                  required
              />
              <h3>Pet Email</h3>
              <input
                  type="email"
                  name="client_email"
                  value={formData.client_email}
                  onChange= {handleChange}  
                  placeholder="lockis@gmail.com"
                  required
              />
              <input id='submit' type="submit"  />
          </form>
      </div>
     
    )
  }
  
  export default Input
  


