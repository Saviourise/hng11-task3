import React, { useState, createContext } from "react";

export const ToastMessage = createContext({
  message: "",
  type: "" as "error" | "success" | "info" | "warning",
  setMessage: null as any,
  setType: null as any,
});

const ToastMessageProvider = (props: any) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"error" | "success" | "info" | "warning">(
    "info"
  );

  return (
    <ToastMessage.Provider
      value={{
        message: message,
        type: type,
        setMessage: setMessage,
        setType: setType,
      }}
    >
      {props.children}
    </ToastMessage.Provider>
  );
};
export default ToastMessageProvider;
