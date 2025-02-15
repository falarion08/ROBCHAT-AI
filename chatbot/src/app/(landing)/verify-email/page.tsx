"use client";

import { Toast } from "flowbite-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { HiX } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import Link from 'next/link'


export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);


  const searchParams = useSearchParams();
  const verifyToken = searchParams.get('verifyToken');
  const userID = searchParams.get('id');

  const initalized = useRef(false)

  useEffect(() => {
    if (!initalized.current) {
      initalized.current = true;
      verifyEmail();
    }
  }, [])

  const verifyEmail = async () => {

    if (!verifyToken || !userID)
      return <DestructiveToast message={"Invalid URL"} />

    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/verify-email?verifyToken=${verifyToken}&id=${userID}`, {
        method: "GET",
        headers: {
          'Content-Type': "application/json"
        },
      })


      const data = await res.json();


      if (res.ok) {
        setIsLoading(false);
        setVerified(true);
      } else {
        setError(true);
        setIsLoading(false);
      }

    } catch (e) {
      console.log(e);
      setError(true);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <Suspense>
        <h1 className="flex justify-center items-center h-screen">Verifying Your Email. Please wait...</h1>
      </Suspense>
    )
  } else {
    return (
      <Suspense>
        <div className="flex justify-center items-center h-screen">
          <div className="w-full max-w-md">
            {verified && (
              <Alert color="info" icon={HiInformationCircle}>
                <span className="font-medium">Info alert!</span> Your email has been verified successfully.

                <Link href={"/login"}><button
                  type="button"
                  className="mr-2 inline-flex items-center rounded-lg bg-cyan-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-800 dark:hover:bg-cyan-900"
                >
                  Return To Login Screen
                </button>
                </Link>
              </Alert>

            )}
            {error && (
              <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Info alert!</span> Email Verification failed. Your verification token  is invalid or expired
              </Alert>
            )}
          </div>
        </div>
      </Suspense>
    )
  }

}

function DestructiveToast(props: any) {
  return (
    <Toast>
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
        <HiX className="h-5 w-5" />
      </div>
      <div className="ml-3 text-sm font-normal">{props.message}</div>
      <Toast.Toggle />
    </Toast>
  )
}