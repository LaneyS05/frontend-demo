import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";

function Update() {
  const INIT_STATE = {
    name: "",
    age: "",
    location: "",
    favoriteColor: "",
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/person/:id`;
      //console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      if (data.length) {
        setData(data);
      }
    };
    fetchData();
  }, []);

  const [data, setData] = useState(INIT_STATE);
  const [errorMessage, setErrorMessage] = useState([]);

  const nav = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    data.age = Number(data.age);
    const url = `${process.env.REACT_APP_BACKEND_URL}/person/:id`;
    const response = await fetch(url, {
      method: "POST",
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

  //const display = (data) => {
  //return <Link to={`/person/${data._id}`}>{data.name}</Link>;
  // };

  return (
    <form>
      <input
        onChange={handleChange}
        required
        name="name"
        placeholder="name"
        value={data.name}
      />
      <input
        onChange={handleChange}
        required
        name="age"
        placeholder="age"
        value={data.age}
      />
      <input
        onChange={handleChange}
        required
        name="location"
        placeholder="location"
        value={data.location}
      />
      <input
        onChange={handleChange}
        name="favoriteColor"
        placeholder="favoriteColor"
        value={data.favoriteColor}
      />
      <button onClick={handleSubmit}>Save</button>
    </form>
  );
}

export default Update;
