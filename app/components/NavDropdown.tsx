"use client";
import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import { classNames } from "@component/utils/general";

const NavDropdown = () => {
  return (
    <Menu as="div" className="relative ml-3 z-20">
      <div>
        <Menu.Button className="shadow-lg hover:shadow p-3 rounded-3xl flex gap-2 border border-solid border-neutral">
          <span className="sr-only">Open user menu</span>
          <Bars3Icon className="block h-5 w-5" aria-hidden="true" />
          <UserCircleIcon className="block h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="flex flex-col gap-2 absolute right-0 z-10 mt-2 pt-3 pb-2 w-60 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-[#F7F7F7]" : "",
                  "block px-4 py-2 text-sm text-gray-700 font-semibold"
                )}
              >
                Sign up
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-[#F7F7F7]" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Login
              </a>
            )}
          </Menu.Item>
          <hr />
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-[#F7F7F7]" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Airbnb your home
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={classNames(
                  active ? "bg-[#F7F7F7]" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Help
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NavDropdown;
