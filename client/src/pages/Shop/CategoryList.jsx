import React, { useState } from "react";

const bookCategories = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Mistery",
  "Programming",
  "Science Fiction",
  "Fantasy",
  "Horror",
  "Bibliography",
  "Autobiography",
  "History",
  "Self-help",
  "Memoir",
  "Business",
  "Children Books",
  "Travel",
  "Religion",
  "Art and Design",
];

function CategoryList(props) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const onClickHandler = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
    props.selectCategory(category);
  };

  return (
    <div className="w-[90%] shadow-md text-orange-600 h-max-[15rem] bg-orange-100 p-3 rounded-md gap-3 items-center mx-auto  break-words flex flex-wrap">
      {bookCategories.map((each) => (
        <div
          className={` cursor-pointer flex hover:bg-orange-300 ${
            each === selectedCategory &&
            "bg-orange-500 text-black shadow-md shadow-gray-400"
          } focus:bg-orange-500 transition transition-2 px-[1rem] py-[0.1rem] rounded-md text-[14px] font-medium  hover:text-black justify-center items-center  border-2 border-solid border-orange-700`}
          key={each}
          onClick={(e) => onClickHandler(e, each)}
        >
          {each}
        </div>
      ))}
    </div>
  );
}

export default CategoryList;
