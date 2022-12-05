import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';


import { configure } from "axios-hooks";
import API from "./api/api";
import { Candidates } from 'pages/Candidates';
import JobsDetails from 'pages/JobsDetails';
import CandidatesDetails from 'pages/CandidatesDetails';
import SignIn from 'components/Forms/SignIn';
import { AuthStateContext } from 'contexts/ContextAuth';
import AccessToken from 'pages/AccessToken';
import ProtectedRoutes from 'components/ProtectedRoutes';
import SignUp from 'components/Forms/SignUp';
import Reset from 'components/Forms/Reset';
import { Ecommerce } from 'pages/Ecommerce';
import { Orders } from 'pages/Orders';
import { Customers } from 'pages/Customers';
import { Jobs } from 'pages/Jobs';
import { Kanban } from 'pages/Kanban';
import { Editor } from 'pages/Editor';
import { Calendar } from 'pages/Calendar';
import { ColorPicker } from 'pages/ColorPicker';
import { Line } from 'pages/Charts/Line';
import { Area } from 'pages/Charts/Area';
import { Bar } from 'pages/Charts/Bar';
import { Pie } from 'pages/Charts/Pie';
import { Financial } from 'pages/Charts/Financial';
import { ColorMapping } from 'pages/Charts/ColorMapping';
import { Pyramid } from 'pages/Charts/Pyramid';
import { Employees } from 'pages/Employees';
import { Stacked } from 'components/Charts/Stacked';

configure({ axios: API });


const App = () => {


  return (
    <>
      <BrowserRouter>
              <AuthStateContext.Provider value={localStorage.getItem("token")}>
              <Routes>

                {/* Login Forms */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/reset" element={<Reset />} />


              {/* Protected Routes */}
              <Route element={<ProtectedRoutes />}>
                
                {/* dashboard  */}
                <Route path="/" element={(<Ecommerce />)} />
                <Route path="/ecommerce" element={(<Ecommerce />)} />

                {/* pages  */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:jobId" element={<JobsDetails />} />
                <Route path="/candidates" element={<Candidates />} />
                <Route path="/candidates/:candidateId" element={<CandidatesDetails />} />

                {/* apps  */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* charts  */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked width={''} height={''} currentMode={''} />} />

                {/* Accesstoken */}
                <Route path="/accesstoken" element={<AccessToken />} />
              </Route>

              </Routes>
            </AuthStateContext.Provider>
            {/* </div> */}
          {/* </div>
        </div> */}
      </BrowserRouter>
  {/* </div> */}
    </>
    );
};

export default App;
