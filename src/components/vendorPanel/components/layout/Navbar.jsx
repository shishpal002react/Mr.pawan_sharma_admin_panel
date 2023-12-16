/** @format */

import { RiMenu4Line } from "react-icons/ri";

const Navbar = ({ hamb, setHamb }) => {
  return (
    <>
      <div
        className={
          hamb
            ? "flex  w-full justify-between  my-1 rounded-sm  p-4 py-3 shadow-md items-center  bg-[#444444] space-x-4"
            : "flex  w-full justify-between my-1 rounded-sm  p-4 py-3 shadow-md items-center  bg-[#444444] space-x-4"
        }
      >
        <RiMenu4Line
          onClick={() => setHamb(!hamb)}
          className="text-2xl font-bold text-[#fff] hover:scale-90 cursor-pointer"
        />

        <section className="flex sm:ml-auto justify-end sm:w-full items-center space-x-2  pr-2">
          <figcaption className="tracking-wider pl-1 font-semibold">
            <div className="lg:text-base text-sm text-[#fff]  uppercase">
              Welcome Admin
            </div>
          </figcaption>
        </section>
      </div>
    </>
  );
};

export default Navbar;
