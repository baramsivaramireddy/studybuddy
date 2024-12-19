'use client';
import { useState } from "react";

const MCQComponent = (props) => {

    const { questionsAndAswers, generateQuestion } = props;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerateButton = async () => {

        try {


            setLoading(true);

            await generateQuestion();
        } catch (err) {
            console.log(`Error occured while generating question ${err.message}`);

            setError('something went wrong .');
        } finally {
            setLoading(false);
        }

    }

    if (questionsAndAswers.length == 0) {

        return (<>

            <GenerateUI
                handleGenerateButton={handleGenerateButton}
            />

        </>)
    }
    return (<>
        <MCQComponentUI />
    </>)
}

export default MCQComponent;


const GenerateUI = (props) => {


    const { handleGenerateButton } = props;
    return (<>

        <div className="flex justify-center items-center h-screen">

            <button
                className="border-2  px-4 rounded-full py-2 shadow-md 
        text-xl active:scale-95
        transition-all duration-500
     bg-green-500 hover:bg-yellow-500 text-white"
                onClick={() => {
                    handleGenerateButton();
                    
                }}>
                Generate questions
            </button>
        </div>
    </>)
}

const MCQComponentUI = () => {


    return (<>

        <div className="bg-red-500 h-screen flex justify-center items-center">
            <p className="text-3xl"> MCQ component</p>
        </div>
    </>)
}