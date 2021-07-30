import { useState, useEffect } from "react";

function useTableComponent(dataArray) {
  console.log("DATA ARRAY: ", dataArray);

  const [data, setData] = useState([]);
  const [flattenedData, setFlattenedData] = useState([]);
  const [sortedElement, setSortedElement] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  //   const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const flattenedArray = flattenArray(dataArray);
    setFlattenedData(flattenedArray);
    setData(flattenedArray);
    //  setMounted(true);
  }, [dataArray]);

  function flattenArray(array) {
    console.log("flatten array: ", array);

    let ObjArray = [];
    // loop through object
    array.map((obj) => {
      // Flatten Object and push to new array
      // console.log(obj);
      ObjArray.push(flattenObject(obj));
    });
    return ObjArray;
  }

  //   UseEffect to run on search input change
  useEffect(() => {
    if (searchInput.length > 0) {
      console.log("search change");

      let filtered = flattenedData.filter((row) => {
        return Object.values(row).some((s) =>
          ("" + s).toLowerCase().includes(searchInput.toLowerCase())
        );
      });
      console.log(filtered);

      if (filtered.length > 0) {
        setData(filtered);
      } else {
        // if filtered array is empty
        let emptyObject = {};
        let emptyArray = [];

        Object.keys(flattenedData[0]).map((key) => {
          emptyObject[key] = "";
        });
        // Push empty object of keys to array and set the data
        emptyArray.push(emptyObject);
        setData(emptyArray);
      }

      // console.log(filtered);
    } else {
      console.log("no filter");

      setData(flattenedData);
    }
  }, [searchInput]);

  function flattenObject(obj, newObj = {}) {
    //  console.log(obj);

    Object.keys(obj).map((key) => {
      if (typeof obj[key] === "object") {
        // console.log('is a object')

        flattenObject(obj[key], newObj);
      } else {
        if (obj[key] === "" || obj[key] === null) {
          newObj[key] = "";
        } else {
          newObj[key] = obj[key];
        }
      }
    });
    console.log("OBJ: ", newObj);

    return newObj;
  }

  //   Handle heading clicks for sorting
  function handleHeadingClicked(e) {
    //  console.log(e.target);
    const { id } = e.target;
    let sortingArray = [...data];

    setSortedElement(id);

    if (id === sortedElement) {
      //  Sort in reverse
      sortReverse(sortingArray, id);
    } else {
      //  If id !== sortedElement
      // sort alphabetically
      sortAlphabetically(sortingArray, id);
    }
    //  Set data to sorted Array
    setData(sortingArray);
  }

  // Sorting functions
  // Sort alphabetically
  function sortAlphabetically(arr, element) {
    return arr.sort((a, b) => {
      if (a[element] < b[element]) {
        return -1;
      }
      if (a[element] > b[element]) {
        return 1;
      }
      return 0;
    });
  }

  // Sort in reverse
  function sortReverse(arr, element) {
    return arr.sort((a, b) => {
      if (a[element] > b[element]) {
        return -1;
      }
      if (a[element] < b[element]) {
        return 1;
      }
      return 0;
    });
  }

  // Handle search change
  function handleSearchChange(e) {
    setSearchInput(e.target.value);
  }

  return {
    data,
    handleHeadingClicked,
    searchInput,
    handleSearchChange,
  };
}

export default useTableComponent;
