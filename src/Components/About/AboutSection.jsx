import React, { useEffect, useState } from "react";
import user from "../../assets/user.avif";
const AboutSection = () => {
  const TEAM = [
    {
      name: "Navdeep Maheshwari",
      image: "",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam dolor id tenetur nam repellat assumenda blanditiis voluptatem sint ullam tempore doloremque, recusandae dignissimos rem labore!",
    },
    {
      name: "Anurag Gupta",
      image: "",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam dolor id tenetur nam repellat assumenda blanditiis voluptatem sint ullam tempore doloremque, recusandae dignissimos rem labore!",
    },
    {
      name: "Rahul Maheshwari",
      image: "",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam dolor id tenetur nam repellat assumenda blanditiis voluptatem sint ullam tempore doloremque, recusandae dignissimos rem labore!",
    },
    {
      name: "Amit Maheshwari",
      image: "",
      details:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam dolor id tenetur nam repellat assumenda blanditiis voluptatem sint ullam tempore doloremque, recusandae dignissimos rem labore!",
    },
  ];

  const url = "https://seatadda.co.in/api/about-us";
  const [DATA, set_DATA] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchInfo = async () => {
    setloading(true);
    return fetch(url)
      .then((res) => res.json())
      .then((d) => {
        set_DATA(d.date);
        setloading(false);
      });
  };
  // console.log(DATA);
  useEffect(() => {
    fetchInfo();
  }, []);

  if (loading) {
    return (
      <div className="py-2.5 px-5 mr-2 text-sm font-medium text-primarycolors-textcolor  bg-primarycolors-white rounded  hover:bg-gray-100 hover:text-blue-700 flex items-center h-[70vh] justify-center">
        <svg
          aria-hidden="true"
          role="status"
          class="inline mr-2 w-8 h-8  text-primarycolors-textcolor animate-spin "
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          ></path>
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
          ></path>
        </svg>
      </div>
    );
  }
  return (
    <div className="p-4 sm:p-6 pb-[3rem] sm:pb-0  ">
      <div className="p-3">
        <h1 className="text-3xl mb-5 font-bold text-primarycolors-red text-left">
          About Us
        </h1>
        {DATA.map((item, index) => (
          <div
            className="my-2 text-sm sm:text-base text-justify text-primarycolors-textcolor "
            key={index}
            dangerouslySetInnerHTML={{ __html: item.content }}
          ></div>
        ))}
      </div>
      {/*   <div className="p-1 sm:p-3">
        <h1 className="text-2xl font-bold text-primarycolors-red text-left">
          Team SeatAdda
        </h1>
        <div className="my-4">
          {TEAM.map((data, index) => {
            return (
              <div
                key={index}
                className="flex hover:shadow-xl rounded-md border-primarycolors-gray hover:border-[1px] flex-col sm:flex-row justify-between items-center sm:p-3 gap-3 sm:gap-10 my-4 p-3"
              >
                <div className="flex items-center justify-center">
                  <img
                    className="rounded-full w-[200px] sm:w-[250px]"
                    src={user}
                    alt=""
                  />
                </div>
                <div className="col-span-3 p-1 sm:p-3">
                  <h1 className="text-xl mb-2 font-semibold text-primarycolors-red sm:text-left">
                    {data.name}
                  </h1>
                  <p className="text-sm sm:text-base text-primarycolors-textcolor text-justify">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sunt sint placeat quo enim ipsum? Obcaecati accusantium,
                    illo reiciendis ea vel laudantium in fugiat. Laudantium
                    rerum maxime libero, repudiandae quas vitae sed. Eveniet
                    ipsa iure numquam soluta nihil distinctio, repellat vel!
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
};

export default AboutSection;
