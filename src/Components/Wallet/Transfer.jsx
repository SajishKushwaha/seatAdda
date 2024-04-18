import React from "react";

const Transfer = () => {
  return (
    <div className="mt-3">
      <div class="selection:bg-rose-500 selection:text-white">
        <div class=" bg-rose-100 flex justify-center items-center">
          <div class="p-2 flex-1">
            <div class="sm:w-[300px]   mx-auto overflow-hidden ">
              <div class="px-4 pt-4 pb-8 bg-white rounded-2xl shadow-sm  border-primarycolors-gray border-[1px]">
                <form class="mt-2" action="" method="POST">
                  <div class="relative ">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                      placeholder=""
                    />
                    <label
                      for="phone"
                      class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Mobile Number
                    </label>
                  </div>

                  <div class="mt-10 relative">
                    <input
                      id="amount"
                      type="number"
                      name="amount"
                      class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                      placeholder=""
                    />
                    <label
                      for="amount"
                      class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Amount
                    </label>
                  </div>
                  <div class="mt-10 relative">
                    <input
                      id="desc"
                      type="text"
                      name="desc"
                      class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                      placeholder=""
                    />
                    <label
                      for="desc"
                      class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Description
                    </label>
                  </div>
                </form>
              </div>{" "}
              <button class="mt-2 px-4 py-2 rounded-full shadow-lg  text-primarycolors-white bg-primarycolors-red/80 hover:bg-rose-400 text-white font-semibold text-center block w-full focus:outline-none  cursor-pointer">
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
