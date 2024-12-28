
import { useRef } from "react";
import { IoSettings } from "react-icons/io5";
import { useState } from "react";
const TokenMenuComponent = (props) => {

    const { token, setToken } = props;

    const modalRef = useRef(null);


    const openModal = () => {

        modalRef.current.showModal();
    }

    const closeModal = () => {

        modalRef.current.close();
    }
    return (<>

        <button className="bg-white rounded-full p-2  shadow-lg" onClick={() => {
            openModal();

        }}>
            <IoSettings className="text-blue-500 text-3xl" />
        </button>


        <Modal
            modalRef={modalRef}
            closeModal={closeModal}
            token={token}
            setToken={setToken}
        >

        </Modal>
    </>)
}

const Modal = (props) => {

    const { modalRef, closeModal, token, setToken } = props;
    const [error, setError] = useState(null);
    const [tempToken, setTempToken] = useState(null);
    const clearLocalStorage = () => {
        setError(null);
        localStorage.clear();
        setToken(null);
        setTempToken(null);
    }


    const handleAddTokenButton = () => {
        setError(null);
        if (!tempToken) {
            setError('Please Enter valid token');
            return ''
        }
        localStorage.setItem('token', tempToken);
        setToken(tempToken);
        setTempToken(null);
    }
    return (<>

        <dialog ref={modalRef} className="border-2 p-5 rounded-lg shadow-lg " >



            <div>

                <div>
                    <p className="bg-red-500 text-white"> {error}</p>
                </div>
                {token ?

                    <div>
                        API key is already present
                    </div>
                    :

                    <div>

                        <div className=" flex  flex-col gap-5">

                            <div>
                                <p> Please enter valid Gemini  API key</p>
                            </div>
                            <input
                                className="border-2  rounded p-1 "
                                type="password"
                                placeholder="enter valid Gemini Key API "
                                onChange={(e) => {
                                    setTempToken(e.target.value)
                                }}
                            />
                        </div>
                    </div>}
            </div>


            <div className="flex gap-5 justify-between py-5">
                {token ? <button className="border-2  rounded py-2 px-4 bg-green-500 hover:text-white text-xl hover:bg-green-700" onClick={clearLocalStorage}> reset</button> : <button className="border-2  rounded py-2 px-4 bg-green-500 hover:text-white text-xl hover:bg-green-700" onClick={handleAddTokenButton}> Add </button>}
                <button onClick={closeModal} className="border-2  rounded py-2 px-4 bg-red-500 hover:text-white text-xl hover:bg-red-700">close</button>

            </div>


        </dialog>

    </>)
}
export default TokenMenuComponent;