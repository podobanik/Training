import { useEffect } from 'react';

const Requests = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link);
  }, []);
  return <div>Запросы</div>;
};

export default Requests;
