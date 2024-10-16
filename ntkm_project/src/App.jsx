import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './layouts/dashboard/Dashboard.jsx';
import Home from './layouts/Home.jsx';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
