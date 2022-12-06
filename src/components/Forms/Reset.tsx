import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { IFormInput } from "../../models/Forms";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { validationRules } from "./validationRules";
import { useStateContext } from "contexts/ContextProvider";
import { Button } from "components/index";
import { useEffect } from "react";
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { ThemeSettings } from '../../components/index';


const Reset = () => {
  const { setCurrentColor, setCurrentMode, currentMode, currentColor, themeSettings, setThemeSettings } = useStateContext();

  const formSchema = Yup.object().shape({
    email: validationRules.email,
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>(formOptions);
  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) =>
    console.log(data);

    useEffect(() => {
      const currentThemeColor = localStorage.getItem('colorMode');
      const currentThemeMode = localStorage.getItem('themeMode');
      if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
      }
  }, []);

  return (
    <div className={`${currentMode === 'Dark' ? 'dark' : ''}`}>
    <div className="w-full min-h-screen flex flex-col justify-center items-center dark:bg-main-dark-bg bg-main-bg">
      <form onSubmit={handleSubmit(onSubmit)} className={`text-center dark:text-gray-200 p-10 rounded-lg dark:bg-secondary-dark-bg bg-white shadow-lg shadow-indigo-500/40 dark:shadow-lg`}>
        <h2 className="text-4xl p-3">Password Reset</h2>
        <input
          className="m-2 p-2 rounded-md bg-main-bg hover:drop-shadow-xl"
          type="email"
          placeholder="Email *"
          autoFocus
          {...register("email")}
        />
        <p className="">{errors.email?.message}</p>
        <div className="p-3">
          <div className="hover:drop-shadow-xl text-black dark:shadow-lg dark:hover:shadow-gray-900">
        <Button
          color="white"
          bgColor={currentColor}
          text="Reset"
          borderRadius="10px"
          width="full"
        />
          </div>
          <Link to="/signin">
            <button className="w-full my-6 p-3 bg-slate-100 hover:drop-shadow-xl text-black dark:shadow-lg dark:hover:shadow-gray-900" style={{borderRadius: "10px"}} type="button">
              Back
            </button>
          </Link>
        </div>
        <div className="my-2">
          <p className="">
            Don't have an account?
            <span className={`hover:text-sky-400`}>
              <Link to="/signup"> <strong>Click here to create one</strong></Link>
            </span>
          </p>
        </div>
      </form>
      <div className="flex w-full justify-end sm:mr-10 md:mr-16 lg:mr-24 mt-6">
      <TooltipComponent
              content="Settings"
              position="RightBottom"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

      </TooltipComponent>
    {themeSettings && (<ThemeSettings />)}
      </div>
    </div>
    </div>
  );
};
export default Reset;
