import './App.css';
import Button from './components/Button/Button';
import CardButton from './components/CardButton/CardButton';
import JournalItem from './components/JournalItem/JournalItem';

function App() {
    const data = [
      {
        title: 'Тест2',
        text: 'Тестовое сообщение2',
        date: new Date()
      },
      {
        title: 'Тест3',
        text: 'Тестовое сообщение3',
        date: new Date()
      },
      {
        title: 'Тест4',
        text: 'Тестовое сообщение4',
        date: new Date()
      },
    ]

  return (
    <>
      <Button/>
      <CardButton>
        <JournalItem
        title={data[0].title}
        text={data[0].text}
        date={data[0].date}
        />
      </CardButton>
      <JournalItem
        title={data[1].title}
        text={data[1].text}
        date={data[1].date}
      />
    </>
  );
}

export default App;
