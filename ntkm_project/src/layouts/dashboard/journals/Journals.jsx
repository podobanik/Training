import './Journals.css';
import Header from '../../../components/JournalApp/Header/Header.jsx';
import JournalAddButton from '../../../components/JournalApp/JournalAddButton/JournalAddButton.jsx';
import JournalForm from '../../../components/JournalApp/JournalForm/JournalForm.jsx';
import JournalList from '../../../components/JournalApp/JournalList/JournalList.jsx';
import Body from './Body/Body.jsx';
import LeftPanel from './LeftPanel/LeftPanel.jsx';
import { useState } from 'react';
import { getJournals } from '../../../actions/journal.js';
import { useValue } from '../../../context/ContextProvider.jsx';
import { addJournalItem } from '../../../actions/journal.js';
import { removeJournalItem } from '../../../actions/journal.js';
import { getFolders } from '../../../actions/folder.js';


const Journals = ({ setSelectedLink, link }) => {
	
	const {
    state: { journals, currentUser},
    dispatch,
  	} = useValue();

	const [selectedItem, setSelectedItem] = useState(null);

	useEffect(() => {
    setSelectedLink(link);
    if (journals.length === 0 && currentUser) getJournals(dispatch, currentUser);
	if (folders.length === 0 && currentUser) getFolders(dispatch, currentUser);
  	}, []);

	return (
        <div className='app'>
          <LeftPanel>
            <Header/>
            <JournalAddButton clearForm={() => setSelectedItem(null)}/>
            <JournalList setSelectedItem={setSelectedItem} />
          </LeftPanel>
          <Body>
            <JournalForm onSubmit={addJournalItem} onDelete={removeJournalItem} data={selectedItem}/>
          </Body>
        </div>
	);
}

export default Journals;
