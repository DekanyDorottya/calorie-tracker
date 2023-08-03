import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"

const loginWithUser = (userEmail, userPassword) => {
    
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
        navigate("/");
        return loginWithUser(userData);  
    };

    return (
        <form className="LoginForm" onSubmit={onSubmit}>
      {/* {(
        <input type="hidden" name="name"  />
      )} */}
      

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
            Log in
        </button>
      </div>
    </form>
    )
}

export default LoginForm;