import { type ReactElement } from "react";

interface ToggleSettingProps {
  children: ReactElement;
  onClick: () => void;
  checked: boolean;
  text:string;
}

const ToggleSettingButton = ({ children, onClick, checked ,text}: ToggleSettingProps) => {
  return (
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            {children}
            <span className="font-medium">{text}</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={onClick}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-teal-600"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
          </label>
        </div>
      
  );
};

export default ToggleSettingButton;


