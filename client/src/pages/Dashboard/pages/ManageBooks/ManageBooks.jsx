import React, { useEffect, useState } from "react";
import DashboardLayout from "../../DashBoardLayout";
import { Table } from "flowbite-react";
import { NavLink } from "react-router-dom";
import {
  DeleteBookById,
  GetBooksByUserId,
} from "../../../../services/fetch-apis";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../../../store/ui-slice/ui-slice";
import Button from "../../../../components/UI/Button/Button";
import { booksAction } from "../../../../store/books-slice/book-slice";
function ManageBooks() {
  const [books, setBooks] = useState([]);
  const { userBooks } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);
  useEffect(() => {
    if (!userBooks) {
      dispatch(uiAction.loadingHandler(true));
      GetBooksByUserId(user._id, token)
        .then((data) => {
          setBooks([...data.books]);
          console.log(books);
          dispatch(booksAction.setUserBooks({ books: [...data.books] }));
          dispatch(
            uiAction.addMessage({
              title: "success",
              status: data.status || 200,
              message: "Lists of User Books ",
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
    } else {
      setBooks([...userBooks]);
    }
  }, []);

  const OnDeleteHandler = (e, id) => {
    e.preventDefault();
    alert("do you really want to delete this book?");
    dispatch(uiAction.loadingHandler(true));

    DeleteBookById(id, token)
      .then(() => {
        const filteredBooks = books.filter((each) => each._id !== id);
        setBooks(filteredBooks);
        dispatch(booksAction.setUserBooks({ books: [...filteredBooks] }));
        dispatch(
          uiAction.addMessage({
            title: "success",
            status: 200,
            message: "Lists of User Books ",
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
        <div className="mb-8 text-3xl font-bold">Manage Your Books</div>
        <Table className="lg:w-[1180px]">
          <Table.Head>
            <Table.HeadCell>No.</Table.HeadCell>
            <Table.HeadCell>BOOK Name</Table.HeadCell>
            <Table.HeadCell>Author Name</Table.HeadCell>
            <Table.HeadCell>category</Table.HeadCell>
            <Table.HeadCell>Prices</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          {books.length !== 0 &&
            books.map((each, index) => (
              <Table.Body className="divide-y" key={each._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{index + 1}</Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {each.bookTitle}
                  </Table.Cell>
                  <Table.Cell>{each.authorName}</Table.Cell>
                  <Table.Cell>{each.category}</Table.Cell>
                  <Table.Cell>
                    &#8377;{Number(each.price).toFixed(2)}
                  </Table.Cell>
                  <Table.Cell className="flex flex-row gap-2 justify-center items-center">
                    <NavLink
                      to={{
                        pathname: `/admin/edit-book/${each._id}`,
                        state: { book: { ...each } },
                      }}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </NavLink>
                    <button
                      onClick={(e) => OnDeleteHandler(e, each._id)}
                      className="bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-black"
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
        </Table>
      </div>
    </DashboardLayout>
  );
}

export default ManageBooks;
