
import { useRef } from "react";
import toast from "react-hot-toast";
const ReaderComponent = () => {
    const InputRef = useRef();

    const handleDropEventHandler = (e) => {
        e.preventDefault();
        const { files, items } = e.dataTransfer;
        let file;

        // validating the files drop is one 
        if (files.length > 1 || items.length > 1) {
            toast.error('Please drop only one file');
            return;
        }


        if (e.dataTransfer.items) {
            file = e.dataTransfer.items[0];
        } else {
            file = e.dataTransfer.files[0];
        }

        // validating file is pdf 

        if (file && file.type != 'application/pdf') {
            toast.error('Please upload a (valid) pdf ');
            return;
        }


        convertFileToUnit8Array(file);

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


        let file = files[0];

        convertFileToUnit8Array(file);

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


const convertFileToUnit8Array = (file) => {
    // reades the file from system and convert it to unit8array
    // take fileObj from drag and drop or input file


    const reader = new FileReader();


    reader.addEventListener('progress', (e) => {
        console.log(e)
    })
    reader.addEventListener('load', (e) => {

        if (e.target.readyState != 2) {
            toast.error('Failed to read the file');
            return null;
        }
        return e.target.result;
    })
    reader.addEventListener('loadstart', () => {

        toast.success('file reading is started ');
    })

    reader.addEventListener('loadend', () => {

        toast.success('successfully read the file');
    })
    reader.readAsArrayBuffer(file);



}