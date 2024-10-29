import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import SortingBar from "./SortingBar";
import busData from "../../constant/Bus";
import nobus from "../../assets/no bus found.svg";
import { useSelector, useDispatch } from "react-redux";
import BusBox from "./BusBox";
import { getBusDetails } from "../../Redux/BookBus/action";
import { Navigation, Pagination, Autoplay, Scrollbar } from "swiper/modules";
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react";

// Styles must use direct files imports
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import Loader from "../Loader";
import OffersSection from "../OffersSection";
import { MdFilter, MdSort } from "react-icons/md";
import OfferCardMob from "./Mobile/OfferCardMob";
import {
  updateFilterDetails,
  updateSelectedPoints,
} from "../../Redux/FilterAndSort/action";
import { BiReset, BiX } from "react-icons/bi";
const resetState = {
  departureTime: {
    before6am: false,
    "6amto12pm": false,
    "12pmto6pm": false,
    after6pm: false,
  },
  busType: {
    seater: false,
    sleeper: false,
    ac: false,
    nonac: false,
  },
  arrivalTime: {
    before6am: false,
    "6amto12pm": false,
    "12pmto6pm": false,
    after6pm: false,
  },
  sortingProperty: "None",
};
const Right = ({ setIsModalOpen, isCal }) => {
  let { search } = useLocation();

  const query = new URLSearchParams(search);

  const departure = query.get("departure");
  const arrival = query.get("arrival");
  const date = query.get("date");

  const isLoading = useSelector((state) => state.busDetailsReducer.isLoading);
  const isError = useSelector((state) => state.busDetailsReducer.isError);
  const isSuccess = useSelector((state) => state.busDetailsReducer.isSuccess);

  const matchedBuses = useSelector(
    (state) => state.busDetailsReducer.matchedBuses
  );
  // console.log(matchedBuses);
  var filteredMatchedBuses = [...matchedBuses];
  console.log(filteredMatchedBuses);
  const selectedBoardingPoints = useSelector(
    (state) => state.updateFilterDetailsReducer.selectedBoardingPoints
  );
  const selectedDroppingPoints = useSelector(
    (state) => state.updateFilterDetailsReducer.selectedDroppingPoints
  );

  const isBoardingEmpty = selectedBoardingPoints.length === 0;
  const isDroppingEmpty = selectedDroppingPoints.length === 0;
  // console.log(isBoardingEmpty);
  // Filter based on selected boarding points in via_route only if it's not empty
  if (!isBoardingEmpty) {
    filteredMatchedBuses = filteredMatchedBuses.filter((item) => {
      const viaRoute = item.via_route || [];
      // console.log(viaRoute);
      const hasMatchingBoardingPoint = viaRoute.some((route) =>
        selectedBoardingPoints.includes(route.boading_points)
      );
      return hasMatchingBoardingPoint;
    });
  }

  // Filter based on selected dropping points in via_route only if it's not empty
  if (!isDroppingEmpty) {
    filteredMatchedBuses = filteredMatchedBuses.filter((item) => {
      const viaRoute = item.via_route || [];
      const hasMatchingDroppingPoint = viaRoute.some((route) =>
        selectedDroppingPoints.includes(route.boading_points)
      );
      return hasMatchingDroppingPoint;
    });
  }

  const checkBusType = useSelector(
    (state) => state.updateFilterDetailsReducer.busType
  );

  if (
    checkBusType["seater"] === false &&
    checkBusType["sleeper"] === false &&
    checkBusType["ac"] === false &&
    checkBusType["nonac"] === false
  ) {
  } else {
    filteredMatchedBuses = filteredMatchedBuses.filter((item) => {
      // console.log(item);
      return (
        (checkBusType["seater"] === true && item.busType === "Seater") ||
        (checkBusType["sleeper"] === true && item.busType === "Sleeper") ||
        (checkBusType["ac"] === true && item.bus_type_ac === "1") ||
        (checkBusType["nonac"] === true && item.bus_type_ac === "0")
      );
    });
  }

  //checking and filtering depature time
  const checkDepartTime = useSelector(
    (state) => state.updateFilterDetailsReducer.departureTime
  );

  if (
    checkDepartTime["before6am"] === false &&
    checkDepartTime["6amto12pm"] === false &&
    checkDepartTime["12pmto6pm"] === false &&
    checkDepartTime["after6pm"] === false
  ) {
  } else {
    filteredMatchedBuses = filteredMatchedBuses.filter((item) => {
      return (
        (checkDepartTime["before6am"] === true &&
          item.via_route.length > 0 &&
          item.via_route[0].time >= "00:10" &&
          item.via_route[0].time < "06:00") ||
        (checkDepartTime["6amto12pm"] === true &&
          item.via_route.length > 0 &&
          item.via_route[0].time >= "06:00" &&
          item.via_route[0].time < "12:00") ||
        (checkDepartTime["12pmto6pm"] === true &&
          item.via_route.length > 0 &&
          item.via_route[0].time >= "12:00" &&
          item.via_route[0].time < "18:00") ||
        (checkDepartTime["after6pm"] === true &&
          item.via_route.length > 0 &&
          item.via_route[0].time >= "18:00" &&
          item.via_route[0].time < "24:00")
      );
    });
  }

  //checking and filtering arrival time
  const checkArrivalTime = useSelector(
    (state) => state.updateFilterDetailsReducer.arrivalTime
  );

  if (
    checkArrivalTime["before6am"] === false &&
    checkArrivalTime["6amto12pm"] === false &&
    checkArrivalTime["12pmto6pm"] === false &&
    checkArrivalTime["after6pm"] === false
  ) {
  } else {
    filteredMatchedBuses = filteredMatchedBuses.filter((item) => {
      // console.log(item);
      return (
        (checkArrivalTime["before6am"] === true &&
          item.via_route.length > 0 &&
          item.via_route[item.via_route.length - 1].time >= "00:10" &&
          item.via_route[item.via_route.length - 1].time < "06:00") ||
        (checkArrivalTime["6amto12pm"] === true &&
          item.via_route.length > 0 &&
          item.via_route[item.via_route.length - 1].time >= "06:00" &&
          item.via_route[item.via_route.length - 1].time < "12:00") ||
        (checkArrivalTime["12pmto6pm"] === true &&
          item.via_route.length > 0 &&
          item.via_route[item.via_route.length - 1].time >= "12:00" &&
          item.via_route[item.via_route.length - 1].time < "18:00") ||
        (checkArrivalTime["after6pm"] === true &&
          item.via_route.length > 0 &&
          item.via_route[item.via_route.length - 1].time >= "18:00" &&
          item.via_route[item.via_route.length - 1].time < "24:00")
      );
    });
  }

  const sortingProperty = useSelector(
    (state) => state.updateFilterDetailsReducer.sortingProperty
  );

  if (sortingProperty !== "None") {
    // console.log(sortingProperty);
    if (sortingProperty === "lowtohigh") {
      filteredMatchedBuses.sort((a, b) => Number(a.fare) - Number(b.fare));
    }

    if (sortingProperty === "hightolow") {
      filteredMatchedBuses.sort((a, b) => Number(b.fare) - Number(a.fare));
    }
  }

  const [selectedFilters, setSelectedFilters] = useState({});
  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const initialFilters = useRef({
    busType: { ...checkBusType },
    departureTime: { ...checkDepartTime },
    sortingProperty,
  });

  // Function to update the selected filters state whenever filters change
  const updateSelectedFilters = () => {
    setSelectedFilters({
      busType: checkBusType,
      departureTime: checkDepartTime,
      sortingProperty,
    });

    // console.log(sortingProperty);
    // Check if any filter option is selected
    const isAnyFilterSelected =
      Object.values(checkBusType).some((value) => value === true) ||
      Object.values(checkDepartTime).some((value) => value === true) ||
      sortingProperty !== "None";

    // Set the isFilterClicked state accordingly
    setIsFilterClicked(isAnyFilterSelected);
  };

  // Call the updateSelectedFilters function whenever filters change
  useEffect(() => {
    updateSelectedFilters();
  }, [checkBusType, checkDepartTime, sortingProperty]);

  const isFilterValueChanged = (filterType) => {
    if (filterType === "busType" || filterType === "departureTime") {
      return (
        JSON.stringify(initialFilters.current[filterType]) !==
        JSON.stringify(selectedFilters[filterType])
      );
    }
  };

  const resetFilter = (filterType, filterValue) => {
    /*  console.log(filterType);
     console.log(filterValue); */
    if (filterType === "busType") {
      const nbus = {
        ...checkBusType,
        [filterValue]: !checkBusType[filterValue],
      };
      dispatch(updateFilterDetails({ key: "busType", value: nbus }));
    }

    if (filterType === "departureTime") {
      const nbus = {
        ...checkDepartTime,
        [filterValue]: !checkDepartTime[filterValue],
      };
      // console.log(nbus);
      dispatch(updateFilterDetails({ key: "departureTime", value: nbus }));
    }

    if (filterType === "sortingProperty") {
      dispatch(updateFilterDetails({ key: "sortingProperty", value: "None" }));
    }
  };
  const resetAllFilters = () => {
    dispatch(
      updateFilterDetails({ key: "busType", value: resetState.busType })
    );
    dispatch(
      updateFilterDetails({
        key: "departureTime",
        value: resetState.departureTime,
      })
    );
    dispatch(
      updateFilterDetails({ key: "arrivalTime", value: resetState.arrivalTime })
    );

    dispatch(
      updateFilterDetails({
        key: "sortingProperty",
        value: "None",
      })
    );

    dispatch(updateSelectedPoints([], []));

    setSelectedFilters({});
    setIsFilterClicked(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBusDetails(departure, arrival, date));
  }, [arrival, date, departure, dispatch]);

  // useEffect(() => {
  //   console.log("isCalender value:", isCal);
  // }, [isCal]);

  return (
    <div>
      {/*   {departure},{arrival},{date} */}
      <SortingBar />
      {isLoading && <Loader />}
      {isError && <div>Something went wrong</div>}

      {isSuccess && (
        <>
          <div className=" md:hidden pt-4 px-4 z-0">
            <Swiper
              className=""
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={10}
              slidesPerView={1.5}
              autoplay={true}
              /*  onSlideChange={() => console.log('slide change')}
           onSwiper={(swiper) => console.log(swiper)} */
            >
              <SwiperSlide>
                {" "}
                <OfferCardMob image="https://static.abhibus.com/busgallery/offerbanners/Dec2022/30/1672393950/476X220.webp" />{" "}
              </SwiperSlide>

              <SwiperSlide>
                {" "}
                <OfferCardMob image="https://static.abhibus.com/busgallery/offerbanners/Dec2022/30/1672393950/476X220.webp" />{" "}
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <OfferCardMob image="https://static.abhibus.com/busgallery/offerbanners/Dec2022/30/1672393950/476X220.webp" />{" "}
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <OfferCardMob image="https://static.abhibus.com/busgallery/offerbanners/Dec2022/30/1672393950/476X220.webp" />{" "}
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <OfferCardMob image="https://static.abhibus.com/busgallery/offerbanners/Dec2022/30/1672393950/476X220.webp" />{" "}
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="hidden md:block   pt-4 px-2">
            <Swiper
              className=" "
              style={{ zIndex: isCal ? -1 : 1 }}
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={10}
              slidesPerView={3}
              autoplay={true}
            >
              <SwiperSlide>
                {" "}
                <OfferCardMob image="https://static.abhibus.com/busgallery/offerbanners/Dec2022/30/1672393950/476X220.webp" />{" "}
              </SwiperSlide>

              <SwiperSlide>
                {" "}
                <OfferCardMob image="https://static.abhibus.com/busgallery/offerbanners/Dec2022/30/1672393950/476X220.webp" />{" "}
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <OfferCardMob image="https://static.abhibus.com/busgallery/offerbanners/Dec2022/30/1672393950/476X220.webp" />{" "}
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <OfferCardMob image="https://static.abhibus.com/busgallery/offerbanners/Dec2022/30/1672393950/476X220.webp" />{" "}
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <OfferCardMob image="https://static.abhibus.com/busgallery/offerbanners/Dec2022/30/1672393950/476X220.webp" />{" "}
              </SwiperSlide>
            </Swiper>
          </div>
        </>
      )}

      {isFilterClicked && (
        <div className="md:hidden m-2">
          {/* Display the selected filters */}
          <div className=" flex flex-wrap">
            <div
              onClick={resetAllFilters}
              className="px-5 cursor-pointer py-2 m-1 font-semibold flex items-center gap-1   text-sm   bg-primarycolors-red rounded-full shadow-md text-primarycolors-white"
            >
              <BiReset className="text-lg" />
              Reset
            </div>
            {sortingProperty !== "None" && (
              <div
                onClick={() =>
                  resetFilter("sortingProperty", { sortingProperty })
                }
                className="px-3 py-2 m-1 flex items-center uppercase text-xs   bg-primarycolors-white rounded-full shadow-md text-primarycolors-textcolor"
              >
                <p> {sortingProperty}</p>
                <button>
                  <BiX className="text-xl" />
                </button>
              </div>
            )}
            {Object.entries(selectedFilters).map(
              ([filterType, filterValue]) => {
                // Display the filter type and selected options if the value changes
                if (isFilterValueChanged(filterType)) {
                  return (
                    <div className="flex flex-wrap" key={filterType}>
                      {Object.entries(filterValue).map(([option, isSelected]) =>
                        isSelected ? (
                          <div className="px-3 py-2 m-1 flex items-center uppercase text-xs   bg-primarycolors-white rounded-full shadow-md text-primarycolors-textcolor">
                            <p>{option}</p>
                            <button
                              onClick={() => resetFilter(filterType, option)}
                              className=""
                            >
                              <BiX className="text-xl" />
                            </button>
                          </div>
                        ) : null
                      )}
                    </div>
                  );
                } else {
                  return null;
                }
              }
            )}
          </div>
        </div>
      )}

      {isSuccess && filteredMatchedBuses.length === 0 && (
        <div className=" mt-[2rem] font-bold">
          {" "}
          <div className=" flex justify-center items-center">
            <img className=" w-1/2 " src={nobus} alt="" />
          </div>{" "}
          No Bus Found.
        </div>
      )}
      <div className="p-2 sm:p-4 sm:px-2  sm:mb-0">
        {filteredMatchedBuses.map((bus, index) => {
          // console.log(bus);
          return (
            <BusBox
              {...bus}
              key={index}
              date={date}
              departure={departure}
              arrival={arrival}
              setIsModalOpen={setIsModalOpen}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Right;
