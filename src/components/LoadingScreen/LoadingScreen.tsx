import "./loadingscreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-wrapper">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default LoadingScreen;
