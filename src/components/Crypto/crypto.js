import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

function Crypto() {
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  let response = null;
  useEffect(() => {
    async function getData() {
      await axios
        .get(
          "https://ff566cee-5d8d-433e-9ecd-90fe7973f12c/v1/cryptocurrency/listings/latest",
          {
            headers: {
              "X-CMC_PRO_API_KEY": "ff566cee-5d8d-433e-9ecd-90fe7973f12c",
            },
          }
        )
        .then((response) => {
          // check if the data is populated

          console.log(response.data);
          setData(response.data);
          // you tell it that you had the result

          setLoadingData(false);
        });
    }
    if (loadingData) {
      // if the result is not ready so you make the axios call
      getData();
    }
  }, []);

  console.log("CRYPTO DATA", data);

  return <p>HELLO</p>;
}

export default Crypto;
