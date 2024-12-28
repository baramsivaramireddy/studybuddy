
'use client'
import { useEffect, useState } from "react"
import MCQComponent from "./McqComponent"
import ReaderComponent from "./ReaderComponent"

import { GenerateMCQ } from "./helper"
import TokenMenuComponent from "./TokenMenuComponent"
const HomePage = () => {


    const [text, setText] = useState(null);
    const [token, setToken] = useState(null);
    const [questionsAndAswers, setQuestionsAndAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

        setIsLoading(true);
        let storedToken = localStorage.getItem('token');

        if (storedToken) {
            setToken(storedToken)
        }
        setIsLoading(false);
    }, [])



    const generateQuestion = async () => {
        let result = await GenerateMCQ(text);
        setQuestionsAndAnswers(processLLMResponse(result));

    }


    return (<>

        <div className="flex flex-col h-full md:flex-row  relative" >

            <div className="absolute top-1 right-1">
                <TokenMenuComponent
                    token={token}
                    setToken={setToken}
                />
            </div>
            <div className="md:w-1/2 h-full">
                <ReaderComponent

                    setText={setText} />
            </div>
            <div className="md:w-1/2 h-full">

                {isLoading ? <LoadingMessage message={'Checking for Gemini key in  your device .Please wait'} /> : <MCQComponent
                    token={token}
                    setToken={setToken}
                    text={text || ''}
                    generateQuestion={generateQuestion}
                    questionsAndAswers={questionsAndAswers}
                />}

            </div>
        </div>

    </>)
}

export default HomePage


const processLLMResponse = (rawtext) => {



    let jsonOBj = null;
    jsonOBj = JSON.parse(rawtext);

    return jsonOBj;

}

const LoadingMessage = ({ message }) => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <p className="text-lg font-medium text-gray-700 animate-pulse">
                {message || 'Loading... Please wait'}
            </p>
        </div>
    );
};