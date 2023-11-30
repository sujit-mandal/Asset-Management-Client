import GridLoader from "react-spinners/GridLoader";


const Spinner = () => {
    return (
        <div>
            <div className="h-screen flex justify-center items-center"><GridLoader color="#36d7b7" />;</div>
        </div>
    );
};

export default Spinner;