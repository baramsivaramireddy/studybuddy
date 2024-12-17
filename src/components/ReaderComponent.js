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

            <textarea

                onChange={handleChange}
                className="border-2  rounded  border-black w-full min-h-screen max-h-screen p-5"
            >


            </textarea>
        </>
    );
};

export default ReaderComponent;
