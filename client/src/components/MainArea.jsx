import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import ChatBuble from "./ChatBuble";

const MainArea = () => {
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setMsg(e.target.value);
  };
  return (
    <section className="m-8 relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <ChatBuble />
      <div className="fixed bottom-3 right-2 left-[330px]">
        <div className="relative flex  w-full ">
          <Input
            type="email"
            label="Message"
            className="pr-20"
            onChange={handleChange}
            value={msg}
            color="blue"
          />
          <Button
            size="sm"
            color={msg ? "blue" : "blue-gray"}
            disabled={!msg}
            className="!absolute right-1 top-1 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MainArea;
