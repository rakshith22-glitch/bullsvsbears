import { PieChart } from "react-minimal-pie-chart";
import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
function PieChartData() {
  const url = "https://callsorputs.herokuapp.com/getData";
  const [loadingData, setLoadingData] = useState(true);
  const [callscount, setcallscount] = useState("");
  const [totalcount, settotalcount] = useState("");
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");
  const [hovered, setHovered] = useState("");
  let callcount = [];
  const segmentsStyle = { transition: "stroke .3s", cursor: "pointer" };

  useEffect(() => {
    async function getData() {
      await axios.get(url).then((response) => {
        // check if the data is populated

        console.log(response.data);
        setData(response.data.items);
        // you tell it that you had the result
        response.data.items.forEach((elements) => {
          if (elements.put_call === "CALL") callcount.push(elements);
        });
        console.log(callcount);
        setcallscount(callcount.length);
        settotalcount(response.data.items.length);
        setLoadingData(false);
      });
    }
    if (loadingData) {
      // if the result is not ready so you make the axios call
      getData();
    }
  }, []);
  let callpercentage = parseInt(callscount);
  let putspercentage = parseInt(totalcount - callscount);
  const data2 = [
    {
      title: "CALLS",
      value: callpercentage,
      color: "lightgreen",
      key: "CALLS",
    },
    {
      title: "PUTS",
      value: putspercentage,
      color: "orange",
      key: "PUTS",
    },
  ];
  const lineWidth = 60;
  console.log("CALLS COUNT ", callpercentage);
  console.log("PUTS COUNT ", totalcount - callpercentage);
  return (
    <div style={{ width: "15%" }}>
      <PieChart
        style={{
          fontFamily:
            '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
          fontSize: "8px",
          color: "black",
        }}
        radius={PieChart.defaultProps.radius - 6}
        segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
        segmentsShift={(index) => (index === selected ? 6 : 1)}
        animate
        labelStyle={{
          fill: "red",
          opacity: 0.25,
          pointerEvents: "none",
        }}
        onClick={(_, index) => {
          setSelected(index === selected ? undefined : index);
        }}
        onMouseOver={(_, index) => {
          setHovered(index);
        }}
        onMouseOut={() => {
          setHovered(undefined);
        }}
        data={data2}
      />
    </div>
  );
}

export default PieChartData;
