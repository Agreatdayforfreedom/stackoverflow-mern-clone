export const Spinner = ({ text = "", size = "5em" }) => {
  const header = text ? <h4>{text}</h4> : null;
  return (
    <div className="spinner">
      {header}
      <div className="wrap_spinner">
        <div className="loader" style={{ height: size, width: size }} />
      </div>
    </div>
  );
};
