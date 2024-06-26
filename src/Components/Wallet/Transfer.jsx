import React from "react";

const Transfer = () => {
  return (
    <div className="mt-3">
      <div className="selection:bg-rose-500 selection:text-white">
        <div className=" bg-rose-100 flex justify-center items-center">
          <div className="p-2 flex-1">
            <div className="sm:w-[300px]   mx-auto overflow-hidden ">
              <div className="px-4 pt-4 pb-8 bg-white rounded-2xl shadow-sm  border-primarycolors-gray border-[1px]">
                <form className="mt-2" action="" method="POST">
                  <div className="relative ">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                      placeholder=""
                    />
                    <label
                      for="phone"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Mobile Number
                    </label>
                  </div>

                  <div class="mt-10 relative">
                    <input
                      id="amount"
                      type="number"
                      name="amount"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                      placeholder=""
                    />
                    <label
                      for="amount"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Amount
                    </label>
                  </div>
                  <div class="mt-10 relative">
                    <input
                      id="desc"
                      type="text"
                      name="desc"
                      className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                      placeholder=""
                    />
                    <label
                      for="desc"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Description
                    </label>
                  </div>
                </form>
              </div>{" "}
              <button className="mt-2 px-4 py-2 rounded-full shadow-lg  text-primarycolors-white bg-primarycolors-red/80 hover:bg-rose-400 text-white font-semibold text-center block w-full focus:outline-none  cursor-pointer">
                {" "}
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
