import ReactDom from "react-dom";
import { useForm } from "react-hook-form";
import { IModal, SubmitJobsData } from "models/Modals";
import { useState } from "react";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import useJobsDetailsService from "services/JobsDetailsService";
import useJobsService from "services/JobsService";
import { Header } from "components/Header";
import { Button } from "components/Button";
import { useStateContext } from '../../../contexts/ContextProvider';

const EditJobModal = ({ open, onClose, id }: IModal) => {
  const { currentColor } = useStateContext();

  const [apiRequestError, setApiRequestError] = useState<string>("");
  const { register, handleSubmit } = useForm<SubmitJobsData>();
  const { useGetJobsDetails } = useJobsDetailsService();
  const [{ data, loading }] = useGetJobsDetails(id === undefined ? "0" : id.toString());
 
  const { usePutJobs } = useJobsService();
  const [, executePut] = usePutJobs();

  const onModalSubmit = async(submitData: SubmitJobsData) => {
    console.log(submitData);
    try {
   await executePut({
      data: {
        ...submitData
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
   const submitData = Object.assign({id: id}, data)
    onModalSubmit(submitData);
  };


  if (!open) return <></>;
  if (loading) return <div><LoadingScreen/></div>;
  return ReactDom.createPortal(
    <>
      <div className="fixed inset-0 bg-black/75" onClick={onClose} />
      <div className="fixed left-2/4 bg-white top-2/4 -translate-y-1/2 -translate-x-1/2 w-10/12 lg:w-4/6 p-6 rounded-lg" onClick={(e) => e.stopPropagation()}>
      <Header category="Modal" title="Edit Job" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-evenly w-full lg:flex-row">
            <input
              type="text"
              placeholder={data.title ?? "Title"}
              className="w-full border-1 border-black/25 rounded-sm p-2 my-1 lg:mr-1"
              {...register("title", { required: true })}
            ></input>
            <input
              type="date"
              placeholder={data.date}
              className="w-full border-1 border-black/25 rounded-sm p-2 my-1 lg:mr-1"
              {...register("date", { required: true })}
            ></input>
          <input
              type="text"
              placeholder={data.shortdescription ?? "Short Description"}
              className="w-full border-1 border-black/25 rounded-sm p-2 my-1"
              {...register("shortdescription", { required: true })}
            ></input>
          </div>
          <div>
            <input
              type="text"
              placeholder={data.longdescription ?? "Long Description"}
              className="w-full border-1 border-black/25 rounded-sm p-2 my-1 h-14"
              {...register("longdescription", { required: true })}
            ></input>
            <input
              type="text"
              placeholder={data.logo ?? "Logo url address"}
              className="w-full border-1 border-black/25 rounded-sm p-2 my-1 h-14"
              {...register("logo", { required: true })}
            ></input>
          </div>
          <div className="flex justify-between items-center mt-5">
          <Button
              color="white"
              bgColor={currentColor}
              text="Edit Job"
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

export default EditJobModal;
