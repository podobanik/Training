import './App.css';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Header from './components/Header/Header';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import { useState } from 'react';

const data = [
      {
        title: 'Тест2',
        post: 'Тестовое сообщение2',
        date: new Date(),
        id:1
      },
      {
        title: 'Тест3',
        post: 'Тестовое сообщение3',
        date: new Date(),
        id:2
      },
      {
        title: 'Тест4',
        post: 'Тестовое сообщение4',
        date: new Date(),
        id:3
      },
];

function App() {
  const [items, setItems] = useState(data)

  const addItem = item => {
    setItems(oldItems => [...oldItems, {
      post:item.post,
      title: item.title,
      date: new Date(item.date),
      id: oldItems.length >0 ? Math.max(...oldItems.map(i => i.id)) + 1 : 1
    }])
  };

  return (
    <div className='app'>
      <LeftPanel>
        <Header/>
        <JournalAddButton/>
        <JournalList items={items}/>
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem}/>
      </Body>  
    </div>
  );
}

export default App;
