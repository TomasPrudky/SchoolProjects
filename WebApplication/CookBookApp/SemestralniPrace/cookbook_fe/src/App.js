import './App.css';
import PrimarySerachAppBar from './components/PrimarySearchAppBar'
import Profile from './components/Profile.js'
import RecipesPage from './components/RecipesPage'
import AddRecipe from './components/AddRecipe';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RecipeDetail from './components/RecipeDetail';
import WrongAddress from './components/alert/WrongAddress';
import { Fullscreen } from '@mui/icons-material';
import Ingredients from './components/Ingredients';
import Categories from './components/Categories';
import { useState } from 'react';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import PrivateAdminRoute from './PrivateRoute/PrivateAdminRoute';

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value);
  }

  return (
    <div>
      <PrimarySerachAppBar onSearch={handleSearch}/>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/recipe/:id" element={<RecipeDetail/>} />
          <Route path='/addRecipe' element={<PrivateRoute><AddRecipe /></PrivateRoute>}/>
          <Route path='/addRecipe/:id' element={<PrivateRoute><AddRecipe/></PrivateRoute>}/>
          <Route path='/ingredients' element={<PrivateAdminRoute><Ingredients /></PrivateAdminRoute>} />
          <Route path='/categories' element={<PrivateAdminRoute><Categories /></PrivateAdminRoute>} />
          <Route path="/" element={<RecipesPage searchTerm={searchTerm}/>} />
          <Route path="*" element={<WrongAddress/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
