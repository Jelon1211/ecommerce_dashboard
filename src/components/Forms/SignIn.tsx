import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { IFormInput } from "../../models/Forms";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { validationRules } from "./validationRules";
import { AuthService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "contexts/ContextProvider";
import { Button } from "components/index";
import { useEffect, useState } from "react";
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { ThemeSettings } from '../../components/index';



const SignIn = () => {
  const { setCurrentColor, setCurrentMode, currentMode, currentColor, themeSettings, setThemeSettings } = useStateContext();

  const [userDoesntExist, setUserDoesntExist] = useState<boolean>(false);  

  const authService = new AuthService();
  const navigate = useNavigate();
  const formSchema = Yup.object().shape({
    email: validationRules.email,
    password: validationRules.password,
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>(formOptions);

  const signInUser = async (data: IFormInput) =>{
    try {
      const loginUser = await authService.login(data.email, data.password);
      navigate("/accesstoken", {
        state: { accessToken: loginUser.access_token },
        replace: true,
      });   
    }
    catch{
      setUserDoesntExist(userDoesntExist => !userDoesntExist);
    }
  }

  console.log(userDoesntExist);

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    signInUser(data);
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
    <>
    <div className={`${currentMode === 'Dark' ? 'dark' : ''}`}>
      <div className="w-full min-h-screen flex flex-col justify-center items-center dark:bg-main-dark-bg bg-main-bg">
      <form onSubmit={handleSubmit(onSubmit)} className={`text-center dark:text-gray-200 p-10 rounded-lg dark:bg-secondary-dark-bg bg-white shadow-lg shadow-indigo-500/40 dark:shadow-lg`}>
        <h2 className="text-4xl p-3">Sign In</h2>
        <input
          className="m-2 p-2 rounded-md text-black"
          type="email"
          placeholder="admin@admin.com"
          autoFocus
          {...register("email")}
        />
        <p className="text-rose-600 text-sm mb-2">{errors.email?.message}</p>
        <input
          className="m-2 p-2 rounded-md text-black"
          type="password"
          placeholder="admin"
          {...register("password")}
        />
        <p className="text-rose-600 text-sm mb-2">{errors.password?.message}</p>
          <div className="py-1 mb-3 mt-1 font-medium">
            <div>
            <input className="mx-2 scale-150" type="checkbox" {...register("rememberMe")} />
            Remember me
            </div>
            <div>
            {userDoesntExist ? <p className="text-rose-700 float-right mt-3">User doesn't exist</p> : ""}
            </div>
          </div>
        <div className="hover:drop-shadow-xl text-black dark:shadow-lg dark:hover:shadow-gray-900">
        <Button
          color="white"
          bgColor={currentColor}
          text="Sign in"
          borderRadius="10px"
          width="full"
        />
        </div>
          <Link to="/reset">
            <div className={`mt-2 mb-4 hover:text-sky-400`}>Forgot password?</div>
          </Link>
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
    </>
  );
};
export default SignIn;
