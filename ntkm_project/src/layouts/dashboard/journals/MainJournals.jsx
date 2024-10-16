import './MainJournals.css';
import Header from '../../../components/JournalApp/Header/Header.jsx';
import JournalAddButton from '../../../components/JournalApp/JournalAddButton/JournalAddButton.jsx';
import JournalForm from '../../../components/JournalApp/JournalForm/JournalForm.jsx';
import JournalList from '../../../components/JournalApp/JournalList/JournalList.jsx';
import Body from './Body/Body.jsx';
import LeftPanel from './LeftPanel/LeftPanel.jsx';
import { useLocalStorage } from '../../../hooks/use-localstorage.hook.js';
import { UserContextProvider } from '../../../context/user.context.jsx';
import { useState } from 'react';
import { TagContextProvider } from '../../../context/tag.context.jsx';

function mapItems(items) {
	if (!items) {
		return [];
	}
	return items.map(i => ({
		...i,
		date: new Date(i.date)
	}));
}

function MainJournals() {
	const [items, setItems] = useLocalStorage('data');
	const [selectedItem, setSelectedItem] = useState(null);
	console.log('App');

	const addItem = item => {
		if (!item.id) {
			setItems([...mapItems(items), {
				...item,
				date: new Date(item.date),
				id: items?.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
			}]);
		} else {
			setItems([...mapItems(items).map(i => {
				if (i.id === item.id) {
					return {
						...item
					};
				}
				return i;
			})]);
		}
	};

	const deleteItem = (id) => {
		setItems([...items.filter(i => i.id !== id)]);
	};

	return (
	<UserContextProvider>
      <TagContextProvider items = {items}>
        <div className='app'>
          <LeftPanel>
            <Header/>
            <JournalAddButton clearForm={() => setSelectedItem(null)}/>
            <JournalList items={mapItems(items)} setItem={setSelectedItem} />
          </LeftPanel>
          <Body>
            <JournalForm onSubmit={addItem} onDelete={deleteItem} data={selectedItem}/>
          </Body>
        </div>
      </TagContextProvider>
	</UserContextProvider>
	);
}

export default MainJournals;
