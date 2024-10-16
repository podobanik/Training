import BottomNav from '../components/TaskApp/BottomNav.jsx';
import NavBar from '../components/TaskApp/NavBar.jsx';
import Login from '../components/TaskApp/user/Login.jsx';

const Home = () => {
  return (
    <>
      <Login />
      <NavBar />
      <BottomNav />
    </>
  );
};

export default Home;
