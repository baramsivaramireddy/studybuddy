'use client';
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";



const ReaderComponent = (props) => {



    const { setText } = props;
    const handleChange = (e) => {
        // updating the text
        setText(e.target.value);

    }


    return (
        <>

            <div className="p-5 bg-gray-100 h-screen  dark:bg-black dark:text-white ">
                <textarea
                    placeholder="Please enter the topic  like web page content or topic in book"
                    onChange={handleChange}
                    className="border-2 shadow-lg rounded-lg   h-full   border-black w-full  p-5"
                >


                </textarea>
            </div>
        </>
    );
};

export default ReaderComponent;
