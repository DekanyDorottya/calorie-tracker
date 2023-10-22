import React, { useState, useEffect } from "react";
import "./CalorieForm.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Notification from "./Notification";
import { Box } from "@mui/material";
import Cookies from "js-cookie";
import DailyBarchart from "./DailyBarchart";
import { Add } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const CalorieForm = () => {
  const [grams, setGrams] = useState(0);
  const [foodType, setFoodType] = useState();
  const [open, setOpen] = useState(false);
  const [dailybarchart, setDailybarchart] = useState(true);
  const [searchedFood, setSearchedFood] = useState("");
  const [isSearched, setIsSearched] = useState(true);
  const [foundFoodTypes, setFoundFoodTypes] = useState([]);
  const [dailyCalorieInfos, setDailyCalorieInfos] = useState([
    {
      requiedCalorie: 0,
      dailyCalorieConsumption: 0,
    },
  ]);
  const [duration, setDuration] = useState("daily");
  const jwtToken = Cookies.get("jwtToken");

  const handleCaloriesChange = (event) => {
    setGrams(event.target.value);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    fetchDailyCalories().then((listedMeals) => {
      setDailyCalorieInfos(listedMeals);
    });
  }, []);

  const fetchDailyCalories = () => {
    return fetch(`/analyze/?duration=${duration}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());
  };

  const showDailyBarChart = () => {
    if (window.innerWidth <= 960) {
      setDailybarchart(false);
    } else {
      setDailybarchart(true);
    }
  };

  const fetchFoodType = () => {
    return fetch(`/foodtype/search?&foodType=${searchedFood}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());
  };

  const handleSearchClick = () => {
    fetchFoodType().then((listedFoodTypes) => {
      setIsSearched(true);
      setFoundFoodTypes(listedFoodTypes);
      console.log(listedFoodTypes);
    });
  };

  const handleSelectFoodType = (selectedFoodType) => {
    setFoodType(selectedFoodType);
    setIsSearched(false);
  };

  window.addEventListener("resize", showDailyBarChart);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/calories/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          foodType: foodType,
          grams: grams,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to post calories.");
      }
      fetchDailyCalories().then((listedMeals) => {
        setDailyCalorieInfos(listedMeals);
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error posting calories:", error);
    }
  };

  return (
    <>
      <Box flex={5} p={{ xs: 0, md: 2, alignItems: "center" }}>
        {isSearched ? (
          <>
            <TextField
              id="outlined-search"
              label="Search food"
              type="search"
              fullWidth
              value={searchedFood}
              onChange={(event) => setSearchedFood(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearchClick}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Table>
              {foundFoodTypes.length !== 0 ? (
                <TableHead>
                  <TableRow>
                    <TableCell>Food Type (100g serving)</TableCell>
                    <TableCell>Calorie</TableCell>
                    <TableCell>Carbohydrate</TableCell>
                    <TableCell>Fat</TableCell>
                    <TableCell>Protein</TableCell>
                  </TableRow>
                </TableHead>
              ) : null}
              <TableBody>
                {foundFoodTypes.map((foodtype) => (
                  <TableRow
                    sx={{ cursor: "pointer" }}
                    key={foodtype.apiId}
                    onClick={() => handleSelectFoodType(foodtype)}
                  >
                    <TableCell>{foodtype.name}</TableCell>
                    <TableCell>{foodtype.calorie}</TableCell>
                    <TableCell>{foodtype.carbohydrate}</TableCell>
                    <TableCell>{foodtype.fat}</TableCell>
                    <TableCell>{foodtype.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <>
            <TextField
              id="outlined-search"
              label="Search food"
              type="search"
              fullWidth
              value={searchedFood}
              onChange={(event) => setSearchedFood(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearchClick}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <form className="calorie-form" onSubmit={handleSubmit}>
              <label htmlFor="grams">Amount:</label>
              <TextField
                type="number"
                style={{width: '250px'}}
                id="outlined-basic"
                label="Amount"
                variant="outlined"
                onChange={handleCaloriesChange}
                value={grams}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">g</InputAdornment>,
                }}
              />
              <Button
                variant="contained"
                type="submit"
                style={{maxWidth: '250px'}}
                onClick={handleClick}
                fullWidth
              >
                Post Calories
              </Button>
              <Notification
                open={open}
                onClose={handleClose}
                message="Posted a meal"
              />
            </form>
          </>
        )}
      </Box>
      {dailybarchart ? <DailyBarchart listedMeals={dailyCalorieInfos} /> : null}
    </>
  );
};

export default CalorieForm;
