import React from "react";
import { Collapse } from "react-collapse";
import { FaMinus, FaPlus } from "react-icons/fa";
const TravelPolicyAccordion = ({ open, toggle, title, desc }) => {
  return (
    <div>
      <div
        className={`my-2 bg-primarycolors-white border-primarycolors-gray  ${
          open ? "shadow-md border-0" : "border"
        } `}
        onClick={toggle}
      >
        {" "}
        <h2>
          <button
            type="button"
            className={`flex items-center justify-between w-full p-2 font-medium text-left text-gray-500   ${
              open
                ? "bg-primarycolors-textcolor/70 text-primarycolors-white"
                : ""
            }   border-primarycolors-gray `}
          >
            <span>{title}</span>

            {open ? <FaMinus /> : <FaPlus />}
          </button>
        </h2>
        <Collapse isOpened={open}>
          <div className="p-3 border text-left text-sm sm:text-base border-primarycolors-gray dark:border-gray-700 dark:bg-gray-900">
            <p
              className="mb-2 text-gray-500 dark:text-gray-400"
              dangerouslySetInnerHTML={{ __html: desc }}
            ></p>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default TravelPolicyAccordion;
