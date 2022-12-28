import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { IFormInput } from "../../models/Forms";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { validationRules } from "./validationRules";
import { AuthService } from "../../services/AuthService";
import { useStateContext } from "contexts/ContextProvider";
import { Button } from "components/index";
import { useEffect, useState } from "react";
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { ThemeSettings } from '../../components/index';
import MiniLoading from "components/LoadingScreen/MiniLoading";


const SignUp = () => {
  const { setCurrentColor, setCurrentMode, currentMode, currentColor, themeSettings, setThemeSettings } = useStateContext();

  const [isMiniLoading, setIsMiniLoading] = useState<boolean>(false);

  const authService = new AuthService();
  const navigate = useNavigate();
  const formSchema = Yup.object().shape({
    firstName: validationRules.firstName,
    lastName: validationRules.lastName,
    email: validationRules.email,
    password: validationRules.password,
    retypePassword: validationRules.retypePassword,
  });
  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>(formOptions);

  const signUpUser = async (data: IFormInput) => {
    await authService.register(data.firstName, data.lastName, data.email, data.password)
    navigate("/signin");
  }

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    setIsMiniLoading(true);
    await signUpUser(data);
  };

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
        <h2 className="text-4xl p-3">Enter Your Details</h2>
        <input
          className="m-2 p-2 rounded-md bg-main-bg hover:drop-shadow-xl text-black"
          type="text"
          placeholder="First Name *"
          autoFocus
          {...register("firstName")}
        />
        <p className="text-rose-600 text-sm mb-2">{errors.firstName?.message}</p>
        <input
          className="m-2 p-2 rounded-md bg-main-bg hover:drop-shadow-xl text-black"
          type="text"
          placeholder="Last Name *"
          {...register("lastName")}
        />
        <p className="text-rose-600 text-sm mb-2">{errors.lastName?.message}</p>
        <input
          className="m-2 p-2 rounded-md bg-main-bg hover:drop-shadow-xl text-black"
          type="email"
          placeholder="Email *"
          {...register("email")}
        />
        <p className="text-rose-600 text-sm mb-2">{errors.email?.message}</p>
        <input
          className="m-2 p-2 rounded-md bg-main-bg hover:drop-shadow-xl text-black"
          type="password"
          placeholder="Password *"
          {...register("password")}
        />
        <p className="text-rose-600 text-sm mb-2">{errors.password?.message}</p>
        <input
          className="m-2 mb-5 p-2 rounded-md bg-main-bg hover:drop-shadow-xl text-black"
          type="password"
          placeholder="Retype Password *"
          {...register("retypePassword")}
        />
          {isMiniLoading ? <><div className="flex"><MiniLoading /> <p className="text-gray-400 dark:text-slate-500 text-sm ml-4"> It may take a while, pleas wait, server is the worst :(</p></div></> : ""}
        <p className="text-rose-600 text-sm mb-2">{errors.retypePassword?.message}</p>
        <div className="hover:drop-shadow-xl text-black dark:shadow-lg dark:hover:shadow-gray-900">
        <Button
          color="white"
          bgColor={currentColor}
          text="Sign in"
          borderRadius="10px"
          width="full"
        />
        </div>
          <Link to="/signin">
            <button className="w-full my-6 p-3 bg-slate-100 hover:drop-shadow-xl text-black dark:shadow-lg dark:hover:shadow-gray-900" style={{borderRadius: "10px"}} type="button">
              Back
            </button>
          </Link>
        <div className="my-2">
          <p className="">
            Aleready have an account? Then{" "}
            <span className={`hover:text-sky-400`}>
              <Link to="/signin"> <strong>sign in</strong></Link>
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
export default SignUp;
