import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Home() {
  const [listData, setListData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch('https://vetbee-backend.glitch.me/v1/pets')
        if (resp.ok) {
          const json = await resp.json()
          setListData(json)
        } else {
          console.error('Nepavyko gauti duomenų iš API')
        }
      } catch (error) {
        console.error('Įvyko klaida:', error)
      }
    };

    fetchData()
  }, [])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('lt', options);
  };

  return (
    <>
      <div className="top">
        <h1>Pet List</h1>
        <Link to='/add-pet'>ADD PET</Link>
      </div>
      <div className="inputs">
        {listData.map(({ name, dob, client_email, id }, index) => (
          <div key={index} className="input">
            <h2>{name}</h2>
            <br />
            <h3>{formatDate(dob)}</h3>
            <h3>{client_email}</h3>
            <div className="buttons">
              <Link to={`/pet-log/${id}`}>VIEW LOG</Link>
              <button>DELETE</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
