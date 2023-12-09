import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Display() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    async function getPerson() {
      const url = `${process.env.REACT_APP_BACKEND_URL}/person/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      //console.log(data);
    }
    getPerson();
  }, []);

  const updatePerson = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/update/person/${id}`;
    await fetch(url, {
      method: "PATCH",
    });
    nav("/update/person/:id", { replace: true });
  };

  const deletePerson = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/person/${id}`;
    await fetch(url, {
      method: "DELETE",
    });
    nav("/", { replace: true });
  };

  const display = data && (
    <div>
      <h1>Name: {data.name}</h1>
      <h3>Age: {data.age}</h3>
      <h3>Location: {data.location}</h3>
      {data.favoriteColor && (
        <h3 style={{ color: data.favoriteColor }}>
          Favorite Color : {data.favoriteColor}
        </h3>
      )}
      <button onClick={deletePerson}>Delete</button>
      <button onClick={updatePerson}>Update</button>
    </div>
  );
  return <div>{display}</div>;
}

export default Display;
