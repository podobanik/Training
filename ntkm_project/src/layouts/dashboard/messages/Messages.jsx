import { useEffect } from 'react';

const Messages = ({ setSelectedLink, link }) => {
  useEffect(() => {
    setSelectedLink(link);
  }, []);
  return <div>Сообщения</div>;
};

export default Messages;
