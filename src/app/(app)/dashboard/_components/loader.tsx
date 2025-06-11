const Loader = () => {
  return (
    <div>
      <video
        autoPlay
        loop
        muted
        playsInline
        src="/assets/video/loader.mp4"
        style={{ width: "100px", height: "100px", objectFit: "cover" }} // example style
      />
    </div>
  );
};

export default Loader;
