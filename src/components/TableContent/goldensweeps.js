import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import Badge from "react-bootstrap/Badge";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Box from "@mui/material/Box";
import bullsbears from "./bullsbears.jpg";
import TableSortLabel from "@mui/material/TableSortLabel";
import TextField from "@mui/material/TextField";
import PieChart from "../PieChart/piechart";
import emailjs from "@emailjs/browser";
import "./table.css";
function Golden() {
  const [data, setData] = useState([]);
  const [sweeplength, setsweeplength] = useState("");
  const [loadingData, setLoadingData] = useState(true);
  const [message, setMessage] = useState("");
  const [data2, setData2] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setrows] = useState([]);
  const [goldenemail, setgoldenemail] = useState([]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const url = "https://callsorputs.herokuapp.com/getData";
  const columns = useMemo(() => [
    {
      Header: "DTE",
      accessor: "DTE",
    },
    {
      Header: "aggressor_ind",
      accessor: "aggressor_ind",
    },
    // {
    //   Header: "ask",
    //   accessor: "ask",
    // },
    // {
    //   Header: "bid",
    //   accessor: "bid",
    // },

    {
      Header: "chan_filter",
      accessor: "chan_filter",
    },
    {
      Header: "cost_basis",
      accessor: "cost_basis",
    },
    {
      Header: "date",
      accessor: "date",
    },
    {
      Header: "date_expiration",
      accessor: "date_expiration",
    },
    {
      Header: "description",
      accessor: "description",
    },
    // {
    //   Header: "fill",
    //   accessor: "fill",
    // },
    // {
    //   Header: "id",
    //   accessor: "id",
    // },
    {
      Header: "midpoint",
      accessor: "midpoint",
    },
    {
      Header: "open_interest",
      accessor: "open_interest",
    },
    {
      Header: "option_activity_type",
      accessor: "option_activity_type",
    },
    {
      Header: "option_symbol",
      accessor: "option_symbol",
    },
    {
      Header: "percent_move",
      accessor: "percent_move",
    },
    {
      Header: "price",
      accessor: "price",
    },
    {
      Header: "put_call",
      accessor: "put_call",
    },
    {
      Header: "sentiment",
      accessor: "sentiment",
    },
    {
      Header: "sentiment_flipped",
      accessor: "sentiment_flipped",
    },
    {
      Header: "size",
      accessor: "size",
    },
    {
      Header: "spot",
      accessor: "spot",
    },
    {
      Header: "strike_price",
      accessor: "strike_price",
    },
    {
      Header: "ticker",
      accessor: "ticker",
    },
    {
      Header: "time",
      accessor: "time",
    },
    {
      Header: "underlying_type",
      accessor: "underlying_type",
    },
    {
      Header: "trade_count",
      accessor: "trade_count",
    },
    {
      Header: "updated",
      accessor: "updated",
    },
    {
      Header: "volume",
      accessor: "volume",
    },
  ]);

  // ---------------------------------------------------------- TABLE DATA -------------------------------------------------//
  useEffect(() => {
    setLoadingData(false);
    getData();
  }, []);
  const getData = async () => {
    try {
      await axios.get(url).then((response) => {
        // check if the data is populated
        let new_golden_sweeps = [];
        let golden_sweeps_email = [];
        console.log(response.data);
        setData(response.data.items);
        // you tell it that you had the result
        response.data.items.forEach((elements) => {
          if (elements.chan_filter === "GOLDEN") {
            new_golden_sweeps.push(elements);
            golden_sweeps_email.push(elements);
          }
        });
        setrows(new_golden_sweeps);
        setsweeplength(golden_sweeps_email.length);

        setLoadingData(false);
      });
    } catch (err) {
      // catches errors both in fetch and response.json
      console.log(err);
    } finally {
      // do it again in 2 seconds
      setTimeout(getData, 2000);
    }
  };

  const handleChange = (event) => {
    setMessage(event.target.value.toUpperCase());

    console.log("value is:", event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();

    // 👇️ value of input field
    console.log("handleClick 👉️", message);
    let search_stocks = [];
    let individualElements = data.forEach((elements) => {
      if (elements.ticker === message) search_stocks.push(elements);
      setrows(search_stocks);
    });
  };

  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  return (
    <div>
      {/* <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"80%", marginLeft:"5%" }}> */}

      {/* <img
          src={bullsbears}
          alt="bullsbears"
          style={{ width: "80%", height: "200px" }}
        /> */}
      {/* </div> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
          marginLeft: "8%",
          marginBottom: "2%",
        }}
      >
        <PieChart />
        <Link to="/Golden">
          <Button
            style={{
              backgroundColor: "gold",
              marginLeft: "20px",
              color: "black",
              fontWeight: "bold",
            }}
          >
            <Button style={{ color: "red" }}>
              <span class="material-icons">notifications</span>
              <span
                class="icon-button__badge"
                style={{ color: "red", color: "blue", fontWeight: "bold" }}
              >
                {sweeplength}
              </span>
            </Button>
            GOLDEN
          </Button>
        </Link>
        <Link to="/table">
          <Button
            style={{
              backgroundColor: "lightblue",
              marginLeft: "20px",
              color: "black",
              fontWeight: "bold",
            }}
          >
            ALL OPTIONS
          </Button>
        </Link>
        <Link to="/PutsOnly">
          <Button
            style={{
              backgroundColor: "orange",
              marginLeft: "20px",
              color: "black",
              fontWeight: "bold",
            }}
          >
            PUTS
          </Button>
        </Link>
        <Link to="/CallsOnly">
          <Button
            style={{
              backgroundColor: "lightgreen",
              marginLeft: "20px",
              color: "black",
              fontWeight: "bold",
            }}
          >
            CALLS
          </Button>
        </Link>
        <TextField
          id="message"
          name="message"
          label="TICKER SYMBOL"
          onChange={handleChange}
          value={message}
          variant="filled"
          style={{
            marginLeft: "50px",
            marginRight: "5px",
            width: "300px",
            marginTop: "-10px",
            borderColor: "black",
            backgroundColor: "white",
          }}
        />
        <Button
          style={{
            backgroundColor: "pink",
            color: "black",
            fontWeight: "bold",
          }}
          onClick={handleClick}
        >
          Search
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
          marginLeft: "10%",
        }}
      >
        {/* here you check if the state is loading otherwise if you wioll not call that you will get a blank page because the data is an empty array at the moment of mounting */}
        {loadingData ? (
          <p>Loading Please wait...</p>
        ) : (
          // <Table style={mystyle} columns={columns} data={data} />
          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
              style={{
                backgroundColor: "gray",
                border: "3px solid gray",
                fontSize: "10px",
              }}
            >
              <TableHead
                style={{
                  backgroundColor: "white",
                  height: "60px",
                }}
              >
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }} align="center">
                    TICKER
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", width: "30%" }}
                    align="center"
                  >
                    DESCRIPTION
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="left">
                    EXP
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="center">
                    DATE
                  </TableCell>
                  {/* <TableCell align="right">data</TableCell> */}

                  <TableCell style={{ fontWeight: "bold" }} align="center">
                    INTEREST
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="center">
                    OPTIONS SIZE
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    SPOT
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="center">
                    PRICE
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="center">
                    PUT/CALL
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((data) => (
                  <TableRow
                    key={data.name}
                    style={
                      data.chan_filter === "GOLDEN"
                        ? { backgroundColor: "gold" }
                        : {}
                    }
                  >
                    {/* <TableCell component="th" scope="data">
                      {data.description}
                    </TableCell> */}
                    <TableCell style={{ color: "white" }} align="center">
                      {data.ticker}
                    </TableCell>
                    <TableCell
                      id="description"
                      style={{ color: "white" }}
                      align="right"
                    >
                      {data.description}
                    </TableCell>
                    <TableCell
                      style={{ color: "white", paddingRight: "40px" }}
                      align="right"
                    >
                      {data.date_expiration}
                    </TableCell>
                    <TableCell style={{ color: "white" }} align="right">
                      {data.date}
                    </TableCell>
                    {/* <TableCell align="right">{data.volume}</TableCell> */}

                    <TableCell style={{ color: "white" }} align="center">
                      {data.open_interest}
                    </TableCell>
                    <TableCell style={{ color: "white" }} align="center">
                      {data.size}
                    </TableCell>
                    <TableCell style={{ color: "white" }} align="right">
                      {data.spot}
                    </TableCell>
                    {/* <TableCell style={{ width: "20px" }} align="right">
                      {data.chan_filter}
                    </TableCell> */}
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                      align="center"
                    >
                      {data.price}
                    </TableCell>
                    <TableCell
                      style={
                        data.put_call === "CALL"
                          ? {
                              backgroundColor: "lightgreen",
                              fontWeight: "bold",
                            }
                          : { backgroundColor: "orange", fontWeight: "bold" }
                      }
                      align="center"
                    >
                      {data.put_call} - {data.sentiment}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div style={{ marginLeft: "40%" }}>
              <TablePagination
                rowsPerPageOptions={[
                  10,
                  20,
                  30,
                  50,
                  { label: "All", value: -1 },
                ]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </div>
          </TableContainer>
        )}
      </div>
    </div>
  );
}

export default Golden;
