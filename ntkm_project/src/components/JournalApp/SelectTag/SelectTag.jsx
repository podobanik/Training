import { useContext } from 'react';
import styles from './SelectTag.module.css';
import { TagContext } from '../../../context/tag.context.jsx';


function SelectTag() {
	const { tagName, setTagName, items } = useContext(TagContext);

	const changeTag = (e) => {
		setTagName(e.target.value);
	};
	
	return (
		<>
        <select className={styles['select-tag']} name="tag" id="tag" onChange={changeTag}>
			<option value={tagName}>Все категории</option>
            {items?.map((item) => (
                <option key={item.id} value={item.tag}>{item.tag}</option>
            ))}
		</select>
      </>
	);
}

export default SelectTag;