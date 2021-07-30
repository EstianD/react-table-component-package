import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import TableComponent from "./TableComponent";

const url = "https://randomuser.me/api/?results=10";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getLocations() {
      let locationsArray = [];

      const response = await axios.get(url);

      const { results } = response.data;

      // setData(results);

      console.log("RESPONSE: ", results);

      if (results) {
        results.map((user) => {
          // console.log("user: ", user);

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
    <div className="App">{data && <TableComponent dataArray={data} />}</div>
  );
}

export default App;
