import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from 'framer-motion';

const Home = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resp = await fetch('https://vetbee-backend.glitch.me/v1/pets');
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

  const handleDelete = async (id) => {
    try {
      const resp = await fetch(`https://vetbee-backend.glitch.me/v1/pets/${id}`, {
        method: 'DELETE',
      });
      if (resp.ok) {
        console.log('Gyvūnas ištrintas sėkmingai!');
        fetchData();
      } else {
        console.error('Nepavyko ištrinti gyvūno.');
      }
    } catch (error) {
      console.error('Klaida:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('lt', options);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ ease: 'easeInOut', duration: 0.8 }}
      >
        <div className="top">
          <h1>Pet List</h1>
          <Link to='/add-pet'>ADD PET</Link>
        </div>
        <div className="inputs">
          {listData.length > 0 ? (
            listData.map(({ name, dob, client_email, id }) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ ease: 'easeInOut', duration: 0.8 }}
                className="input"
              >
                <h2>{name}</h2>
                <br />
                <h3>{formatDate(dob)}</h3>
                <h3>{client_email}</h3>
                <div className="buttons">
                  <Link to={`/pet-log/${id}`}>VIEW LOG</Link>
                  <button onClick={() => handleDelete(id)}>DELETE</button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ ease: 'easeInOut', duration: 0.8 }}
            >
              Apgailestaujame, tačiau duomenų bazėje nėra gyvūnų.
            </motion.p>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Home
