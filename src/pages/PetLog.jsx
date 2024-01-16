import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

const PetLog = () => {
  const [listData, setListData] = useState([]);
  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(`https://vetbee-backend.glitch.me/v1/logs/${id}`)
        if (resp.ok) {
          const json = await resp.json();
          setListData(json);
        } else {
          console.error('Nepavyko gauti duomenų iš API');
        }
      } catch (error) {
        console.error('Įvyko klaida:', error)
      }
    }

    fetchData()
  }, [id])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('lt', options)
  }

  return (
    <div>
      <div className="logtop">
            <h1>{listData.length > 0 ? `${listData[0].name}: Health Records` : 'Loading...'}</h1>
            <div>
            <Link to='/pet-log'>ADD LOG</Link>
            <Link to='/' className="log-link">GO BACK</Link>
            </div>
        </div>
        <div className="loginputs">
            {listData.map(({ status, description, dob }, index) => (
            <div key={index} className="loginput">
              <h2>{status}</h2>
              <p>{description}</p>
              <div>
              <p className='date'>{formatDate(dob)}</p>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default PetLog
