import './App.css';
import Login from './comps/Login';
import { BrowseRouter as Router, Routes, Route } from 'react-router-dom';
import LoadCar from './comps/LoadCar';
import PrivateRoute from './PrivateRoute';
import Office from './comps/BranchOffice/Office';
import OfficeView from './comps/BranchOffice/OfficeView';
import Users from './comps/User/Users';
import User from './comps/User/User';
import Faults from './comps/Fault/Faults';
import Home from './comps/Home';
import Letgo from './comps/Letgo';
import NotFound from './comps/NotFound';
import NewInspection from './comps/Inspections/NewInspection';
import Profile from './comps/User/Profile';
import InspectionCar from './comps/Inspections/InspectionCar';
import Inepections from './comps/Inspections/Inepections';
import Wage from './comps/User/Wage';
import Inspection from './comps/Inspections/Inspection';

function App() {

  return (
    <Routes>
      <Route path="login" element={<Login/>} />
      <Route path="office" element={<Office/>}/>
      <Route path="car" element={<LoadCar/>} />
      <Route path="office/:id" element={<PrivateRoute><OfficeView/></PrivateRoute>}/>
      <Route path="user" element={<PrivateRoute><Users/></PrivateRoute>}/>
      <Route path='user/:id' element={<PrivateRoute><User/></PrivateRoute>}/>
      <Route path="faults" element={<PrivateRoute><Faults/></PrivateRoute>}/>
      <Route path="home" element={<PrivateRoute><Home/></PrivateRoute>}/>
      <Route path="letgo" element={<PrivateRoute><Letgo/></PrivateRoute>}/>
      <Route path="inspection" element={<PrivateRoute><NewInspection/></PrivateRoute>} />
      <Route path="profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
      <Route path="inspection/:spz" element={<PrivateRoute><InspectionCar/></PrivateRoute>}/>
      <Route path="inspections" element={<PrivateRoute><Inepections/></PrivateRoute>}/>
      <Route path="inspectionDetail/:id" element={<PrivateRoute><Inspection/></PrivateRoute>}/>
      <Route path='wage' element={<PrivateRoute><Wage/></PrivateRoute>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
