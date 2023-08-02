import { useState } from "react";
import { useNavigate } from "react-router-dom";

const createNewUser = (userName, userEmail, userPassword) => {
    return fetch("/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userName, userEmail, userPassword),
    }).then((res) => res.json());
  };

const LoginForm = () => {
    const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
//   const [userName, setUserName] = useState(null);
//   const [userEmail, setUserEmail] = useState(null);
//   const [userPassword, setUserPassword] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const userData = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});
    console.log(userData);
        return createNewUser(userData);  
    };

    return (
        <form className="LoginForm" onSubmit={onSubmit}>
      {/* {(
        <input type="hidden" name="name"  />
      )} */}
      <div className="control">
        <label htmlFor="userName">Your name:</label>
        <input
          name="userName"
          id="userName"
        />
      </div>

      <div className="control">
        <label htmlFor="email">email address:</label>
        <input
        type="email"
          name="email"
          id="email"
        />
      </div>

      <div className="control">
        <label htmlFor="password">password:</label>
        <input
            type="password"
          name="password"
          id="password"
          autoComplete=""
        />
      </div>

      <div className="buttons">
        <button type="submit" >
            Register
        </button>

        <button type="button" >
          Cancel
        </button>
      </div>
    </form>
    )
}

export default LoginForm;