
'use client'
import MCQComponent from "./McqComponent"
import ReaderComponent from "./ReaderComponent"


const HomePage = () => {


    return (<>

        <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
                <ReaderComponent />
            </div>
            <div className="md:w-1/2">
                <MCQComponent />
            </div>
        </div>

    </>)
}

export default HomePage