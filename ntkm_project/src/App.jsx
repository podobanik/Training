import styles from './App.module.css';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import ModalForm from './components/ModalForm/ModalForm';
import { useState } from 'react';
import {Container, Row, Col} from "reactstrap";

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
    <Container className={styles['app']} style={{marginTop: "20px"}}>
      <Row>
        <Col>
          <LeftPanel>
            <Header/>
            <ModalForm
              create={true}
              newJournal={true}
              onSubmit={addItem}
            />
            <JournalList items={items}/>
          </LeftPanel>
        </Col>
      </Row>
      <Row>
        <Col>
          <Body>
             Body
          </Body> 
        </Col>
      </Row>
    </Container>
  );
}

export default App;
