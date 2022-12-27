import ReactDom from "react-dom";
import { useForm } from "react-hook-form";
import { IModal, SubmitCandidatesData } from "models/Modals";
import { useState } from "react";
import useCandidatesService from "services/CandidatesService";
import { useStateContext } from '../../../contexts/ContextProvider';
import { Header } from "components/Header";
import { Button } from "components/Button";

const AddCandidateModal = ({ open, onClose }: IModal) => {
  const { currentColor } = useStateContext();

  const [apiRequestError, setApiRequestError] = useState<string>("");
  const { register, handleSubmit } = useForm<SubmitCandidatesData>();

  const { usePostCandidate } = useCandidatesService();
  const [, executePost] = usePostCandidate();

  const onModalSubmit = async(data: SubmitCandidatesData) => {
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

  const onSubmit = (data: SubmitCandidatesData) => {
    onModalSubmit(data);
  };
  
  if (!open) return <></>;

  return ReactDom.createPortal(
    <>
      <div className="fixed inset-0 bg-black/75" onClick={onClose} />
      <div className="fixed left-2/4 bg-white top-2/4 -translate-y-1/2 -translate-x-1/2 w-10/12 lg:w-4/6 p-6 rounded-lg" onClick={(e) => e.stopPropagation()}>
      <Header category="Modal" title="Add Candidate" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-evenly w-full lg:flex-row">
            <input
              type="text"
              placeholder="Name"
              className="w-full lg:w-2/6 border-1 border-black/25 rounded-sm p-2 my-1 lg:mr-1"
              {...register("name", { required: true })}
            ></input>
            <input
              type="date"
              placeholder="Date"
              className="w-full lg:w-2/6 border-1 border-black/25 rounded-sm p-2 my-1 lg:mr-1"
              {...register("date", { required: true })}
            ></input>
            <input
              type="text"
              placeholder="Position"
              className="w-full lg:w-2/6 border-1 border-black/25 rounded-sm p-2 my-1"
              {...register("position", { required: true })}
            ></input>
          </div>
          <div className="flex flex-col justify-evenly w-full lg:flex-row">
          <input
              type="text"
              placeholder="Short Description"
              className="w-full border-1 border-black/25 rounded-sm p-2 my-1"
              {...register("shortDescription", { required: true })}
            ></input>
          </div>
          <div className="flex flex-col justify-evenly w-full lg:flex-row">
            <input
              type="text"
              placeholder="Long Description"
              className="w-full border-1 border-black/25 rounded-sm h-14 p-2 my-1"
              {...register("longDescription", { required: true })}
            ></input>
          </div>
          <div className="flex flex-col justify-evenly w-full lg:flex-row">
            <input
              type="text"
              placeholder="Logo"
              className="w-full lg:w-1/2 border-1 border-black/25 rounded-sm p-2 my-1 lg:mr-1"
              {...register("logo", { required: true })}
            ></input>
          </div>
          <div className="flex justify-between items-center mt-5">
          <Button
              color="white"
              bgColor={currentColor}
              text="Add New Candidate"
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

export default AddCandidateModal;
