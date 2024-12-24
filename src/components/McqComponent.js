'use client';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MCQComponent = (props) => {

    const { questionsAndAswers, text, generateQuestion } = props;


    const isTextEnough = (text) => {

        // text more than 100 words
        const words = text.trim().split(/\s+/);

        return words.length > 100;
    };

    const isGenerateDisabled = !isTextEnough(text);
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


    if (loading) {
        return (<>

            <div className=" h-screen  flex justify-center items-center bg-gray-100 p-5 ">


                <div className=" shadow-xl p-5 min-w-64 min-h-80  bg-white rounded-lg animate-pulse ">

                    <div>


                        <div className="py-5 flex gap-5 flex-col ">
                            <p className="text-3xl"> Question  </p>
                            <p className="text-xl bg-slate-100 w-96 h-10 rounded  "> { }  </p>
                        </div>

                        <div className="">

                            <p className=" capitalize font-semibold">  options </p>
                            <div className="ml-3">

                                {[0, 1, 2, 3].map((option, index) => (<div key={index}>

                                    <div className="my-5 ">

                                        <label className="flex w-64 h-10 bg-slate-100 gap-2 flex-col">

                                        </label>
                                    </div>
                                </div>))}
                            </div>


                        </div>

                        <div className="flex  justify-between">
                            <div >
                                {/*    previouse button */}
                                <button

                                    className="border-2 py-2 px-5 bg-slate-100 rounded  "> Previous  </button>
                            </div>

                            <div >
                                {/* next button */}
                                <button

                                    className="border-2 ml-auto py-2 px-5 bg-slate-100 rounded   "> Next </button>
                            </div>
                        </div>
                        <div className="py-5">
                            <p> Please wait we are using free Gemini api . I takes time </p>
                        </div>
                    </div>
                </div>
            </div>
        </>)
    }



    if (error) {

        return (<>

            <div className=" flex justify-center h-screen   items-center flex-col bg-gray-100 p-6">
                <div className="w-full  bg-white  p-5 min-w-64 min-h-80  shadow-lg  rounded-lg ">
                    <div className="text-center text-red-600 font-semibold text-lg mb-4">
                        Error : Something went wrong please try again
                    </div>
                    <div className="flex justify-center">
                        <GenerateUI
                            isGenerateDisabled={isGenerateDisabled}
                            handleGenerateButton={handleGenerateButton} />
                    </div>
                </div>
            </div>

        </>)
    }

    if (questionsAndAswers.length == 0) {

        return (<>
            <div className="h-screen flex justify-center  bg-gray-100 items-center flex-col">


                <div className="shadow-lg min-w-96 min-h-96 rounded-lg p-10 relative bg-white flex justify-center flex-col items-center">
                    <GenerateUI
                        isGenerateDisabled={isGenerateDisabled}
                        handleGenerateButton={handleGenerateButton}
                    />
                    <div className="absolute  bottom-1 p-5">
                        <p className="  capitalize opacity-65  text-sm"> Left : paste topic more 100 words</p>
                        <p className="  capitalize opacity-65  text-sm"> Right : test your understanding </p>
                    </div>

                </div>



            </div>

        </>)
    }




    return (<>
        <MCQComponentUI
            questionsAndAswers={questionsAndAswers}
        />
    </>)
}

export default MCQComponent;


const GenerateUI = (props) => {


    const { handleGenerateButton, isGenerateDisabled } = props;

    return (<>

        <div className="flex  justify-center items-center  ">


            <button
                disabled={isGenerateDisabled}
                className={`border-2 px-4 rounded-full py-2 shadow-md text-xl active:scale-95 transition-all duration-500 
        ${isGenerateDisabled ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-green-500 hover:bg-yellow-500 text-white"}`}
                onClick={() => {
                    if (!isGenerateDisabled) {
                        handleGenerateButton();
                    }
                }}
            >
                Generate Questions
            </button>

        </div>
    </>)
};


