import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import { Link } from "react-router-dom";

function Update() {
  const INIT_STATE = {
    name: "",
    age: "",
    location: "",
    favoriteColor: "",
  };

  const [data, setData] = useState(INIT_STATE);
  const nav = useNavigate();
  const { id } = useParams();
  const [otherData, otherSetData] = useState([]);

  //const [data, setData] = useState(INIT_STATE);
  const [errorMessage, setErrorMessage] = useState([]);

  useEffect(() => {
    async function getPerson() {
      const url = `${process.env.REACT_APP_BACKEND_URL}/person/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      otherSetData(data);
      //console.log(data);
    }
    getPerson();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    data.age = Number(data.age);
    const url = `${process.env.REACT_APP_BACKEND_URL}/update`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status !== 201) {
      setErrorMessage("error creating user");
    } else {
      if (errorMessage) setErrorMessage("");
      nav("/person/:id", { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        required
        name="name"
        placeholder="name"
        value={otherData.name}
      />
      <input
        onChange={handleChange}
        required
        name="age"
        placeholder="age"
        value={otherData.age}
      />
      <input
        onChange={handleChange}
        required
        name="location"
        placeholder="location"
        value={otherData.location}
      />
      <input
        onChange={handleChange}
        name="favoriteColor"
        placeholder="favoriteColor"
        value={otherData.favoriteColor}
      />
      <input type="submit" />
    </form>
  );
}

export default Update;
