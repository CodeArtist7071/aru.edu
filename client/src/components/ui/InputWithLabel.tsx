import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  element?: string;
  error?:string;
  icon?:any;
  labelIcon?:any;
}

export const InputWithLabel = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, element, icon,error,labelIcon,  ...props }, ref) => {
    return (
      <div>
        <div className="flex justify-between items-center">
          <label
            htmlFor={id}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            {label}
          </label>
          {element && <span>{element}</span>}
        </div>

        <div className="relative flex border px-4 items-center rounded-lg border-slate-300 dark:border-slate-700 focus:bg-amber-400  transition-all">
          {labelIcon}
          <input
            ref={ref}
            id={id}
            className="block w-full focus:outline-0 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 py-3 px-4"
            {...props}
          />
          {icon}
        </div>
        {error && <p className="text-sm mt-2">{error}</p>}
      </div>
    );
  },
);
