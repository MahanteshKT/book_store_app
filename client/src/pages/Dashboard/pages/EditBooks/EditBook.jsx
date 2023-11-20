import React, { useEffect, useState } from "react";

import DashboardLayout from "../../DashBoardLayout";
import { Label, TextInput, Select, Textarea } from "flowbite-react";
import Button from "../../../../components/UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateBookApi, uploadBookApi } from "../../../../services/fetch-apis";
import { uiAction } from "../../../../store/ui-slice/ui-slice";
import { useLocation, useParams } from "react-router-dom";
import { booksAction } from "../../../../store/books-slice/book-slice";
function EditBook() {
  const [book, setbook] = useState({
    bookTitle: "",
    authorName: "",
    imageUrl: "",
    category: "",
    bookDescription: "",
    bookPdfURL: "",
    price: "",
    bookObj: "",
  });
  const { id } = useParams();
  const { user, token } = useSelector((state) => state.user);
  const { userBooks } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  // console.log(location);
  console.log(userBooks, id);
  useEffect(() => {
    const [bookById] = userBooks.filter((each) => each._id === id);
    setbook({ ...bookById });
    console.log("sidjfisjdij", bookById);
  }, []);

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
    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageUrl = form.imageUrl.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPdfURL = form.bookPdfURL.value;
    const price = form.price.value;
    const bookObj = {
      bookTitle,
      authorName,
      imageUrl,
      category,
      bookDescription,
      bookPdfURL,
      price,
    };
    console.log(bookObj);
    dispatch(uiAction.loadingHandler(true));
    // console.log(loading);
    updateBookApi(bookObj, id, user._id, token)
      .then(() => {
        dispatch(
          booksAction.updateUserBook({
            book: {
              ...book,
              ...bookObj,
              _id: id,
            },
          })
        );
        dispatch(
          uiAction.addMessage({
            title: "success",
            status: 200,
            message: "Book Updated successfully!",
          })
        );
      })
      .catch((err) => {
        dispatch(
          uiAction.addMessage({
            title: "error",
            status: err.status || 400,
            message: err.message,
          })
        );
      })
      .finally(() => {
        dispatch(uiAction.loadingHandler(false));
      });
  };
  return (
    <DashboardLayout>
      <div className="px-4 my-12">
        <h2 className="mb-8 text-3xl font-bold">Update A Book!</h2>
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
                defaultValue={book.bookTitle}
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
                name="authorName"
                placeholder="author Name"
                defaultValue={book.authorName}
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
                defaultValue={book.imageUrl}
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
                defaultValue={book.category}
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
              defaultValue={book.bookDescription}
              rows={6}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Book Price:" />
            </div>
            <TextInput
              id="price"
              type="text"
              name="price"
              placeholder="Book Price"
              required
              defaultValue={book.price}
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
              defaultValue={book.bookPdfURL}
            />
          </div>
          <Button
            type="submit"
            className="w-full self-center md:w-1/2 lg:w-1/3 mt-5"
          >
            Update Book
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default EditBook;
