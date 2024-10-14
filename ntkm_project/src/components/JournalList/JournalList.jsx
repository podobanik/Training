import './JournalList.css'
import JournalItem from '../JournalItem/JournalItem';
import CardButton from '../CardButton/CardButton';

function JournalList( { items } ) {
    if (items.length === 0) {
        return <p>Заметок пока нет</p>
    }
    const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
    };
  
  return (
    <>
        {items.sort(sortItems).map(el => (
            <CardButton key={el.id}>
              <JournalItem
                title={el.title}
                post={el.post}
                date={el.date}
              />
            </CardButton>
          ))}
    </>
  );
}

export default JournalList;