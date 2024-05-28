import React from "react";
import { saveAs } from "file-saver";

function convertJsonToCsv(data) {
  let csv = "";

  csv += Object.keys(data[0]).join(",") + "\n";

  data.forEach((item) => {
    csv += Object.values(item).join(",") + "\n";
  });
  return csv;
}

function convertSurveyJsonToCsv(data) {
  let csv = "";

  csv += Object.keys(data[0]).join(",") + ",Description" + "\n";
  data.forEach((item) => {
    const values = Object.values(item);
    let Description = "";

    values.forEach((value, index) => {
      if (typeof value === "string" && value.includes("%!@")) {
        const [val1, val2] = value.split("%!@");
        csv += `${val1}`;
        Description = val2;
      } else {
        csv += value;
      }
      if (index < values.length) {
        csv += ",";
      }
    });
    csv += Description;
  });
  return csv;
}

function DownloadComponent({ jsonData, typeValue }) {
  function downloadCsv() {
    let csv;
    if (typeValue === "Survey") {
      csv = convertSurveyJsonToCsv(jsonData);
    } else {
      csv = convertJsonToCsv(jsonData);
    }
    const blob = new Blob([csv], { type: "text/csv" });
    saveAs(blob, `${typeValue}.csv`);
  }

  return (
    <button onClick={downloadCsv}>
      <img
        src="https://i.ibb.co/sF53jXD/image.png"
        className=" rounded-full w-8"
      />
    </button>
  );
}

export default DownloadComponent;
