"use client";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import BOOKS from "../../data/BOOKS.json";
import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import axios from "axios";

type BooksManagement = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  quantity: number;
  category_id: number;
  created_by: number;
};

const inputList = [
  "Title",
  "Author",
  "ISBN",
  "Quantity",
  "Created Id",
  "Created By",
];

const init_form = {
  title: "",
  author: "",
  isbn: "",
  quantity: "",
  created_id: "",
  created_by: "",
};

const BooksManagement = () => {
  const [open, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [tableData, setTableData] = useState<BooksManagement[]>([]);
  const [form, setForm] = useState(init_form);

  useEffect(() => {
    // const booksData: BooksManagement[] = BOOKS;
    // setTableData(booksData);
    handleGetBooks();
  }, []);

  const handleGetBooks = () => {
    axios
      .get("https://run.mocky.io/v3/f23c2b4b-a115-456a-b79d-1e9d8a8b6e56")
      .then((res) => {
        const data = res.data;
        setTableData(data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleAddBooks = () => {
    axios
      .post(
        "https://run.mocky.io/v3/f23c2b4b-a115-456a-b79d-1e9d8a8b6e56",
        form
      )
      .then((res) => {
        console.log(res.data);
        setTableData([]);
        handleGetBooks();
        setOpen(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleEditBooks = () => {
    axios
      .put("https://run.mocky.io/v3/f23c2b4b-a115-456a-b79d-1e9d8a8b6e56", form)
      .then((res) => {
        console.log(res.data);
        setTableData([]);
        handleGetBooks();
        setOpen(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    isEdit ? handleEditBooks() : handleAddBooks();
    console.log(form);
  };

  const handleDeleteBooks = () => {
    axios
      .put("https://run.mocky.io/v3/f23c2b4b-a115-456a-b79d-1e9d8a8b6e56", form)
      .then((res) => {
        console.log(res.data);
        setTableData([]);
        handleGetBooks();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <Navigation />
      <h1 className="text-3xl font-bold text-center mb-8">Books Management</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          data-dialog-target="dialog"
          type="button"
          onClick={() => setOpen(true)}
        >
          Add
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Author</th>
              <th className="py-3 px-6 text-center">ISBN</th>
              <th className="py-3 px-6 text-center">Quantity</th>
              <th className="py-3 px-6 text-center">Created By</th>
              <th className="py-3 px-6 text-center">Created Id</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {tableData.map((book) => {
              return (
                <tr
                  key={book.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{book.id}</td>
                  <td className="py-3 px-6 text-left">{book.title}</td>
                  <td className="py-3 px-6 text-left">{book.author}</td>
                  <td className="py-3 px-6 text-center">{book.isbn}</td>
                  <td className="py-3 px-6 text-center">{book.quantity}</td>
                  <td className="py-3 px-6 text-center">{book.category_id}</td>
                  <td className="py-3 px-6 text-center">{book.created_by}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                      <button
                        className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
                        onClick={() => {
                          setOpen(true);
                          setEdit(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                        onClick={handleDeleteBooks}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setTimeout(() => {
            setEdit(false);
          }, 500);
        }}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <form
                className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                onSubmit={handleSubmit}
              >
                <h1 className="text-3xl font-bold text-center mb-8">
                  Form {isEdit ? "Edit" : "Add"}
                </h1>

                {inputList.map((input) => {
                  return (
                    <input
                      key={input}
                      required
                      className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow mb-4"
                      placeholder={input}
                      onChange={(e) => {
                        const field = input.replace(/\s/g, "_").toLowerCase();
                        setForm({ ...form, [field]: e.target.value });
                      }}
                    />
                  );
                })}

                <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse mt-5">
                  <button
                    type="submit"
                    // onClick={() => setOpen(false)}
                    className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto"
                  >
                    {isEdit ? "Edit" : "Add"}
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default BooksManagement;
