import React, { useState, useEffect } from "react";

import api from '../src/services/api';

import "./styles.css";

function App() {
  const [ repositories , setRepositories ] = useState([]);

  
  useEffect(()=>{
    api.get('repositories').then(response =>{
      setRepositories(response.data)
    });
  },[]);
  
  async function handleAddRepository() {
    const repository ={
      title : "Criando new repo1",
      url : "urlnova/edisonbr",
      techs : [
            "C",
            "C++"
        ],
      likes: 0,
     };

    api.post('repositories', repository)
    .then(repository =>{

        console.log(repository.data)
        setRepositories([...repositories, repository.data])
    })
     
  }

  async function handleRemoveRepository(id) {
    console.log()
    await api.delete(`repositories/${id}`).then(repository =>{
      setRepositories(repositories.filter(repository => repository.id !== id))
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
  
        {repositories.map(repository => (
                 <li key={repository.id}>
                    <span>{ repository.title }</span>
                    <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
               </li>
        
        ))}


      
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
