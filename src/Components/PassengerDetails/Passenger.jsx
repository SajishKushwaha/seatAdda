import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navigation";
import PassengerDetails from "./PassengerDetails";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import FooterDesktop from "../FooterDesktop";
import { BiArrowBack } from "react-icons/bi";
import WalletSection from "../Wallet/WalletSection";
import PassengerDetailsMobile from "./PassengerDetailsMobile";

const Passenger = () => {
    const isLoading = useSelector((state) => state.busDetailsReducer.isLoading);
    const selectedSeats = useSelector(
        (state) => state.busDetailsReducer.selectedSeats
    );

    const totalFare = useSelector((state) => state.busDetailsReducer.totalFare);
    const From = useSelector((state) => state.busDetailsReducer.From);
    const To = useSelector((state) => state.busDetailsReducer.To);
    const date = useSelector((state) => state.busDetailsReducer.date);
    const boardPoint = useSelector((state) => state.busDetailsReducer.boardPoint);

    const dropPoint = useSelector((state) => state.busDetailsReducer.dropPoint);
    const navigate = useNavigate();
    const handlePay = () => {
        navigate("/payment");
    };
    const handleBackward = () => {
        navigate("/");
    };

    return (
        <div>
            <div className="hidden md:block">
                <Navbar />
                <div className="container mx-auto ">
                    <div className="grid md:grid-cols-4 p-2 sm:p-5 gap-4">
                        <div className="md:col-span-3">
                            <PassengerDetails />
                        </div>
                        <div className="flex flex-col gap-[1rem]">
                            <div className="border-[1px] border-dashed  px-4  text-left h-fit  shadow-2xl  flex flex-col justify-between ">
                                <div className="my-5">
                                    <h1 className="font-bold  uppercase text-center text-primarycolors-red ">
                                        Journey Details:{" "}
                                    </h1>
                                    <div className="mb-2 p-3 text-sm">
                                        {" "}
                                        <p className="m-2 flex justify-between">
                                            From: <span className="font-bold uppercase">{From}</span>{" "}
                                        </p>
                                        <p className="m-2 flex justify-between">
                                            {" "}
                                            To: <span className="font-bold uppercase">{To}</span>
                                        </p>
                                        <p className="m-2 flex justify-between">
                                            Date: <span className="font-bold uppercase">{date}</span>{" "}
                                        </p>{" "}
                                        <p className="m-2 flex justify-between">
                                            Boarding Point:{" "}
                                            <span className="font-bold uppercase">{boardPoint}</span>{" "}
                                        </p>{" "}
                                        <p className="m-2 flex justify-between">
                                            Dropping Point:{" "}
                                            <span className="font-bold uppercase">{dropPoint}</span>{" "}
                                        </p>{" "}
                                        <div className="m-2 flex  justify-between">
                                            <p className="w-fit">Selected Seats:</p>

                                            <div>
                                                {selectedSeats.map((seat) => (
                                                    <span className="font-bold" key={seat}>
                                                        {" "}
                                                        {seat},
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="my-2 border-dashed" />
                                    <div className="p-3">
                                        <h1 className="font-bold mb-5  uppercase text-center text-primarycolors-red ">
                                            Fare Details:{" "}
                                        </h1>
                                        <p className="m-2 flex justify-between">
                                            Basic Fare (for {selectedSeats.length} Seat) :{" "}
                                            <span className="font-bold uppercase">
                                                <span className="">&#8377;</span>
                                                {totalFare}
                                            </span>{" "}
                                        </p>{" "}
                                        <p className="m-2 flex justify-between">
                                            Bus Partner GST:{" "}
                                            <span className="font-bold uppercase">
                                                <span className="">&#8377;</span>180
                                            </span>{" "}
                                        </p>{" "}
                                        <p className="m-2 flex justify-between">
                                            Total Amount:{" "}
                                            <span className="font-bold">
                                                <span className="">&#8377;</span>
                                                {totalFare + 180}
                                            </span>{" "}
                                        </p>
                                        <p className="m-2 flex justify-between">
                                            Discount:{" "}
                                            <span className="font-bold">
                                                <span className="">&#8377;</span>
                                                50
                                            </span>{" "}
                                        </p>
                                    </div>

                                    <hr className="my-2 border-dashed" />
                                    <div className="p-3 mt-5 py-2 bg-primarycolors-textcolor/40 flex justify-between">
                                        <h1 className="font-bold text-center text-primarycolors-black ">
                                            Net Payable:{" "}
                                        </h1>
                                        <p>
                                            <span className="font-bold">
                                                <span className="">&#8377;</span>
                                                {totalFare + 180 - 50}
                                            </span>{" "}
                                        </p>
                                    </div>
                                </div>{" "}
                            </div>{" "}
                            <div className="mx-1">
                                <button
                                    onClick={handlePay}
                                    className="w-full p-2 rounded-md bg-primarycolors-red/90 hover:bg-primarycolors-red text-primarycolors-white"
                                >
                                    Proceed to Pay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>{" "}
                <div>
                    <FooterDesktop />
                </div>
            </div>
            <div className="block md:hidden ">
                <div className="fixed shadow-xl border-b-[1px] border-primarycolors-gray overflow-y-hidden top-0   z-10 w-full  flex items-center gap-4  text-primarycolors-white py-3 px-2 bg-primarycolors-textcolor">
                    <div className="text-2xl   font-normal" onClick={handleBackward}>
                        <BiArrowBack />
                    </div>
                    <div className=" px-0   text-[16px]  mt-1  font-bold  ">
                        Passengers Details
                    </div>
                </div>
                <div className="relative top-[3rem]">
                    <div className="">
                        <PassengerDetailsMobile />
                    </div>

                    <div className="fixed  bg-primarycolors-white shadow-inner w-[98%] ml-1 -bottom-1 flex justify-center py-2">
                        <button
                            onClick={handlePay}
                            className="w-full  p-2 rounded-md bg-primarycolors-red hover:bg-primarycolors-red text-primarycolors-white"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Passenger;
