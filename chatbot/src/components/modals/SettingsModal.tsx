
"use client";

import { logout } from "@/app/actions";
import { Button, Modal, Select } from "flowbite-react";
import { Dispatch, SetStateAction, useState } from "react";

interface PropsType {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export function SettingsModal(props: PropsType) {
  const [openModal, setOpenModal] = [props.openModal, props.setOpenModal];
  const supportedLanguages: string[] = [
    // Major Global Languages
    "English", "Spanish", "French", "German", "Portuguese",
    "Russian", "Chinese (Simplified)", "Chinese (Traditional)",
    "Japanese", "Korean", "Italian", "Arabic",

    // Regional & Lesser-Known Languages
    "Hindi", "Bengali", "Urdu", "Tamil", "Telugu", "Marathi", "Punjabi",
    "Turkish", "Persian", "Hebrew", "Greek",
    "Dutch", "Polish", "Ukrainian", "Czech", "Hungarian",
    "Swahili", "Afrikaans", "Hausa",
    "Filipino (Tagalog)", "Vietnamese", "Thai", "Indonesian", "Malay",
  ]
  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Settings</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">

            <div className="flex flex-col">
              <div className=" font-sfpro tracking-wider flex flex-row justify-between">
                <p className=" flex items-center">AI Language</p>
                <Select value={supportedLanguages[3]} id="countries" required>
                  {
                    supportedLanguages.map((l,i)=><option key={i}>{l}</option>)
                  }


                </Select>
              </div>
            </div>

            {/* DELETE CHATS */}
            <div className="flex flex-col">
              <div className=" font-sfpro tracking-wider flex flex-row justify-between">
                <p className=" flex items-center">Delete all chats</p>
                <Button color="failure" pill>
                  Delete All
                </Button>
              </div>
            </div>
            {/* LOG OUT */}
            <div className="flex flex-col">
              <div className=" font-sfpro tracking-wider flex flex-row justify-between">
                <p className=" flex items-center">Log out on this device</p>
                <button className="font-sfpro tracking-wider py-2 px-4 border border-white rounded-full" onClick={async () => {
                  logout();
                  setOpenModal(false)
                }}>
                  Log out
                </button>
              </div>
            </div>

          </div>
        </Modal.Body>

      </Modal>
    </>
  );
}
