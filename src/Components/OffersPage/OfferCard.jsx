import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { MdClose } from "react-icons/md";

const OfferCard = ({ offer }) => {

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
        document.body.style.overflow = "hidden"; // Prevent scrolling
    };

    const closeModal = () => {
        setModalOpen(false);
        document.body.style.overflow = "auto"; // Enable scrolling
    };

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Promocode Copied Successful");
        } catch (error) {
            toast.success("Promocode Copied Successful");

            //   console.error("Copy to clipboard failed:", error);
        }
        /*  navigator.clipboard.writeText(text)
                .then(() => {
                    toast.success('Promocode Copied Successful')
                    // console.log('Text copied to clipboard:', text);
                })
                .catch((error) => {
                    // console.error('Copy to clipboard failed:', error);
                }); */
    };

    return (
        <div className="flex flex-col m-2  gap-4 border-[1px] border-primarycolors-gray">
            <Toaster />
            <div>
                <img className="w-full" src={offer.offer_img} alt="" />
                <p className="my-1 text-sm sm:text-base font-semibold">
                    {offer.title}
                </p>
            </div>

            <button
                onClick={openModal}
                className=" bg-primarycolors-gray/50 hover:bg-primarycolors-gray p-1"
            >
                <p className=" cursor-pointer font-semibold text-primarycolors-red">
                    More Details
                </p>
            </button>

            {isModalOpen && (
                <div className="fixed z-10 top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-primarycolors-black  bg-opacity-70 ">
                    <div
                        className={`   bg-white p-4 mx-3 sm:mx-0 sm:w-3/5 bg-primarycolors-white rounded-lg shadow-md`}
                    >
                        <div
                            onClick={closeModal}
                            className="flex justify-end items-center cursor-pointer "
                        >
                            <MdClose className=" text-primarycolors-red text-xl" />
                        </div>
                        <h2 className="text-lg text-left mb-1 font-semibold">
                            {offer.title}
                        </h2>
                        <hr />

                        <div className="h-[250px] text-left my-3  overflow-x-scroll overflow-y-scroll p-2 ">
                            <ul
                                className="list-disc list-inside px-3 py-1 text-[0.8rem]"
                                style={{ listStyleType: "disc" }}
                            >
                                <li>{offer.description}</li>
                               
                               
                               
                            </ul>
                        </div>

                        <div
                            onClick={() => copyToClipboard("APSRTC")}
                            className="my-3 p-2 rounded-md cursor-pointer  text-primarycolors-white uppercase font-bold text-sm bg-primarycolors-red "
                        >
                            {offer.coupon_code}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OfferCard;
