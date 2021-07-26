import React from "react";
import useTableComponent from "./useTableComponent";

function TableComponent({ dataArray }) {
  console.log("INPUT: ", dataArray);

  //   Write some props for accepting stylling props
  const { data, handleHeadingClicked } = useTableComponent(dataArray);

  return (
    <div>
      <h1>Table</h1>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((head, h) => (
                <th
                  className="table-heading"
                  id={head}
                  key={h}
                  onClick={handleHeadingClicked}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, r) => (
              <tr key={r}>
                {Object.keys(row).map((rowProp, columnIndex) => (
                  <td key={columnIndex}>{row[rowProp]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
}

export default TableComponent;
