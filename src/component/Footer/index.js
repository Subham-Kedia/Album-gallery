const Footer = () => {
  return (
    <div className="footer">
      Created with ❤️ by Shubham Kedia
      <p
        style={{ fontSize: "12px", margin: 0 }}
      >{`v${process.env.REACT_APP_VERSION}`}</p>
    </div>
  );
};

export default Footer;
