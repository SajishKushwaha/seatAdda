import React from "react";
import free from "../../assets/free.avif";
import invite from "../../assets/invite-friends.avif";
import discount from "../../assets/discount-voucher.avif";
import friend from "../../assets/friend-installs.avif";
import trip from "../../assets/successful-trip.avif";


const FreeSection = () => {
    return (
        <div className="my-3 p-2 pb-[3rem] sm:pb-0">
            {/* first */}
            <h2 className="text-xl mx-2 md:text-2xl mb-3 font-bold ">Web Referral</h2>
            <div className="w-full flex justify-center">
                <img src={free} alt="" />
            </div>

            <div className="my-5 mx-1 sm:mx-4">
                <h2 className="text-left my-2 font-bold text-base">How it Works</h2>

                <div className=" border-[1px] border-primarycolors-gray p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    <div className="flex flex-col  items-center p-3">
                        <img className="w-[200px]" src={invite} alt="" />
                        <p className="text-xs sm:text-sm">
                        Share below unique referral code with your friends


                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center p-3">
                        <img className="w-[200px]" src={friend} alt="" />
                        <p className="text-xs my-2  sm:text-sm">
                        After your friend’s first bus travel, You get Rs.250 discount voucher.
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center p-3">
                        <img className="w-[200px]" src={trip} alt="" />
                        <p className="text-xs my-2  sm:text-sm">
                        Your friend installs the Web App & Signs up using your referral code
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-center p-3">
                        <img className="w-[300px]" src={discount} alt="" />
                        <p className="text-xs my-2  sm:text-sm">
                        Your friend gets FREE RIDE discount coupon applicable for his first ride with AbhiBus
                        </p>
                    </div>
                </div>
            </div>


            <div className="my-5 mx-1 sm:mx-4 ">
                <h2 className="text-left my-2 font-bold text-base">FAQ's</h2>

                <div className=" border-[1px] border-primarycolors-gray p-3 text-left ">
                    <p className="font-semibold text-lg">Referrer A User who is an existing customer of </p>

                    <div>
                        <ul className="faq ml-3  text-sm  sm:text-[15px] text-primarycolors-textcolor">
                            <li>Our referral program is designed to reward you, an existing customer (referrer), for inviting new users (referees) to our platform. When your referees join and engage with our services, you can earn various incentives or rewards as a token of our appreciation.</li>
                            <li>To take part in the referral program, log in to your account and navigate to the "Refer a Friend" or "Referral Program" section. You'll find your unique referral link or code, which you can share with friends, family, or colleagues.</li>
                           <li>Rewards may include discounts, credits, cashback, or other benefits, depending on the terms of our referral program at the time. The specific rewards you earn are typically tied to the actions your referees take, such as signing up, making a purchase, or reaching certain milestones.
                           </li>
                           <li>The timing of reward distribution can vary based on the actions your referees take and our referral program's terms. Some rewards may be granted instantly, while others may be processed after a specific period or once certain conditions are met.</li>
                        </ul>
                    </div>


                    <p className="font-semibold text-lg mt-4">Referee : A new user to who received a referral invitation</p>

                    <div>
                        <ul className="faq ml-3  text-sm  sm:text-[15px] text-primarycolors-textcolor">
                            <li>A referee is a new user who received a referral invitation from an existing customer (referrer). You became a referee by signing up for our platform using the unique referral link or code provided to you by the referrer. </li>
                           <li>Depending on the referral program, you may need to complete specific actions or milestones to activate the referral benefits for both you and the referrer. Check the referral program details for any requirements.</li>
                           <li>The rewards you can earn typically include discounts, credits, cashback, or other incentives, as outlined in the terms of our referral program. The specific rewards may be tied to actions such as making a purchase or reaching specific usage milestones.</li>
                           <li>You can usually track your progress and any earned rewards through your account dashboard. Look for a section related to referrals or rewards, where you can view your status and details.</li>
                           <li>Generally, there is no limit to the number of referral invitations you can accept. You can enjoy the benefits of being referred by multiple referrers, provided you meet the necessary conditions for each referral.</li>
                           <li>The timing of reward distribution can vary depending on the actions you and the referrer need to complete, as well as the terms of the referral program. Some rewards may be instant, while others might be processed after a specific period or when certain criteria are met.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="my-5 mx-1 sm:mx-4">
                <h2 className="text-left my-2 font-bold text-base">
                    Terms and Conditions
                </h2>

                <div className=" border-[1px] border-primarycolors-gray p-3 text-left">

                <div>
                        <ul className="faq ml-3  text-sm sm:text-[15px] text-primarycolors-textcolor">
                            <li>By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not use the Service.</li>
                            <li>You are responsible for all activities conducted through your account. Please keep your login credentials confidential.</li>
                            <li>You agree not to use the Service for any unlawful purpose or to violate any applicable laws or regulations.</li>
                            <li>Payments made through the Service are processed securely. We may collect a service fee for facilitating these transactions.</li>

                            <li>Cancellation policies may vary depending on the service or product you book. Please review the cancellation policy before making a booking.</li>
                            <li>Refund policies are determined by the service or product provider. We are not responsible for refunds but will assist in facilitating communications with providers.</li>
                            <li>You are solely responsible for the content you submit or share through the Service. Content must not violate any copyrights, trademarks, or third-party rights.</li>
                            <li>We reserve the right to terminate or suspend your access to the Service at our discretion, without prior notice, for any reason, including a breach of these Terms.</li>
                            <li>We may update these Terms from time to time. Any changes will be effective immediately upon posting. It is your responsibility to review these Terms periodically for updates.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreeSection;
