import { FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className=" mb-20 flex items-center  justify-between py-6">
      <div className="flex flex-shrink-0 items-center">
        <h1 className="futuristic-text mx-2 w-10">NC</h1>
      </div>
      <div className="m-8 flex items-center justify-center gap-4 text-2x">
        <FaLinkedin />
        <FaGithub />
      </div>
    </nav>
  );
};

export default Navbar;
