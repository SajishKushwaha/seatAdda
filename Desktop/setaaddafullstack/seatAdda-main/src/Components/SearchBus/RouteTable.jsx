import React from "react";
import { BiXCircle } from "react-icons/bi";
import { FaBus, FaHotel, FaSourcetree } from "react-icons/fa6";
import { MdDirectionsRailway } from "react-icons/md";

const RouteTable = ({ routes, setShowPopup, setShowFeedbackModal }) => {
  // console.log(routes);
  // Function to remove seconds from a time string
  function removeSeconds(timeString) {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  }
  return (
    <section class="flex flex-col justify-between h-full bg-gray-100 text-gray-600">
      {/* <div class="flex flex-col p-2 sm:p-5  justify-center h-full">
        <div class="w-full max-w-2xl mx-auto bg-white rounded-sm  border-gray-200">
          <header class="py-1  border-gray-100">
            <h2 class="font-semibold text-lg text-gray-800">All Routes</h2>
          </header>
          <div class="p-0 mt-3">
            <div class="overflow-x-auto">
              <table class="table-auto border-collapse w-full">
                <thead class="text-sm  font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr className="text-center bg-primarycolors-skyblue/20">
                    <th class="p-2 whitespace-nowrap border">
                      <div class="font-bold py-3 ">City</div>
                    </th>
                    <th class="p-2 whitespace-nowrap border">
                      <div class="font-bold ">Boarding Point</div>
                    </th>
                    <th class="p-2 whitespace-nowrap border">
                      <div class="font-bold ">Time</div>
                    </th>
                  </tr>
                </thead>
                <tbody class="text-sm divide-y divide-gray-100">
                  {routes.map((route, index) => (
                    <tr key={index}>
                      <td class="  whitespace-nowrap border">
                        <div class="text-left font-medium py-3 ml-1">
                          {route.city}
                        </div>
                      </td>
                      <td class="p-2 px-1 whitespace-nowrap border">
                        <div class="text-left font-medium text-green-500">
                          {route.boading_points}
                        </div>
                      </td>
                      <td class="p-2 px-1 whitespace-nowrap border">
                        <div class="font-medium text-center">{route.time}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div> 
        <button
        className=" my-3 rounded-md w-fit mx-auto text-primarycolors-white bg-primarycolors-red py-2 px-4"
        onClick={() => setShowPopup(false)}
      >
        Close
      </button> */}
      <div className="flex items-center justify-between bg-primarycolors-red px-3 rounded-t-lg  ">
        <h2 className="py-3 text-l text-primarycolors-white font-bold">
          View Route and Timeline
        </h2>
        <button
          type="button"
          className="text-primarycolors-white rounded-lg text-xl pointer  ml-auto inline-flex items-center hover:text-gray-200"
          title="Close"
          // data-modal-toggle="default-modal"
          onClick={() => {
            setShowPopup(false);
          }}
        >
          <BiXCircle size={25} />
        </button>
      </div>{" "}
      {routes.length === 0 && (
        <div className=" flex items-center justify-center font-semibold text-base h-[100px]">
          Not Available
        </div>
      )}
      <div className="overflow-y-auto  custom-scrollbar1 max-h-[300px] ">
        <div className="w-[95%] sm:w-full">
          {routes.map((route, index) => (
            <div
              className={`grid grid-cols-6 items-center py-4 border-b-primarycolors-textcolor pb-1 ${
                index === routes.length - 1 ? "" : "border-b-[1px]"
              } `}
            >
              <div className="col-span-1">
                {route.bording_type === "Bus Stand" && (
                  <FaBus size={25} className=" text-primarycolors-red" />
                )}
                {route.bording_type === "Hotel" && (
                  <FaHotel size={25} className=" text-primarycolors-red" />
                )}
                {route.bording_type === "Others" && (
                  <FaSourcetree size={25} className=" text-primarycolors-red" />
                )}
                 {route.bording_type === "Railway Station" && (
                  <MdDirectionsRailway size={25} className=" text-primarycolors-red" />
                )}
              </div>
              <div className="col-span-4 text-left ">
                <div>
                  <h3 className=" font-bold">{route.boading_points}</h3>
                  <p>{route.city}</p>
                  <p>
                    <a
                    target="_blank"
                      href={route.map_url}
                      className=" text-primarycolors-red underline py-1 text-xs"
                    >
                      View on Map
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-span-1 sm:mr-5 text-lg font-semibold">
                <p>{removeSeconds(route.time)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" flex justify-end">
        <button
          type="button"
          className="py-1 my-2   w-fit px-2 bg-primarycolors-red  mx-3 text-primarycolors-white text-md  rounded-md"
          title="feeback"
          // data-modal-toggle="default-modal"
          onClick={() => {
            setShowPopup(false);
            setShowFeedbackModal(true);
          }}
        >
          Any Feedback ?
        </button>
      </div>
    </section>
  );
};

export default RouteTable;
