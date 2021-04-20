import React, { useState, useEffect } from 'react';

export default function App() {
  const [location, setLocation] = useState({});
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    const wacthId = navigator.geolocation.watchPosition(handlePositionReceived)

    return () => navigator.geolocation.clearWatch(wacthId)
  }, []);

  function handlePositionReceived({ coords }) {
    const { latitude, longitude } = coords;

    setLocation({ latitude, longitude })
  };

  useEffect(async () => {
    const response = await fetch("https://api.github.com/users/vlCoder/repos")
    const data = await response.json();

    setRepositories(data)
  }, [])

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);

    document.title = `Você tem ${filtered.length} repositorios favoritos`
  }, [repositories]);

  function handleFavorite(id) {
    const newRepositores = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    })

    setRepositories(newRepositores)
  }


  return (
    <>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span>(favorito)</span>}
            <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
          </li>))}
      </ul>
      <br />
      <p>
        Latitude: {location.latitude}<br />
      </p>
      <p>
        Logidute: {location.longitude}<br />
      </p>
    </>
  );
}

;
