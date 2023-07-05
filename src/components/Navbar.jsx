const Navbar = () => {
  return (
    <div className="flex justify-between px-4">
      <div className="left">
        <i className="bi bi-list"></i>
      </div>
      <div className="center">MyQuran</div>
      <div className="right">
        <i className="bi bi-person-circle"></i>
      </div>
    </div>
  );
};

export default Navbar;
