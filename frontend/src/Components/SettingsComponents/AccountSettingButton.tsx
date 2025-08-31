import type { ReactElement } from "react";

interface AccountSetting {
    children: ReactElement,
    text:string,
    className?:string,
    onClick?: () => void
}
const AccountSettingButton = ({children,text,className, onClick}: AccountSetting) => {
  return (
    <button className={`flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition ${className}`} onClick={onClick}>
      {children}
      <span className="font-medium">{text}</span>
    </button>
  );
};

export default AccountSettingButton;
