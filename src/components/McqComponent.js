
const MCQComponent = (props) => {

    const { questionsAndAswers, generateQuestion } = props;


    if (questionsAndAswers.length == 0) {

        return (<>

            <div className="flex justify-center items-center h-screen">

                <button
                    className="border-2  px-4 rounded-full py-2 shadow-md 
                        text-xl active:scale-95
                        transition-all duration-500
                     bg-green-500 hover:bg-yellow-500 text-white"
                    onClick={() =>{
                        console.log('kl')
                    }}>
                    Generate questions
                </button>
            </div>
        </>)
    }
    return (<>
        <div className="bg-red-500 h-screen flex justify-center items-center">
            <p className="text-3xl"> MCQ component</p>
        </div>
    </>)
}

export default MCQComponent;