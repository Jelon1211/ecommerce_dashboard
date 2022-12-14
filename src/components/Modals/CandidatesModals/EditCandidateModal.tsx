import ReactDom from "react-dom";
import { useForm } from "react-hook-form";
import { IModal, SubmitCandidatesData } from "models/Modals";
import { useState } from "react";
import useCandidatesDetailsService from "services/CandidatesDetailsService";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import useCandidatesService from "services/CandidatesService";
import { useStateContext } from '../../../contexts/ContextProvider';
import { Header } from "components/Header";
import { Button } from "components/Button";

const EditCandidateModal = ({ open, onClose, id }: IModal) => {
  const { currentColor } = useStateContext();

  const [apiRequestError, setApiRequestError] = useState<string>("");
  const { register, handleSubmit } = useForm<SubmitCandidatesData>();
  const { useGetCandidatesDetails } = useCandidatesDetailsService();
  const [{ data, loading }] = useGetCandidatesDetails(id===undefined ? "0" : id.toString());

  const { usePutCandidate } = useCandidatesService();
  const [, executePut] = usePutCandidate();

  const onModalSubmit = async(submitData: SubmitCandidatesData) => {
    console.log(submitData);
    try {
     await executePut ({
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

  const onSubmit = (data: SubmitCandidatesData) => {
    onModalSubmit({id, ...data});
  };


  if (!open) return <></>;
  if (loading) return <div><LoadingScreen/></div>;
  return ReactDom.createPortal(
    <>
      <div className="fixed inset-0 bg-black/75" onClick={onClose} />
      <div className="fixed left-2/4 bg-white top-2/4 -translate-y-1/2 -translate-x-1/2 w-10/12 lg:w-4/6 p-6 rounded-lg" onClick={(e) => e.stopPropagation()}>
      <Header category="Modal" title="Add Candidate" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-evenly w-full lg:flex-row">
            <input
              type="text"
              placeholder={data.name ?? "Name"}
              className="w-full border-1 border-black/25 rounded-sm p-2 my-1"
              {...register("name", { required: true })}
            ></input>
          </div>
          <div className="flex flex-col justify-evenly w-full lg:flex-row">
            <input
              type="date"
              placeholder={data.date}
              className="w-full border-1 border-black/25 rounded-sm p-2 my-1"
              {...register("date", { required: true })}
            ></input>
          </div>
          <div className="flex flex-col justify-evenly w-full lg:flex-row">
          <input
              type="text"
              placeholder={data.shortdescription ?? "Short description"}
              className="w-full border-1 border-black/25 rounded-sm p-2 my-1"
              {...register("shortdescription", { required: true })}
            ></input>
          </div>
          <div className="flex flex-col justify-evenly w-full lg:flex-row">
            <input
              type="text"
              placeholder={data.longdescription ?? "Long Description"}
              className="w-full border-1 border-black/25 rounded-sm p-2 my-1"
              {...register("longdescription", { required: true })}
            ></input>
          </div>
          <div className="flex flex-col justify-evenly w-full lg:flex-row">
            <input
              type="text"
              placeholder={data.logo ?? "Logo url address"}
              className="w-full border-1 border-black/25 rounded-sm p-2 my-1"
              {...register("logo", { required: true })}
            ></input>
          </div>
          <div className="flex justify-between items-center mt-5">
          <Button
              color="white"
              bgColor={currentColor}
              text="Edit Candidate"
              borderRadius="10px"
            />
            {apiRequestError && (
              <p className="candidates-modal-error-msg">{apiRequestError}</p>
            )}
          </div>
        </form>
      </div>
    </>,
    document.getElementById("portal") as HTMLElement
  );
};

export default EditCandidateModal;
