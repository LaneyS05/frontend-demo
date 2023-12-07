import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewPersonForm() {
  const INIT_STATE = {
    name: "",
    age: "",
    location: "",
    favoriteColor: "",
  };

  const nav = useNavigate();

  const [data, setData] = useState(INIT_STATE);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    data.age = Number(data.age);
    const url = `${process.env.REACT_APP_BACKEND_URL}/person`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status !== 201) {
    } else {
      nav("/", { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <input type="submit" />
    </form>
  );
}

export default NewPersonForm;
