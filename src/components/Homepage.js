
'use client'
import { useState } from "react"
import MCQComponent from "./McqComponent"
import ReaderComponent from "./ReaderComponent"


const HomePage = () => {


    const [text, setText] = useState(null);

    const [questionsAndAswers, setQuestionsAndAnswers] = useState([]);

    return (<>

        <div className="flex flex-col md:flex-row " >
            <div className="md:w-1/2">
                <ReaderComponent setText={setText} />
            </div>
            <div className="md:w-1/2">
                <MCQComponent
                    
                    questionsAndAswers={questionsAndAswers}
                />
            </div>
        </div>

    </>)
}

export default HomePage