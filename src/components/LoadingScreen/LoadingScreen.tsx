import "./loadingscreen.css";

const LoadingScreen = () => {
  return (
    <>
    <div className="loading-wrapper">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h4>Please be patient, the server is on a different free hosting :(</h4>
    </div>
    </>
  );
};
export default LoadingScreen;
