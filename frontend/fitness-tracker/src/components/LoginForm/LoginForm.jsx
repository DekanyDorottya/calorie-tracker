import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from 'jwt-decode';
import Cookies from 'js-cookie';
import "./LoginForm.css"
import { Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';



const loginWithUser = (userEmail, userPassword) => {
    return fetch(`/users/login?email=${userEmail}&password=${userPassword}`)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text()
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Login error', error);
        throw error;
    })
  };

const LoginForm = () => {
    const navigate = useNavigate();
    const [sendButtonDisabled,  setSendButtonDisabled] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [isSuccessSnackbar, setIsSuccessSnackbar] = useState(false);

    const onSubmit = (e) => {
        console.log('submitted');
        e.preventDefault();
        setSendButtonDisabled(true);
    const formData = new FormData(e.target);
    const userEmail = formData.get("email"); 
    const userPassword = formData.get("password");

    // Reset states before login attempt
    setSnackbarOpen(false);
    setSnackbarMessage("");
    setIsSuccessSnackbar(false);

    
    loginWithUser(userEmail, userPassword)
      .then(result => {
        if (result === "Invalid credentials.") {
            setSnackbarOpen(true); // Show the error Snackbar
        setSnackbarMessage("Invalid credentials. Please check your email and password.");
        setSendButtonDisabled(false);
        } else {
          // Successful login logic
          console.log(result);

          Cookies.set('jwtToken', result, { expires: 7 });
        setSnackbarOpen(true);
        setSnackbarMessage("Login successful.");
        setIsSuccessSnackbar(true);
        //Navigate to the home page after the Snackbar disappears
        setTimeout(() => {
            setSnackbarOpen(false);
            setIsSuccessSnackbar(false);
            navigate('/');
            window.location.reload();
            }, 3000); // Adjust the delay as needed
        }
      })
      .catch(err => {
        setSnackbarOpen(true); // Show the error Snackbar
        setSnackbarMessage("An error occurred during login. Please try again.");
        console.error('Login error', err);
      });
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
      {snackbarMessage && (
      <Snackbar
        open={snackbarOpen && !isSuccessSnackbar}
        autoHideDuration={5000} // Duration in milliseconds
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          onClose={() => setSnackbarOpen(false)}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    )}
    {isSuccessSnackbar && (
      <Snackbar
        open={snackbarOpen && isSuccessSnackbar}
        autoHideDuration={3000} // Duration in milliseconds
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={() => setSnackbarOpen(false)}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    )}
      <div className="buttons">
        <button type="submit" disabled={sendButtonDisabled} >
            Log in
        </button>
      </div>
    </form>
    )
}

export default LoginForm;