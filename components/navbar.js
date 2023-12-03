import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NavbarTop({ user }) {
  const router = useRouter();
  const [ddv, setDdv] = useState(false);
  const [ttv, setTtv] = useState(false);
  const [but, setBut] = useState(false);
  const [ress, setRess] = useState([]);
  const [likes, setLikes] = useState([]);
  const { pathname } = router;

  let temp = [];
  const removeIt = async (fid) => {
    const response = await axios.get("/api/cart");
    const filteredRes = response.data.filter((item) => item.id === fid);

    // Use the state updater function to get the latest state
    setRess((prevRess) => filteredRes);

    console.log(filteredRes);
    console.log(ress);

    if (filteredRes.length > 0) {
      await axios.delete("/api/cart?id=" + filteredRes[0]._id);
      router.push({ pathname });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const cartResponse = await axios.get("/api/cart");
      const cartRes1 = cartResponse.data.filter(
        (items) => items.user === user.email && items.cart === "like"
      );

      const prodResponse = await axios.get("/api/products");

      let tempLikes = [];

      await Promise.all(
        cartRes1.map(async (cart) => {
          const prod1 = prodResponse.data.find(
            (prods) => prods._id === cart.id
          );
          if (prod1) {
            tempLikes.push(prod1);
          }
        })
      );

      setLikes(tempLikes);
    };

    fetchData();
  }, [user]);

  return (
    <nav className=" py-5 bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            V-Commerce
          </span>
        </a>
        <div className="flex gap-5 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            onClick={() => {
              setBut(!but);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M19.071 13.142L13.414 18.8a2 2 0 0 1-2.828 0l-5.657-5.657A5 5 0 1 1 12 6.072a5 5 0 0 1 7.071 7.07Z"
              />
            </svg>
          </button>

          {but && (
            <div
              class="relative z-10"
              aria-labelledby="slide-over-title"
              role="dialog"
              aria-modal="true"
            >
              <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

              <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                  <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <div class="pointer-events-auto w-screen max-w-md">
                      <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                          <div class="flex items-start justify-between">
                            <h2
                              class="text-lg font-medium text-gray-900"
                              id="slide-over-title"
                            >
                              Liked products
                            </h2>
                            <div class="ml-3 flex h-7 items-center">
                              <button
                                onClick={() => {
                                  setBut(!but);
                                }}
                                type="button"
                                class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              >
                                <span class="absolute -inset-0.5"></span>
                                <span class="sr-only">Close panel</span>
                                <svg
                                  class="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div class="mt-8">
                            <div class="flow-root">
                              <ul
                                role="list"
                                class="-my-6 divide-y divide-gray-200"
                              >
                                {likes.map((likes) => (
                                  <li class="flex py-6">
                                    <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={likes.base64Image}
                                        alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                        class="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div class="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div class="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            <a href="#">{likes.name}</a>
                                          </h3>
                                          <p class="ml-4">${likes.price}</p>
                                        </div>
                                        <p class="mt-1 text-sm text-gray-500">
                                          {likes.catagory}
                                        </p>
                                      </div>
                                      <div class="flex flex-1 items-end justify-between text-sm">
                                        <p class="text-gray-500">Qty 1</p>

                                        <div class="flex">
                                          <button
                                            onClick={() => {
                                              removeIt(likes._id);
                                            }}
                                            type="button"
                                            class="font-medium text-indigo-600 hover:text-indigo-500"
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <img
            type="button"
            onClick={() => {
              setDdv(!ddv);
            }}
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="userDropdown"
            data-dropdown-placement="bottom"
            className="w-10 h-10 rounded-full cursor-pointer"
            src={user.image}
            alt="user photo"
          />
          {ddv && (
            <div
              className=" absolute right-0 top-12 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              id="userDropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {user.name}
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {user.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      signOut();
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <form>
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-96 h-10 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mobiles, Laptops..."
              required
            />
            <button
              type="submit"
              class="text-white absolute h-8 end-1 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
}
