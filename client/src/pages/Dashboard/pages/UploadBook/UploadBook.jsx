import React, { useState } from "react";
import DashboardLayout from "../../DashBoardLayout";
import { Label, TextInput, Select, Textarea } from "flowbite-react";
import Button from "../../../../components/UI/Button/Button";
function UploadBooks() {
  const bookCategories = [
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

  const [selectedBookCategory, setSelectedBookCategory] = useState(
    bookCategories[0]
  );
  const handleChangeSelectedValue = (event) => {
    event.preventDefault();
    setSelectedBookCategory(event.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(form.bookTitle.value);
    console.log(form);
  };

  return (
    <DashboardLayout>
      <div className="px-4 my-12">
        <h2 className="mb-8 text-3xl font-bold">Upload A Book!</h2>
        <form
          onSubmit={onSubmitHandler}
          className="flex lg:w-[1180px] flex-wrap flex-col gap-4"
        >
          <div className="flex gap-8">
            <div className="lg:w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="bookTitle" value="Book Title:" />
              </div>
              <TextInput
                id="bookTitle"
                type="text"
                name="bookTitle"
                placeholder="Book Name"
                required
              />
            </div>

            <div className="lg:w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="authorName" value="Author Name:" />
              </div>
              <TextInput
                id="authorName"
                type="text"
                name="autorName"
                placeholder="author Name"
                required
              />
            </div>
          </div>

          <div className="flex gap-8">
            <div className="lg:w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="imageUrl" value="Image Url:" />
              </div>
              <TextInput
                id="imageUrl"
                type="text"
                name="imageUrl"
                placeholder="Book Image Url"
                required
              />
            </div>

            <div className="lg:w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="category" value="Book Category:" />
              </div>
              <Select
                id="inputState"
                name="categoryName"
                className="w-full rounded"
                vlaue={selectedBookCategory}
                onChange={handleChangeSelectedValue}
              >
                {bookCategories.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="bookDescription" value="Book Desription:" />
            </div>
            <Textarea
              id="bookDescription"
              name="bookDescription"
              type="text"
              placeholder="write your book description..."
              required
              className="w-full"
              rows={6}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="bookPDFURL" value="Book Pdf Url" />
            </div>
            <TextInput
              id="bookPDFURL"
              type="text"
              name="bookPdfURL"
              placeholder="Book pdf url"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full self-center md:w-1/2 lg:w-1/3 mt-5"
          >
            Upload Book
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default UploadBooks;

// userId
// authorName
// bookTitle
// imageUrl
// bookTitle
// imageUrl
// category
// bookDescription
// userPicturePath
// tags
// likes
// bookPdfURL

// {/* <div className="flex items-center gap-2">
//             <Checkbox id="remember" />
//             <Label htmlFor="remember">Remember me</Label>
//           </div> */}
