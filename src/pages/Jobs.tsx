import { Button, Header } from '../components/index';
import { useStateContext } from '../contexts/ContextProvider';


import { DeleteOutlined, Edit, VisibilityOutlined } from "@mui/icons-material";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { TablePagination } from "@mui/material";
import { Link } from "react-router-dom";
import AddJobModal from "../components/Modals/JobsModals/AddJobModal" 
import { CheckedListItem, IJobsresponse } from "../models/JobsTypes";
import useJobsService from "../services/JobsService";
import {usePagination} from "../components/Hooks/usePagination";
import EditJobModal from 'components/Modals/JobsModals/EditJobModal';
import ContentWrapper from './ContentWrapper/ContentWrapper';

export const Jobs = () => {

  const { currentColor } = useStateContext();

  const [isModalEditJobOpen, setIsModalEditJobOpen] = useState<boolean>(false);
  const [modalEditId, setModalEditId] = useState<number>(1);
  const [isModalAddJobOpen, setIsModalAddJobOpen] = useState<boolean>(false);
  const [searchBarInputText, setSearchBarInputText] = useState<string>("");
  const [jobsResponseData, setJobsResponseData] = useState<IJobsresponse[]>([]);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const [isSingleJobChecked, setIsSingleJobChecked] = useState<CheckedListItem[]>([]);
  const [checkDisabled, setCheckDisabled] = useState<boolean>(true);
  const [numberChecked, setNumberChecked] = useState<number>(0);
  
  const { useGetJobs } = useJobsService();
  const [{ data, loading }] = useGetJobs();
  const {useDeleteJobs} = useJobsService();
  
  const {changeCurrentPage, changePerPage, paginatedData, currentPage, perPage} = usePagination(jobsResponseData)

  const [, executeDelete] = useDeleteJobs()

  const handleAxiosDelete = (id: number) => {
    try{
      executeDelete({
        url: `/jobs/${id}`,
        data: id
      });
      setJobsResponseData(jobsResponseData.filter((jobsResponseData) => {
        return jobsResponseData.id !== id;
      }));
    }
    catch(err){console.log(err);}
  };

  const handleAxiosSettingResponseDataAsArray = () => {
    setJobsResponseData(Object.keys(data || {}).map((key) => data[key]));
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBarInputText(e.target.value.toLowerCase());
    changePerPage(e.target.value === "" ? 10 : 100);
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    changeCurrentPage(newPage)
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    changePerPage(parseInt(event.target.value))
  };

  const toggleIndividualCheck = (id: number) => {
    setIsSingleJobChecked(
      isSingleJobChecked.map((item) => {
        if (item.id === id) return { ...item, isChecked: !item.isChecked };
        else return item;
      })
    );
  };

  const selectAllJobsOffers = (value: boolean) => {
    setCheckedAll(!checkedAll);
    setIsSingleJobChecked((prevState) => {
      return prevState.map((item: CheckedListItem) => ({
        ...item,
        isChecked: value,
      }));
    });
  };

  const onClose = () => {
    setIsModalAddJobOpen(false);
    setIsModalEditJobOpen(false);
  };

  const deleteClickIcon = async (id: number) => {
    handleAxiosDelete(id);
  };

  const handleDeleteChecked = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "delete") {
      for (let element of isSingleJobChecked) {
        if (element.isChecked) {
          handleAxiosDelete(element.id);
        }
      }
    }
  };

  const loadInitialData = useCallback( () => {
    handleAxiosSettingResponseDataAsArray();
  }, [loading]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handleIndividualCheck = useCallback(() => {
    setIsSingleJobChecked(
      jobsResponseData.map((parameter: IJobsresponse) => ({
        id: parameter.id,
        isChecked: false,
      }))
    );
  }, [jobsResponseData]);

  useEffect(() => {
    handleIndividualCheck();
  }, [handleIndividualCheck]);


  const handleCheckAllState = useCallback(() => {
    setCheckedAll(isSingleJobChecked.every((item: CheckedListItem) => item.isChecked));
  }, [isSingleJobChecked]);

  const handleActionState = useCallback(() => {
    const allValueFalse = isSingleJobChecked.every(
      element => !element.isChecked
    );
    allValueFalse ? setCheckDisabled(true) : setCheckDisabled(false);
  }, [isSingleJobChecked]);

  const handleCountingRows = useCallback(() => {
    const countChecked = isSingleJobChecked.filter(
      value => value.isChecked
    ).length;
    setNumberChecked(countChecked);
  }, [isSingleJobChecked]);

  useEffect(() => {
    handleCountingRows();
    handleActionState();
    handleCheckAllState();
  }, [isSingleJobChecked, handleActionState, handleCheckAllState, handleCountingRows]);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <ContentWrapper>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Steve" title="Jobs" />
      <p className='text-gray-400'>This page was made using real api</p>
      
      <div className="border-1 overflow-x">
        <div className="flex flex-col md:flex-row items-center bg-gray-100 p-2 mb-2">
          <select
            className="bg-gray-100 order-2 md:order-1 w-fit py-2"
            disabled={checkDisabled}
            value={""}
            onChange={handleDeleteChecked}
          >
            <option value="">Action</option>
            <option value="delete">Delete</option>
          </select>
          <input
            className="bg-gray-100 p-0 md:pl-3 py-2 md:ml-12 order-1 md:order2 text-center"
            type="text"
            placeholder="Search job"
            onChange={handleSearchQueryChange}
          />
          <div className="ml-0 md:ml-auto order-3 md:order-3" onClick={() => setIsModalAddJobOpen(true)}>
          <Button
              color="white"
              bgColor={currentColor}
              text="Add new job"
              borderRadius="10px"
            />
          </div>
        </div>
        <table className="table-auto overflow-scroll w-full">
          <tbody className="w-full">
            <tr className="p-4">
              <th className="pb-5 pt-2">
                <input
                  className="w-4 h-4"
                  type="checkbox"
                  onChange={(event) =>
                    selectAllJobsOffers(event.target.checked)
                  }
                  checked={checkedAll}
                />
              </th>
              <th className="pb-5 pt-2">POSITION</th>
              <th className="pb-5 pt-2">DATE</th>
              <th className="pb-5 pt-2">ACTIONS</th>
            </tr>
            {paginatedData
              .filter(
                (element: IJobsresponse) =>
                  searchBarInputText === "" ||
                  element.title
                    .toLocaleLowerCase()
                    .includes(searchBarInputText.toLocaleLowerCase())
              )
              .map((item: IJobsresponse) => (
                <tr key={item.id} className="">
                  <td className="flex justify-center my-3">
                    {/* <input
                      id={`${item.id}`}
                      className="w-4 h-4"
                      type="checkbox"
                      onChange={() => toggleIndividualCheck(item.id)}
                      checked={
                        isSingleJobChecked.find(
                          (checkedItem) => checkedItem.id === item.id
                        )?.isChecked
                      }
                    /> */}
                  </td>
                  <td className="text-center">
                    <Link to={`/jobs/${item.id}`}>
                      <span className="my-3">{item.title}</span>
                    </Link>
                  </td>
                  <td className=""><span className='flex justify-center'>{item.date}</span></td>
                  <td className="flex justify-center mt-2">
                    <DeleteOutlined
                      className="cursor-pointer"
                      onClick={() => deleteClickIcon(item.id)}
                      style={{color: currentColor}}
                    />
                    <Link to={`/jobs/${item.id}`}>
                      <VisibilityOutlined style={{color: currentColor}} className="mx-3" />
                    </Link>
                    <Edit style={{color: currentColor}} className="cursor-pointer" onClick={() => {setModalEditId(item.id) 
                    setIsModalEditJobOpen(true)}}/>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {isModalAddJobOpen ? <AddJobModal open={isModalAddJobOpen} onClose={onClose} /> : <></>}
        {isModalEditJobOpen ? <EditJobModal open={isModalEditJobOpen} onClose={onClose} id={modalEditId} /> : <></>}
        <div className="flex items-center justify-between">
          <p className='mx-5'>{numberChecked} rows selected</p>
          <TablePagination
            component="div"
            count={jobsResponseData.length}
            page={currentPage}
            onPageChange={handleChangePage}
            rowsPerPage={perPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
    </ContentWrapper>
  );
};