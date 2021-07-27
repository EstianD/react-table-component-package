import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import TableComponent from "./TableComponent";

const url = "https://randomuser.me/api/?results=100";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getLocations() {
      let locationsArray = [];

      const response = await axios.get(url);

      const { results } = response.data;

      console.log("RESPONSE: ", results);

      if (results) {
        results.map((user) => {
          locationsArray.push(user.location);
        });
      }

      // console.log(locationsArray);

      // set data
      setData(locationsArray);
    }

    getLocations();
  }, []);

  return (
    <div className="App">
      <TableComponent dataArray={data} />
    </div>
  );
}

export default App;
