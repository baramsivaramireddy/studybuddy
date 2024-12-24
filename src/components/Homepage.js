
'use client'
import { useState } from "react"
import MCQComponent from "./McqComponent"
import ReaderComponent from "./ReaderComponent"

import { GenerateMCQ } from "./actions"
const HomePage = () => {


    const [text, setText] = useState(null);

    const [questionsAndAswers, setQuestionsAndAnswers] = useState([]);



    const generateQuestion = async () => {
        let result = await GenerateMCQ(text);
        setQuestionsAndAnswers(processLLMResponse(result));

    }

    return (<>

        <div className="flex flex-col h-full md:flex-row " >
            <div className="md:w-1/2 h-full">
                <ReaderComponent setText={setText} />
            </div>
            <div className="md:w-1/2 h-full">
                <MCQComponent
                    text={text||''}
                    generateQuestion={generateQuestion}
                    questionsAndAswers={questionsAndAswers}
                />
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