const MCQComponentUI = (props) => {

    const { questionsAndAswers } = props;

    const [presentQuestion, setPresentQuestion] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState(new Set());
    const totalQuestions = questionsAndAswers.length - 1;

    const [correctedAnswerIndexs, SetCorrectionAnswerIndexs] = useState([]);

    

    useEffect(() => {
        let temp = [];
        questionsAndAswers[presentQuestion]?.options?.forEach((option, index) => {
            if (option.isCorrect) {
                temp.push(index)
            }
        });

        SetCorrectionAnswerIndexs(temp);
    }, [presentQuestion,questionsAndAswers])





    const handleOptionChecking = (e) => {


        let optionIndex = e.target.value;
        if (e.target.checked) {
            setSelectedOptions((prevSet) => {

                let newSet = new Set(prevSet);

                newSet.add(optionIndex);

                return newSet;
            })
        } else {
            setSelectedOptions((prevSet) => {

                let newSet = new Set(prevSet);

                newSet.delete(optionIndex);

                return newSet;
            })

        }





    }
    const handlePreviousButton = () => {

        if (presentQuestion > 0) {
            setPresentQuestion((prev) => (prev - 1))
        }
    }

    const handleNextbutton = () => {

        console.log(correctedAnswerIndexs , selectedOptions,correctedAnswerIndexs.every((index) => {   console.log(index);return selectedOptions.has(index)} )  )

        if ( !correctedAnswerIndexs.every((index) => selectedOptions.has(String(index)) ) ){

            toast.error('Select all correct answers');
            return;
        }
        if (presentQuestion < totalQuestions) {

            setPresentQuestion((prev) => (prev + 1))
        }
        setSelectedOptions(new Set());
    }

    const isExplanationVisible = (optionIndex) => {
        return selectedOptions.has(optionIndex)
    }

    return (<>
        <div className="  h-screen overflow-y-auto py-5  flex bg-gray-100 justify-center items-center p-10">
            <div className="p-5 min-w-64 min-h-80  shadow-lg rounded-lg bg-white">


                <div className="flex justify-end">
                    <div className="max-w-40 border-2 py-2 px-4 rounded">
                        {presentQuestion + 1} <span>/</span>{totalQuestions + 1}
                    </div>
                </div>

                <div>


                    <div className="py-5 ">
                        <p className="text-3xl"> Question  </p>
                        <p className="text-xl   "> {questionsAndAswers[presentQuestion].question}  </p>
                    </div>

                    <div className="">

                        <p className=" capitalize font-semibold">  options </p>
                        <div className="ml-3">

                            {questionsAndAswers[presentQuestion].options.map((option, index) => (<div key={index}>

                                <div className="my-5 ">

                                    <label className="flex gap-2 flex-col">
                                        <div className="flex  gap-2">
                                            <input
                                                checked={isExplanationVisible(String(index))}
                                                onChange={handleOptionChecking}
                                                value={index}
                                                type="checkbox" />
                                            <p>{option.option}</p>
                                        </div>
                                        <p className={`${isExplanationVisible(String(index)) ? "" : "hidden "} ml-2 bg-gray-100 text-sm max-w-96`}> {option.isCorrect ? "✅" : "❌"}  {option.explanation}  </p>
                                    </label>
                                </div>
                            </div>))}
                        </div>


                    </div>

                    <div className="flex  justify-between">
                        <div className={`${presentQuestion == 0 ? "hidden" : ""}`}>
                            {/*    previouse button */}
                            <button
                                onClick={handlePreviousButton}
                                className="border-2 py-2 px-5  rounded hover:bg-green-500 hover:text-white "> Previous  </button>
                        </div>

                        <div className={`${totalQuestions == presentQuestion ? "hidden" : ''}`}>
                            {/* next button */}
                            <button
                                onClick={handleNextbutton}
                                className="border-2 ml-auto py-2 px-5  rounded hover:bg-green-500 hover:text-white  "> Next </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </>)
}