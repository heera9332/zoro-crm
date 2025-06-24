import "./loaders/loader.css";

const Loader = () => {
  return (
    <div className="w-32 h-32 flex items-center justify-center">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
