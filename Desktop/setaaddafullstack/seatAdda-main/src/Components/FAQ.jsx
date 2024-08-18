import React from "react";

const FAQ = () => {
  return (
    <div className="container text-left p-2 sm:p-5 mx-auto">
      <div className="offer-section p-3 my-3 w-7/8 shadow-md font-light text-primarycolors-black ">
        <h1 className="py-2 text-2xl font-semibold">
          Frequently Asked Questions on Online Bus Booking
        </h1>

        <div className="flex items-center justify-start w-full my-5">
          {/* <!-- Component Start --> */}
          <div className="w-full ">
            <button className="w-full border-b-2 border-primarycolors-textcolor pb-6 text-left group focus:outline-none">
              <div className="text-l font-semibold">
                Q: How do you do online bus reservation on Web?
              </div>
              <div className="mt-3 hidden text-gray-700 group-focus:flex">
                <p>
                  Although a definitive answer would of course require further
                  measurements, published species-wide averages of wing length
                  and body mass, initial Strouhal estimates based on those
                  averages and cross-species comparisons, the Lund wind tunnel
                  study of birds flying at a range of speeds, and revised
                  Strouhal numbers based on that study all lead me to estimate
                  that the average cruising airspeed velocity of an unladen
                  European Swallow is roughly 11 meters per second, or 24 miles
                  an hour.
                </p>
              </div>
            </button>
            <button className="w-full border-b-2 border-primarycolors-textcolor pb-6 text-left group mt-6 focus:outline-none">
              <div className="text-l font-semibold">
                Q: Do I need to create an account to book bus tickets on
                Web?
              </div>
              <div className="mt-3 hidden text-gray-700 group-focus:flex">
                <p>
                  Darth Plagueis was a Dark Lord of the Sith, so powerful and so
                  wise he could use the Force to influence the midichlorians to
                  create life… He had such a knowledge of the dark side, he
                  could even keep the ones he cared about from dying. He became
                  so powerful… the only thing he was afraid of was losing his
                  power, which eventually, of course, he did.
                </p>
              </div>
            </button>
            <button className="w-full border-b-2 border-primarycolors-textcolor pb-6 text-left group mt-6 focus:outline-none">
              <div className="text-l font-semibold">
                Q: Why did the Fellowship of the Ring not fly to Mordor with the
                Eagles?
              </div>
              <div className="mt-3 hidden text-gray-700 group-focus:flex">
                <p>
                  Basically if they had attempted to fly in earlier, they
                  would've been seen by the eye and then utterly demolished by
                  the still strong forces within Mordor as Sauron was still very
                  powerful and his armies were definitely a force to be reckoned
                  with. That being said it is conceivable that a mission that
                  bold could've been completed if the elves had also gotten
                  involved, but they didn't care too much for the whole ordeal.
                </p>
              </div>
            </button>
          </div>
          {/* <!-- Component End  --> */}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
