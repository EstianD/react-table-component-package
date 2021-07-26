import { useState, useEffect } from "react";

function useTableComponent(dataArray) {
  const [data, setData] = useState([]);
  const [sortedElement, setSortedElement] = useState(null);

  useEffect(() => {
    let ObjArray = [];
    console.log(dataArray);

    // loop through object
    dataArray.map((obj) => {
      // console.log("OBJ: ", obj);

      // Flatten Object and push to new array
      ObjArray.push(flattenObject(obj));
    });

    //  console.log("ARRAY: ", ObjArray);

    setData(ObjArray);
  }, [dataArray]);

  // Flatten Object function
  function flattenObject(obj) {
    let flattenedObj = {};
    const keysArray = Object.keys(obj);

    keysArray.map((key) => {
      if (typeof obj[key] === "object") {
        const innerKeys = Object.keys(obj[key]);

        innerKeys.map((innerKey) => {
          flattenedObj[innerKey] = obj[key][innerKey];
        });
      } else {
        flattenedObj[key] = obj[key];
      }
    });
    return flattenedObj;
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

  //   Sorting functions
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

  return { data, handleHeadingClicked };
}

export default useTableComponent;
