import React from "react";

function ProductImageSection(props) {
  const arr = new Array(4).fill(3);
  return (
    <div className="w-full md:w-1/2 bg-slate-50  flex flex-col gap-3 justify-center items-center self-start ">
      <div className=" rounded-md my-5 w-[11rem] h-[15rem] p-5 bg-white shadow-lg overflow-hidden  ">
        <img
          src={props.image}
          className=" object-cover hover:scale-[1.5] hover:transition duration-500 ease-out"
          alt="image"
        />
      </div>
      <div className="">
        <ul className=" flex flex-row gap-3">
          {arr.map((each, index) => (
            <li
              className="w-[4.5rem] md:w-[5rem] h-[5rem] border-[0.1rem] overflow-hidden hover:border-[0.2rem] hover:border-orange-500 border-solid border-gray-600 gap-2"
              key={index}
            >
              <img
                src={props.image}
                className="hover:scale-[1.5] hover:shadow-md hover:transition duration-500 ease-out w-full h-full object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductImageSection;
