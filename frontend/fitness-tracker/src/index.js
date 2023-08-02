import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from "./Pages/ErrorPage"
import About from './components/About';
import CalorieForm from './components/CalorieForm';
import CalorieDailyList from './components/CalorieDailyList';
import ActivityForm from './components/ActivityForm';
import ActivityDailyList from './components/ActivityDailyList';
import LoginForm from './components/LoginForm';
//import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/calorie",
        element: <CalorieForm />,
      },
      {
        path: "/yourDailyCalorie",
        element: <CalorieDailyList />,
      },
      {
        path: "/activity",
        element: <ActivityForm />,
      },
      {
        path: "/yourDailyActivitiy",
        element: <ActivityDailyList />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      
  ],
}
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


