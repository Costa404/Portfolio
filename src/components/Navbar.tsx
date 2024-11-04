import { FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className=" mb-20 flex items-center  justify-between py-6">
      <div className="flex flex-shrink-0 items-center">
        <h1 className="futuristic-text mx-2 w-10 text-4xl">NC</h1>
      </div>
      <div className="m-8 flex items-center justify-center gap-4 text-4xl">
        <a href="www.linkedin.com/in/nunocosta404">
          {" "}
          <FaLinkedin />
        </a>
        <a href="https://github.com/Costa404">
          {" "}
          <FaGithub />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
