'use client';
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";



const ReaderComponent = () => {


    const [url, setURL] = useState(null);



    return (
        <>
            <div className="w-full flex justify-center bg-gray-50 items-center h-screen">

                <div className="w-full p-5 flex flex-col gap-5 ">

                    <input
                        type="url"
                        className="w-full py-2 px-4 border-black focus:border-none rounded border-2  focus:outline-none focus:ring-2 focus:ring-pink-500"
                        onChange={setURL}
                        placeholder="Please enter public url of web page" />

                    <button
                        className="border-3 active:scale-75 disabled:opacity-50         hover:scale-105 transition-all ease-in duration-500 focus:outline-none focus:ring-2 focus:ring-pink-200  shadow-md  max-w-max py-2 px-4 bg-blue-400  rounded-full mx-auto  text-xl font-semibold hover:bg-green-400 text-white ">
                        Get text from  web Page
                    </button>
                </div>
            </div>

        </>
    );
};

export default ReaderComponent;
