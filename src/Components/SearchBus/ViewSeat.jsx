import React, { useEffect, useState } from "react";
import Seat from "./Seat";
import Select from "react-select";
import {
  MdArrowDropDown,
  MdCheckBoxOutlineBlank,
  MdDonutSmall,
  MdLocalOffer,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import Sleeper from "./Sleeper";
import { useDispatch } from "react-redux";
import { updateBookingDetails } from "../../Redux/BookBus/action";
import { useNavigate } from "react-router-dom";
import VerticalSleeper from "./VerticalSleeper";
import "./index.css";
const ViewSeat = ({
  seat_json,
  routeDetails,
  booked_seat,
  busData,
  seatPrice,

  departure,
  arrival,
  date,
  setIsModalOpen,
}) => {
  console.log(seat_json);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectBoardingPoint, setSelectBoardingPoint] = useState(null);
  const [selectDropPoint, setSelectDropPoint] = useState(null);
  const [isOpenDrop, setIsOpenDrop] = useState(true);
  const [isOpenBookSeat, setIsOpenBookSeat] = useState(true);
  // const [isOpenBoard, setIsOpenBoard] = useState(false);
  const [boardingoptions, setBoardingOptions] = useState([]);
  const [dropingoptions, setdropingOptions] = useState([]);

  // console.log(boardingoptions);
  const alreadyBookedSeats = booked_seat;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `${day} ${month}`;
  };
  function convertTo12HourFormat(time) {
    // Parse the time string
    const [hours, minutes] = time.split(":").map((num) => parseInt(num));

    // Determine AM or PM
    const suffix = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    const adjustedHours = hours % 12 || 12;

    // Return formatted time
    return `${adjustedHours}:${minutes < 10 ? "0" : ""}${minutes} ${suffix}`;
  }
  useEffect(() => {
    const boardingPoints = routeDetails.map((item) => ({
      value: item.boading_points,
      label:
        item.boading_points.charAt(0).toUpperCase() +
        item.boading_points.slice(1) +
        " " +
        item.city.charAt(0).toUpperCase() +
        item.city.slice(1),
    }));
    setBoardingOptions(boardingPoints);
  }, [routeDetails, setBoardingOptions]); // Include setOptions as a dependency
  useEffect(() => {
    const droppingPoints = routeDetails.map((item) => ({
      value: item.boading_points,
      label:
        item.boading_points.charAt(0).toUpperCase() +
        item.boading_points.slice(1) +
        " " +
        item.city.charAt(0).toUpperCase() +
        item.city.slice(1),
      // formatDate(item.date) +
      // " " +
      // convertTo12HourFormat(item.time),
    }));
    setdropingOptions(droppingPoints);
  }, [routeDetails, setdropingOptions]);

  let dispatch = useDispatch();

  const navigate = useNavigate();
  const handleBookSeat = () => {
    if (!selectBoardingPoint || !selectDropPoint) {
      alert("Select Boarding and Dropping Points");
    } else {
      const payload = {
        selectedTypes: selectedTypes,
        selectedSeats: selectedSeats,
        totalFare: selectedSeats.length * seatPrice,
        boardPoint: selectBoardingPoint,
        dropPoint: selectDropPoint,
        From: departure,
        To: arrival,
        date: date,
        busData: busData,
        routeDetails: routeDetails,
      };

      dispatch(updateBookingDetails(payload));

      navigate("/passenger-details");
    }
  };

  const [showUpperBerth, setShowUpperBerth] = useState(false);
  const [showLowerBerth, setShowLowerBerth] = useState(true);
  const [seatData, setSeatData] = useState(seat_json);

  const toggleUpperBerth = () => {
    setShowUpperBerth((prev) => !prev);
    setShowLowerBerth((prev) => !prev);
  };

  const toggleLowerBerth = () => {
    setShowLowerBerth((prev) => !prev);
    setShowUpperBerth((prev) => !prev);
  };

  // const handleToggelBoard = () => {
  //   setIsOpenBoard(!isOpenBoard);
  // };

  // const handleSelectBoardOption = (value) => {
  //   setSelectBoardingPoint(value);
  //   setIsOpenBoard(false);
  // };

  // const handleToggelDrop = () => {
  //   setIsOpenDrop(!isOpenDrop);
  // };

  // const handleSelectDropOption = (option) => {
  //   setSelectDropPoint(option);
  //   setIsOpenDrop(false);
  // };
  const handleSelectedSeats = (seatNo, seatType) => {
    if (selectedSeats.includes(seatNo)) {
      const arr = selectedSeats.filter((item) => item !== seatNo);
      const type = selectedTypes.filter((item) => item !== seatType);
      setSelectedSeats(arr);
      setSelectedTypes(type);
    } else {
      setSelectedSeats([...selectedSeats, seatNo]);
      setSelectedTypes([...selectedTypes, seatType]);
    }
  };

  // const renderSeating = () => {
  //     const totalRows = Object.keys(seat_json);
  //     // console.log(seat_json[2][1]);

  //     let selectedRows;
  //     if (totalRows.length > 6) {
  //         const mid = Math.floor(totalRows.length / 2);
  //         selectedRows = showLowerBerth ? totalRows.slice(0, mid) : totalRows.slice(mid);
  //     } else {
  //         selectedRows = totalRows;
  //     }
  //     return selectedRows.map((row, rowIndex) => {
  //         const seats = seat_json[row];
  //         const seatValues = Object.values(seats);
  //         // Check if all seats in the row are empty
  //         const allSeatsEmpty = seatValues.every(seat => seat.seat === "");
  //         if (allSeatsEmpty) {
  //             return (
  //                 <div key={row} style={{ height: '20px' }}>

  //                 </div>
  //             );
  //         }
  //         const seatsToRender = [];
  //         for (let i = 0; i < seatValues.length; i++) {
  //             let seat = seatValues[i].seat; // Access the 'seat' property
  //         //    if (rowIndex < totalRows.length - 1) {
  //         //         // Check for consecutive rows in the same column
  //         //         const nextRow = totalRows[rowIndex + 1];
  //         //         // console.log(seat_json[nextRow][i]?.seat);
  //         //         const nextSeat = seat_json[nextRow][i]?.seat;
  //         //         if (seat === nextSeat) {
  //         //             seatsToRender.push({ type: 'VerticalSleeper', value: seat });
  //         //             continue; // Skip the next seat as it's already combined
  //         //         }
  //         //     }
  //             if (seat === seatValues[i + 1]?.seat) {
  //                     // Check for consecutive seats in the same row
  //                     // Otherwise, it's a double seat horizontally
  //                     i++; // Skip the next seat as it's already combined
  //                     seatsToRender.push({ type: 'DoubleSeat', value: seat });

  //             }
  //             else {
  //                 if (rowIndex < totalRows.length - 1) {
  //                     // Check for consecutive rows in the same column
  //                     const nextRow = totalRows[rowIndex+1];
  //                     const nextSeat = seat_json[nextRow][i+1]?.seat;

  //                     if (seat === nextSeat) {
  //                         // If both the current and next rows have the same seat occupied, it's a vertical sleeper
  //                         seatsToRender.push({ type: 'VerticalSleeper', value: seat });
  //                          // Skip the next seat as it's already combined
  //                     }
  //                     else{
  //                         seatsToRender.push({ type: 'Seat', value: seat });
  //                     }
  //                 }
  //                 }

  //             // if (seat === seatValues[i + 1]?.seat) {
  //             //     // console.log(seat);
  //             //     i++; // Skip the next seat as it's already combined
  //             //     seatsToRender.push({ type: 'DoubleSeat', value: seat });
  //             // } else {
  //             //     seatsToRender.push({ type: 'Seat', value: seat });
  //             // }
  //             // console.log(seatsToRender)
  //         }
  //         return (
  //             <div key={row} className="flex flex-col md:flex-row w-fit md:w-full justify-between">
  //                 {seatsToRender.map((seat, index) => (
  //                     <div key={index} className="">
  //                     {seat.type === 'DoubleSeat' ? (
  //                         <Sleeper
  //                             key={index}
  //                             seatNo={seat.value}
  //                             count={seat.count}
  //                             alreadyBookedSeats={alreadyBookedSeats}
  //                             handleSelectedSeats={handleSelectedSeats}
  //                             selectedSeats={selectedSeats}
  //                             setSelectedSeats={setSelectedSeats}
  //                             setIsModalOpen={setIsModalOpen}
  //                         />
  //                     ) : seat.type === 'VerticalSleeper' ? (
  //                         <VerticalSleeper
  //                             key={index}
  //                             seatNo={seat.value}
  //                             count={seat.count}
  //                             alreadyBookedSeats={alreadyBookedSeats}
  //                             handleSelectedSeats={handleSelectedSeats}
  //                             selectedSeats={selectedSeats}
  //                             setSelectedSeats={setSelectedSeats}
  //                             setIsModalOpen={setIsModalOpen}
  //                         />
  //                     ) : (
  //                         <Seat
  //                             key={index}
  //                             seatNo={seat.value}
  //                             alreadyBookedSeats={alreadyBookedSeats}
  //                             handleSelectedSeats={handleSelectedSeats}
  //                             selectedSeats={selectedSeats}
  //                             setSelectedSeats={setSelectedSeats}
  //                             setIsModalOpen={setIsModalOpen}
  //                         />
  //                     )}
  //                 </div>

  //                 ))}
  //             </div>
  //         );
  //     });
  // };

  const renderSeating = () => {
    const totalRows = Object.keys(seat_json);
    // console.log(seat_json[2][1]);

    let selectedRows;
    if (totalRows.length > 6) {
      const mid = Math.floor(totalRows.length / 2);
      selectedRows = showLowerBerth
        ? totalRows.slice(0, mid)
        : totalRows.slice(mid);
    } else {
      selectedRows = totalRows;
    }
    // console.log(selectedRows);
    let match = [];
    return selectedRows.map((row, rowIndex) => {
      const seats = seat_json[row];
      const seatValues = Object.values(seats);
      // console.log(seatValues[4].is_available);
      // Check if all seats in the row are empty
      const allSeatsEmpty = seatValues.every((seat) => seat.seat === "");
      // console.log(allSeatsEmpty)
      if (allSeatsEmpty) {
        return <div key={row} style={{ height: "20px" }}></div>;
      }
      let i;

      const seatsToRender = [];
      for (i = 0; i < seatValues.length; i++) {
        let seat = seatValues[i].seat; // Access the 'seat' property
        // console.log(seatValues[i]);
        // console.log(seat);
        // break;
        if (seat !== "") {
          if (seat === seatValues[i + 1]?.seat) {
            // Check for consecutive seats in the same row
            // Otherwise, it's a double seat horizontally
            i++; // Skip the next seat as it's already combined
            seatsToRender.push({
              type: "DoubleSeat",
              value: seat,
              available: seatValues[i].is_available,
            });
          } else {
            if (rowIndex < totalRows.length - 1) {
              // Check for consecutive rows in the same column
              const nextRow = totalRows[rowIndex + 1];
              const nextSeat = seat_json[nextRow][i + 1]?.seat;

              if (seat === nextSeat) {
                // If both the current and next rows have the same seat occupied, it's a vertical sleeper
                // console.log(seat);
                seatsToRender.push({
                  type: "VerticalSleeper",
                  value: seat,
                  available: seatValues[i].is_available,
                });
                // Skip the next seat as it's already combined

                //  if (Number.isInteger(parseInt(seat))) {
                //     match=match+1;
                // }
                match.push(seat);
              } else if (!match.includes(seat)) {
                seatsToRender.push({
                  type: "Seat",
                  value: seat,
                  available: seatValues[i].is_available,
                });
              }
            }
          }
        }
      }
      // return (
      //     <div key={row} className="flex flex-col md:flex-row w-fit md:w-full justify-between">
      //         {seatsToRender.map((seat, index) => (
      //             <div key={index} className="">
      //             {seat.type === 'DoubleSeat' ? (
      //                 <Sleeper
      //                     key={index}
      //                     seatNo={seat.value}
      //                     count={seat.count}
      //                     alreadyBookedSeats={alreadyBookedSeats}
      //                     handleSelectedSeats={handleSelectedSeats}
      //                     selectedSeats={selectedSeats}
      //                     setSelectedSeats={setSelectedSeats}
      //                     setIsModalOpen={setIsModalOpen}
      //                 />
      //             ) : seat.type === 'VerticalSleeper' ? (
      //                 <VerticalSleeper
      //                     key={index}
      //                     seatNo={seat.value}
      //                     count={seat.count}
      //                     alreadyBookedSeats={alreadyBookedSeats}
      //                     handleSelectedSeats={handleSelectedSeats}
      //                     selectedSeats={selectedSeats}
      //                     setSelectedSeats={setSelectedSeats}
      //                     setIsModalOpen={setIsModalOpen}
      //                 />
      //             ) : (
      //                 <Seat
      //                     key={index}
      //                     seatNo={seat.value}
      //                     alreadyBookedSeats={alreadyBookedSeats}
      //                     handleSelectedSeats={handleSelectedSeats}
      //                     selectedSeats={selectedSeats}
      //                     setSelectedSeats={setSelectedSeats}
      //                     setIsModalOpen={setIsModalOpen}
      //                 />
      //             )}
      //         </div>

      //         ))}
      //     </div>
      // );
      return (
        <tr key={rowIndex}>
          {seatsToRender.map((seat, index) =>
            seat.type === "DoubleSeat" ? (
              <td key={index} class={index} colspan={2}>
                <Sleeper
                  available={seat.available}
                  seatType={seat.type}
                  seatNo={seat.value}
                  count={seat.count}
                  alreadyBookedSeats={alreadyBookedSeats}
                  handleSelectedSeats={handleSelectedSeats}
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                  setIsModalOpen={setIsModalOpen}
                />
              </td>
            ) : seat.type === "VerticalSleeper" ? (
              <td rowSpan={2} key={index} class={index}>
                <VerticalSleeper
                  seatType={seat.type}
                  seatNo={seat.value}
                  count={seat.count}
                  available={seat.available}
                  alreadyBookedSeats={alreadyBookedSeats}
                  handleSelectedSeats={handleSelectedSeats}
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                  setIsModalOpen={setIsModalOpen}
                />
              </td>
            ) : (
              <td key={index} class={index}>
                <Seat
                  available={seat.available}
                  seatType={seat.type}
                  seatNo={seat.value}
                  alreadyBookedSeats={alreadyBookedSeats}
                  handleSelectedSeats={handleSelectedSeats}
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                  setIsModalOpen={setIsModalOpen}
                />
              </td>
            )
          )}
        </tr>
      );
    });
  };

  // const renderSeating1 = () => {
  //     // console.log(seatData);
  //     const values = {};
  //     let prvTable = [];
  //     let prvTableUp = [];

  //     const fetch = () => {
  //         for (let row = 1; row <= 12; row++) {
  //             const seats = seatData[row];

  //             for (let i = 1; i <= 15; i++) {
  //                 const seatKey = { row, seat: i };
  //                 const seatInfo = seats ? seats[seatKey.seat] : null;
  //                 const value = seatInfo ? seatInfo.seat : '';

  //                 if (value !== '') {
  //                     if (values[value]) {
  //                         values[value]++;
  //                     } else {
  //                         values[value] = 1;
  //                     }
  //                 }
  //             }
  //         }
  //     }
  //     fetch();
  //     console.log(values);
  //     const renderRow = (row, isUpper) => {
  //         const seats = seatData[row];
  //         const rowSeats = []; // Store seats for the current row

  //         for (let i = 1; i <= 15; i++) {
  //             const seatKey = { row, seat: i };
  //             const seatInfo = seats ? seats[seatKey.seat] : null;
  //             const value = seatInfo ? seatInfo.seat : '';

  //             if (value !== '') {
  //                 if (values[value] === 2) {
  //                     const adjacentSeats = getAdjacentSeats(row, i);
  //                     // console.log(adjacentSeats);
  //                     if (isUpper) {
  //                         processAdjacentSeats(adjacentSeats, value, prvTableUp, rowSeats);
  //                     } else {
  //                         processAdjacentSeats(adjacentSeats, value, prvTable, rowSeats);
  //                     }
  //                 } else {
  //                     rowSeats.push(
  //                         <td key={`td-${row}-${i}`}>
  //                             <Seat
  //                                 key={`td-${row}-${i}`}
  //                                 seatNo={value}
  //                                 alreadyBookedSeats={alreadyBookedSeats}
  //                                 handleSelectedSeats={handleSelectedSeats}
  //                                 selectedSeats={selectedSeats}
  //                                 setSelectedSeats={setSelectedSeats}
  //                                 setIsModalOpen={setIsModalOpen}
  //                             />
  //                         </td>
  //                     );
  //                 }
  //             } else {
  //                 rowSeats.push(
  //                     <td key={`td-${row}-${i}`}>
  //                         <div className="h-5"></div>
  //                     </td>
  //                 );
  //             }
  //         }

  //         // Add the rowSeats to the appropriate table
  //         if (isUpper) {
  //             prvTableUp.push(rowSeats);
  //         } else {
  //             prvTable.push(rowSeats);
  //         }
  //     };

  //     const getAdjacentSeats = (row, seat) => {
  //         const adjacentSeats = [];
  //         if (row > 1) adjacentSeats.push({ row: row - 1, seat: seat });
  //         if (row < 14) adjacentSeats.push({ row: row + 1, seat: seat });
  //         if (seat > 1) adjacentSeats.push({ row: row, seat: seat - 1 });
  //         if (seat < 15) adjacentSeats.push({ row: row, seat: seat + 1 });
  //         return adjacentSeats;
  //     };

  //     const processAdjacentSeats = (adjacentSeats, value, table, rowSeats) => {
  //         adjacentSeats.forEach((adjSeat) => {
  //             // console.log(adjSeat)
  //             const adjValue = seatData[adjSeat.row]?.[adjSeat.seat]?.seat || '';
  //             if (adjValue === value) {
  //                 rowSeats.push(
  //                     <td key={`td-${adjSeat.row}-${adjSeat.seat}`} >
  //                         <Sleeper
  //                             key={`td-${adjSeat.row}-${adjSeat.seat}`}
  //                             seatNo={value}
  //                             alreadyBookedSeats={alreadyBookedSeats}
  //                             handleSelectedSeats={handleSelectedSeats}
  //                             selectedSeats={selectedSeats}
  //                             setSelectedSeats={setSelectedSeats}
  //                             setIsModalOpen={setIsModalOpen}
  //                         />
  //                     </td>
  //                 );
  //             }
  //         });
  //     };

  //     for (let row = 1; row <= 12; row++) {
  //         if (showUpperBerth && row >= 7) {
  //             renderRow(row, true);
  //         } else if (showLowerBerth && row <= 6) {
  //             renderRow(row, false);
  //         }
  //     }

  //     // console.log(prvTable)
  //     return [...prvTable, ...prvTableUp].flat();
  // };

  // const { prvTable, prvTableUp } = renderSeating1();

  // console.log(routeDetails);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 rounded-md  bg-primarycolors-gray/20">
      <div className="p-2 col-span-2 w-full">
        {/* <p>{totalSeats - filledSeats.length} Seats Available</p> */}
        <div className="border-[1px] rounded-md border-dotted border-primarycolors-textcolor  w-full md:flex justify-center pt-3 pb-1 px-1  ">
          <div className="flex  items-center h-[100%] justify-center md:justify-between w-full">
            <div className="w-full  ">
              <div className="sm:flex  justify-center sm:m-4 space-x-2 sm:space-x-4">
                <button
                  onClick={toggleUpperBerth}
                  className={`px-2 py-1 ${
                    showUpperBerth
                      ? "bg-primarycolors-skyblue"
                      : "bg-primarycolors-textcolor/10"
                  }  bg-blue-500 text-white rounded-md`}
                >
                  {showUpperBerth ? "Upper Berth" : "Show Upper Berth"}
                </button>
                <button
                  onClick={toggleLowerBerth}
                  className={`px-2 py-1 my-2 sm:my-0 ${
                    showLowerBerth
                      ? "bg-primarycolors-skyblue"
                      : "bg-primarycolors-textcolor/10"
                  }  bg-blue-500 text-white rounded-md`}
                >
                  {showLowerBerth ? "Lower Berth" : "Show Lower Berth"}
                </button>
              </div>

              <div className=" flex  m-3  p-2  rounded-md mt-2  overflow-x-scroll  border-[1px] ">
                <div className=" border-r-[1px] pt-3 pr-2">
                  <svg
                    x="0px"
                    y="0px"
                    viewBox="0 0 24 24"
                    width="2rem"
                    height="2rem"
                    fill="currentColor"
                    style={{ rotate: "270deg" }}
                  >
                    <g transform="matrix(0.022438, 0, 0, 0.022438, 0.781086, 0.781028)">
                      <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
                        <path d="M4456.6,4992.6c-1186-146.8-2204.3-655.9-3009.9-1500.5C757.8,2770.3,335.5,1928.7,152.8,922.4c-68.9-392.3-71.9-1230.9,0-1617.3c128.8-715.8,437.3-1458.6,835.6-2021.6c242.6-344.4,829.6-934.4,1171-1174c937.4-661.9,2126.4-985.3,3234.6-883.5c694.8,65.9,1144.1,191.7,1773,497.2c518.1,254.5,853.6,497.1,1287.8,931.4c197.7,197.7,446.3,482.2,551.1,628.9C9221.6-2411,9539-1782,9652.8-1431.7c335.4,1009.3,329.4,2129.4-18,3141.7c-122.8,365.4-404.3,913.5-634.9,1239.9c-239.6,341.4-829.6,928.4-1174,1171c-560.1,395.3-1317.8,709.8-2006.6,832.6C5492.8,5010.5,4765,5031.5,4456.6,4992.6z M5585.7,4019.2c1233.9-182.7,2330.1-964.4,2914.1-2081.5l152.7-296.5H4998.7H1341.8l107.8,218.6c380.4,760.7,1000.3,1389.7,1755.1,1773C3947.4,4010.2,4762.1,4142,5585.7,4019.2z M5352,997.3c545.1-191.7,691.9-904.5,266.6-1290.8c-161.7-143.8-302.5-197.7-518.1-200.6c-212.6,0-356.4,53.9-518.1,203.7c-173.7,155.8-245.6,320.5-245.6,560.1C4336.8,805.6,4848.9,1174,5352,997.3z M1955.8,23.9c290.5-74.9,679.9-254.6,928.4-434.3c275.5-197.7,637.9-596,802.6-886.5c263.6-464.2,407.3-1078.2,365.4-1554.4c-21-239.6-119.8-703.8-164.7-775.7c-32.9-56.9-188.7-12-566,164.7c-425.3,200.7-760.7,437.3-1111.1,790.7c-622.9,620-994.3,1350.7-1123.1,2216.3c-24,155.7-44.9,350.4-44.9,431.3v146.8l338.4-18C1563.4,95.8,1824,59.9,1955.8,23.9z M8949-27c0-80.9-21-272.5-44.9-428.3c-128.8-865.6-500.2-1599.3-1123.1-2216.3c-353.4-353.4-691.8-593-1111.1-790.7c-425.3-197.7-404.3-197.7-461.2-12c-128.8,440.2-137.8,1132.1-18,1536.4c74.9,245.6,263.6,649.9,392.3,838.6c488.2,709.8,1371.7,1198,2195.3,1210l170.7,3V-27z"></path>
                      </g>
                    </g>
                  </svg>
                </div>

                <div className="flex  p-2 md:flex-col justify-evenly md:justify-between  ">
                  <table className="flex flex-col md:flex-row w-fit md:w-full justify-between ">
                    <tbody>{renderSeating()}</tbody>
                  </table>
                </div>
              </div>

              {/* <div className="sm:flex justify-center sm:m-4 space-x-2 sm:space-x-4">
                                <button
                                    onClick={toggleUpperBerth}
                                    className={`px-2 py-1 ${showUpperBerth ? 'bg-primarycolors-skyblue' : 'bg-primarycolors-textcolor/10'} bg-blue-500 text-white rounded-md`}
                                >
                                    {showUpperBerth ? 'Upper Berth' : 'Show Upper Berth'}
                                </button>
                                <button
                                    onClick={toggleLowerBerth}
                                    className={`px-2 py-1 my-2 sm:my-0 ${showLowerBerth ? 'bg-primarycolors-skyblue' : 'bg-primarycolors-textcolor/10'} bg-blue-500 text-white rounded-md`}
                                >
                                    {showLowerBerth ? 'Lower Berth' : 'Show Lower Berth'}
                                </button>
                            </div>

                            <div className="flex m-3 p-2 rounded-md mt-2 overflow-x-scroll border-[1px]">
                                <div className="border-r-[1px] pt-3 pr-2">

                                    <svg x="0px" y="0px" viewBox="0 0 24 24" width="2rem" height="2rem" fill="currentColor" style={{ rotate: "270deg" }}><g transform="matrix(0.022438, 0, 0, 0.022438, 0.781086, 0.781028)"><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M4456.6,4992.6c-1186-146.8-2204.3-655.9-3009.9-1500.5C757.8,2770.3,335.5,1928.7,152.8,922.4c-68.9-392.3-71.9-1230.9,0-1617.3c128.8-715.8,437.3-1458.6,835.6-2021.6c242.6-344.4,829.6-934.4,1171-1174c937.4-661.9,2126.4-985.3,3234.6-883.5c694.8,65.9,1144.1,191.7,1773,497.2c518.1,254.5,853.6,497.1,1287.8,931.4c197.7,197.7,446.3,482.2,551.1,628.9C9221.6-2411,9539-1782,9652.8-1431.7c335.4,1009.3,329.4,2129.4-18,3141.7c-122.8,365.4-404.3,913.5-634.9,1239.9c-239.6,341.4-829.6,928.4-1174,1171c-560.1,395.3-1317.8,709.8-2006.6,832.6C5492.8,5010.5,4765,5031.5,4456.6,4992.6z M5585.7,4019.2c1233.9-182.7,2330.1-964.4,2914.1-2081.5l152.7-296.5H4998.7H1341.8l107.8,218.6c380.4,760.7,1000.3,1389.7,1755.1,1773C3947.4,4010.2,4762.1,4142,5585.7,4019.2z M5352,997.3c545.1-191.7,691.9-904.5,266.6-1290.8c-161.7-143.8-302.5-197.7-518.1-200.6c-212.6,0-356.4,53.9-518.1,203.7c-173.7,155.8-245.6,320.5-245.6,560.1C4336.8,805.6,4848.9,1174,5352,997.3z M1955.8,23.9c290.5-74.9,679.9-254.6,928.4-434.3c275.5-197.7,637.9-596,802.6-886.5c263.6-464.2,407.3-1078.2,365.4-1554.4c-21-239.6-119.8-703.8-164.7-775.7c-32.9-56.9-188.7-12-566,164.7c-425.3,200.7-760.7,437.3-1111.1,790.7c-622.9,620-994.3,1350.7-1123.1,2216.3c-24,155.7-44.9,350.4-44.9,431.3v146.8l338.4-18C1563.4,95.8,1824,59.9,1955.8,23.9z M8949-27c0-80.9-21-272.5-44.9-428.3c-128.8-865.6-500.2-1599.3-1123.1-2216.3c-353.4-353.4-691.8-593-1111.1-790.7c-425.3-197.7-404.3-197.7-461.2-12c-128.8,440.2-137.8,1132.1-18,1536.4c74.9,245.6,263.6,649.9,392.3,838.6c488.2,709.8,1371.7,1198,2195.3,1210l170.7,3V-27z"></path></g></g></svg>

                                </div>

                                <div className="flex p-2 md:flex-col justify-evenly md:justify-between">
                                    {prvTable.length > 0 && (
                                        <>

                                            <div className="lower-data">
                                                <div id="table-container">
                                                    <table cellspacing="0" cellpadding="0" style={{ width: '100%' }}>
                                                        <colgroup>
                                                            <col />
                                                        </colgroup>
                                                        <tbody>
                                                            {prvTable.map((row, index) => (

                                                                <tr className="  " key={`row-${index}`}>{row}</tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {prvTableUp.length > 0 && (
                                        <>

                                            <div className="upper-data">
                                                <div id="table-containerUp">
                                                    <table cellspacing="0" cellpadding="0" style={{ width: '100%' }}>
                                                        <colgroup>
                                                            <col />
                                                        </colgroup>
                                                        <tbody>
                                                            {prvTableUp.map((row, index) => (
                                                                <tr key={`row-${index}`}>{row}</tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div> */}
            </div>
          </div>
        </div>
      </div>
      <div>
        {selectedSeats.length === 0 && (
          <div className="flex flex-col  h-full justify-evenly items-center ">
            <div className="mx-auto my-3">
              <div style={{ fontWeight: "bold" }}>SEAT LEGEND</div>
              <div className="flex flex-wrap justify-start md:justify-center items-center">
                <div className="p-3">
                  <MdCheckBoxOutlineBlank className="bg-primarycolors-gray text-xl" />
                  &nbsp;&nbsp;
                  <span>Available</span>
                </div>
                <div className="p-3">
                  <MdCheckBoxOutlineBlank className="bg-primarycolors-red outline-none text-xl" />
                  &nbsp;&nbsp;
                  <span>Unavailable</span>
                </div>
                <div className="p-3">
                  <MdCheckBoxOutlineBlank className="bg-primarycolors-skyblue outline-none text-xl" />
                  &nbsp;&nbsp;
                  <span>Selected</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedSeats.length > 0 && (
          <div className="flex flex-col justify-between p-4 text-left  ">
            <div className="my-5">
              {/* <h1 className="font-bold uppercase text-center text-primarycolors-red">
                Journey Details:
              </h1>
              <div className="mb-2 p-3 text-sm">
                <p className="m-2">
                  From: <span className="font-bold uppercase">{departure}</span>
                </p>
                <p className="m-2">
                  To: <span className="font-bold uppercase">{arrival}</span>
                </p>
                <p className="m-2">
                  Date: <span className="font-bold uppercase">{date}</span>
                </p>
              </div>
              <hr className="my-2" /> */}
              <div className="p-1">
                <div className="p-2">
                  Selected Seats:
                  {selectedSeats.map((seat) => (
                    <span className="font-bold" key={seat}>
                      {seat},
                    </span>
                  ))}
                </div>
                <div className="p-2">
                  Total Amount:
                  <span className="font-bold">
                    <span className="">&#8377;</span>
                    {seatPrice * selectedSeats.length}
                  </span>
                </div>
                {/* <div className="relative flex py-2 ">
                  <p className="mx-2">Boarding Point: </p>
                  <div
                    className="cursor-pointer px-7 flex justify-center items-center bg-primarycolors-textcolor/20 font-bold rounded w-auto"
                    onClick={handleToggelBoard}
                  >
                    {selectBoardingPoint || "Select"}
                    {isOpenBoard ? (
                      <MdArrowDropDown className="text-xl" />
                    ) : (
                      <MdArrowDropDown className="rotate-90 text-xl" />
                    )}
                  </div>
                  {isOpenBoard && (
                    <div className="absolute z-10 h-[150px] overflow-y-auto overflow-hidden top-full left-0 right-0 mt-0 bg-primarycolors-white shadow-md rounded-md">
                      {boardingPoints.map((item, index) => (
                        <div
                          key={index}
                          className="cursor-pointer px-4 py-2 hover:bg-primarycolors-red/50"
                          onClick={() =>
                            handleSelectBoardOption(item.boading_points)
                          }
                        >
                          {item.boading_points}
                        </div>
                      ))}
                    </div>
                  )}
                </div> */}
                {/* <div>
                  <select onChange={handleSelectBoardOption}>
                    <option>
                      <input type="search" />
                    </option>
                    {boardingPoints.map((item, index) => (
                      <option key={index} value={item.boading_points}>
                        {item.boading_points}
                      </option>
                    ))}
                  </select>
                </div> */}

                {/* <div>
                  <input
                    type="search"
                    placeholder="Search..."
                    onChange={handleSelectBoardOption}
                  />
                  <select onChange={handleSelectBoardOption}>
                  {boardingPoints.map(
                    (item, index) =>
                    <option key={index} value={item.boading_points}>
                      {item.boading_points}
                    </option>
                  )}
                  </select>
                </div> */}
                <div className="App">
                  <Select
                    className="boradingPoint"
                    defaultValue={selectBoardingPoint}
                    onChange={(selectedOption) => {
                      setSelectBoardingPoint(selectedOption.value);
                      setIsOpenDrop(true); // Close the dropdown menu
                    }}
                    placeholder="Search Boarding Point"
                    options={boardingoptions}
                  />
                </div>
                {isOpenDrop && (
                  <div className="App mt-3">
                    <Select
                      className="boradingPoint"
                      defaultValue={selectDropPoint}
                      onChange={(selectedOption) =>
                        setSelectDropPoint(selectedOption.value)
                      }
                      placeholder="Search Droping Point"
                      options={dropingoptions}
                    />
                  </div>
                )}
                {/* <div className="my-4 relative flex">
                  <p className="mx-2">Dropping Point: </p>
                  <div
                    className="cursor-pointer px-7 flex justify-center items-center bg-primarycolors-textcolor/20 font-bold rounded w-auto"
                    onClick={handleToggelDrop}
                  >
                    {selectDropPoint || "Select"}
                    {isOpenDrop ? (
                      <MdArrowDropDown className="text-xl" />
                    ) : (
                      <MdArrowDropDown className="rotate-90 text-xl" />
                    )}
                  </div>
                  {isOpenDrop && (
                    <div className="absolute z-10 h-[150px] overflow-y-auto  top-full left-0 right-0 mt-2 bg-primarycolors-white shadow-md rounded-md">
                      {boardingPoints.map((item, index) => (
                        <div
                          key={index}
                          className="cursor-pointer px-4 py-2 hover:bg-primarycolors-red/50"
                          onClick={() =>
                            handleSelectDropOption(item.boading_points)
                          }
                        >
                          {item.boading_points}
                        </div>
                      ))}
                    </div>
                  )}
                </div> */}
              </div>
              {/* <hr className="my-2" /> */}
            </div>
            {selectBoardingPoint !== null && selectDropPoint !== null && (
              <div className="my-3 w-full items-center flex justify-center md:my-0 mr-[2rem] bg-primarycolors-red rounded-md">
                <button
                  type="submit"
                  onClick={handleBookSeat}
                  className="py-1 px-2 mx-3 text-primarycolors-white text-lg"
                >
                  Proceed to Book Seat
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSeat;
