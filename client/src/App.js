import './App.css';
import Posts from './components/Posts';
import Header from './components/Header';
import { Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage'
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './Context/UserContext';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';

function App() {
  return (
    <>
    <UserContextProvider>
    <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage /> } />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPost />} />

        </Route>
      </Routes>
    </UserContextProvider>
     

    </>
  );
}

export default App;
