"use client";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import lending from "../../data/LENDING.json";
import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";

type LendingBooks = {
  id: number;
  book_id: number;
  member_id: number;
  borrowed_date: string;
  due_date: string;
  return_date: string | null;
  status: string;
  created_by: number;
};

const LendingBooks = () => {
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState<LendingBooks[]>([]);

  useEffect(() => {
    const lendingData: LendingBooks[] = lending;
    setTableData(lendingData);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <Navigation />
      <h1 className="text-3xl font-bold text-center mb-8">
        Books Lending Management
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          data-dialog-target="dialog"
          type="button"
          onClick={() => setOpen(true)}
        >
          Lend
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Book ID</th>
              <th className="py-3 px-6 text-left">Member Id</th>
              <th className="py-3 px-6 text-center">Borrowed Date</th>
              <th className="py-3 px-6 text-center">Due Date</th>
              <th className="py-3 px-6 text-center">Return Date</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Crated By</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {tableData.map((data) => {
              return (
                <tr
                  key={data.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{data.id}</td>
                  <td className="py-3 px-6 text-left">{data.book_id}</td>
                  <td className="py-3 px-6 text-left">{data.member_id}</td>
                  <td className="py-3 px-6 text-center">
                    {data.borrowed_date}
                  </td>
                  <td className="py-3 px-6 text-center">{data.due_date}</td>
                  <td className="py-3 px-6 text-center">{data.return_date}</td>
                  <td className="py-3 px-6 text-center">{data.status}</td>
                  <td className="py-3 px-6 text-center">{data.created_by}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                      {data.status === "returned" ? (
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                          Delete
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setOpen(true);
                          }}
                          type="button"
                          className="text-gray-900 bg-transparant border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        >
                          Return
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
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
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h1 className="text-3xl font-bold text-center mb-8">
                  Form Lending
                </h1>
                <form className="max-w-sm mx-auto">
                  <div className="mb-5">
                    <label
                      htmlFor="bookId"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Book ID
                    </label>
                    <input
                      id="bookId"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="borrowedDate"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Borrowed Date
                    </label>
                    <input
                      id="borrowedDate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      type="date"
                      required
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="dueDate"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Due Date
                    </label>
                    <input
                      id="dueDate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      type="date"
                      required
                    />
                  </div>
                  {/* <div className="mb-5">
                    <label
                      htmlFor="reutrnDate"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Return Date
                    </label>
                    <input
                      id="reutrnDate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      type="date"
                      required
                    />
                  </div> */}
                  <div className="mb-5">
                    <label
                      htmlFor="createdBy"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Crated By
                    </label>
                    <input
                      id="createdBy"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Lend
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
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default LendingBooks;
