import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const PetLog = () => {
  const [listData, setListData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(`https://vetbee-backend.glitch.me/v1/logs/${id}`);
        if (resp.ok) {
          const json = await resp.json();
          setListData(json);
        } else {
          console.error('Nepavyko gauti duomenų iš API');
        }
      } catch (error) {
        console.error('Įvyko klaida:', error);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('lt', options);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'linear', duration: 2, x: { duration: 1 } }}
    >
      <div>
        <div className="logtop">
          <h1>{listData.length > 0 ? `${listData[0].name}: Health Records` : 'Nėra duomenų...'}</h1>
          <div>
            <Link to={`/add-pet-log/${id}`}>ADD LOG</Link>
            <Link to='/' className="log-link">GO BACK</Link>
          </div>
        </div>
        <div className="loginputs">
          {listData.map(({ status, description, dob }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ ease: 'linear', duration: 0.5 }}
              className="loginput"
            >
              <h2>{status}</h2>
              <p>{description}</p>
              <div>
                <p className='date'>{formatDate(dob)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PetLog;
