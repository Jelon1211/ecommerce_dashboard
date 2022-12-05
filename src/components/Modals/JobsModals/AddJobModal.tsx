import ReactDom from "react-dom";
import { useForm } from "react-hook-form";
import { IModal, SubmitJobsData } from "models/Modals";
import { useState } from "react";
import useJobsService from "services/JobsService";
import { Header } from "components/Header";
import { Button } from "components/Button";
import { useStateContext } from '../../../contexts/ContextProvider';

const AddJobModal = ({ open, onClose }: IModal) => {
  const { currentColor } = useStateContext();

  const [apiRequestError, setApiRequestError] = useState<string>("");
  const { register, handleSubmit } = useForm<SubmitJobsData>();

  const { usePostJobs } = useJobsService();
  const [, executePost] = usePostJobs();

  const onModalSubmit = async(data: SubmitJobsData) => {
    try {
      executePost({
        data: {
          ...data
        }
      })
    onClose();
  }
  catch(error){
    console.log(error)
    setApiRequestError("Cannot connect to the server");
  }
  }

  const onSubmit = (data: SubmitJobsData) => {
    onModalSubmit(data);
  };

  if (!open) return <></>;

  return ReactDom.createPortal(
    <>
      <div className="fixed inset-0 bg-black/75" onClick={onClose} />
      <div className="fixed left-2/4 bg-white top-2/4 -translate-y-1/2 -translate-x-1/2 w-10/12 lg:w-4/6 p-6 rounded-lg" onClick={(e) => e.stopPropagation()}>
        <Header category="Modal" title="Add Job" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-evenly w-full lg:flex-row">
            <input
              type="text"
              placeholder="Title"
              className="w-full border-1 border-black/25 rounded-sm p-2 my-1 lg:mr-1"
              {...register("title", { required: true })}
            ></input>
            <input
              type="date"
              placeholder="Date"
              className="w-full lg:w-2/6 border-1 border-black/25 rounded-sm p-2 my-1"
              {...register("date", { required: true })}
            ></input>
          </div>
          <div>
            <input
              type="text"
              placeholder="Short Description"
              className="w-full border-1 border-black/25 rounded-sm p-2 my-1"
              {...register("shortDescription", { required: true })}
            ></input>
            <input
              type="text"
              placeholder="Long Description"
              className="w-full border-1 border-black/25 rounded-sm p-2 my-1 h-14"
              {...register("longDescription", { required: true })}
            ></input>
            <input
              type="text"
              placeholder="Logo"
              className="w-full border-1 border-black/25 rounded-sm p-2 my-1"
              {...register("logo", { required: true })}
            ></input>
            <input
              type="text"
              placeholder="Company Name"
              className="w-full border-1 border-black/25 rounded-sm p-2 my-1"
              {...register("companyName", { required: true })}
            ></input>
          </div>
          <div className="flex justify-between items-center mt-5">
            <Button
              color="white"
              bgColor={currentColor}
              text="Add New Job"
              borderRadius="10px"
            />
            {apiRequestError && (
              <p className="text-red-600 mx-1">{apiRequestError}</p>
            )}
          </div>
        </form>
      </div>
    </>,
    document.getElementById("portal") as HTMLElement
  );
};

export default AddJobModal;