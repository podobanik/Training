import NavBar from '../components/UserApp/NavBar.jsx';
import Login from '../components/UserApp/user/Login.jsx';
import Notification from '../components/UserApp/Notification.jsx';

const Home = () => {
  return (
    <>
      <Login />
      <NavBar />
      <Notification />
    </>
  );
};

export default Home;
