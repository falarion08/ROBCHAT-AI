import { CustomFlowbiteTheme } from "flowbite-react";

export const customTheme: CustomFlowbiteTheme = {
    textInput:{
      field:{
        input:{
          colors:{
            dark:"bg-gray-800 text-white focus:ring-cyan-500"
          }
        }
      }
    },
    button: {
      color: {
        regularTheme: "bg-[#087830] tracking-wide hover:bg-green-500 active:bg-[#087830] font-poppins font-semibold ",
      },
    },
  };

export const dashboardTopNavBar: CustomFlowbiteTheme = {
    dropdown: {
        content: "",
        floating: {
            style: {
                auto: "bg-gray-700"
            },

            item: {
                base: "flex font-sfpro w-full cursor-pointer items-center justify-start p-1 text-white focus:outline-none hover:bg-gray-600 focus:bg-gray-600 focus:text-white",

            }
        }
    },
    modal: {
        content: {
            inner: "relative flex max-h-[90dvh] flex-col rounded-lg shadow bg-gray-700"
        },
        header: {
            base: "flex items-start justify-between rounded-t border-b p-5 border-gray-600",
            title: "font-sfpro font-bold tracking-wider text-xl  text-white",
            close: {
                base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-600 hover:text-white"
            },
        },
    },
    button: {
        color: {
            failure: "font-sfpro font-semibold border border-transparent bg-red-700 text-white focus:ring-4 focus:ring-red-300 enabled:hover:bg-red-800 dark:bg-red-600 dark:focus:ring-red-900 dark:enabled:hover:bg-red-700",
        }
    }
}