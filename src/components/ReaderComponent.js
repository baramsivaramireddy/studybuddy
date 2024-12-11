
import { useRef } from "react";
const ReaderComponent = () => {
    const InputRef = useRef();

    const handleDropEventHandler = (e) => {
        e.preventDefault();
        const { files, items } = e.dataTransfer;


        if (files.length >1 || items.length >1){
            
        }
        if (ev.dataTransfer.items) {

            [...ev.dataTransfer.items].forEach((item, i) => {
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    console.log(`… file[${i}].name = ${file.name}`);
                }
            });
        } else {
            [...ev.dataTransfer.files].forEach((file, i) => {
                console.log(`… file[${i}].name = ${file.name}`);
            });
        }
    };

    const handleDragOverHandler = (e) => {
        e.preventDefault();
        console.log("File(s) in drop zone");
    };

    const handlePdfContainerClick = () => {
        if (InputRef.current) {
            InputRef.current.click();
        }
    };

    const HandleFileInput = (e) => {
        const files = e.target.files;
        console.log("Files selected from input:", files);
    };

    return (
        <div>
            <div
                onClick={handlePdfContainerClick}
                onDrop={handleDropEventHandler}
                onDragOver={handleDragOverHandler}
                className="bg-white border-2 border-dashed border-gray-400 rounded-lg p-4 flex items-center h-screen justify-center"
            >
                <p className="capitalize text-blue-500 text-xl">Drop your file here</p>

                <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    ref={InputRef}
                    onChange={HandleFileInput} // Use onChange
                />
            </div>
        </div>
    );
};

export default ReaderComponent;
