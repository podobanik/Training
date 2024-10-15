import { useContext } from 'react';
import styles from './SelectTag.module.css';
import { TagContext } from '../../context/tag.context';
import { Button, ButtonGroup } from 'reactstrap';

function SelectTag() {
	const { tagId, setTagId } = useContext(TagContext);

    const [rSelected, setRSelected] = useState(null);

	const changeTag = (e) => {
		setTagId(Number(e.target.value));
	};
	
	return (
		<>
        <select className={styles['select']} name="user" id="user" value={userId} onChange={changeUser}>
			<option value="1">Антон</option>
			<option value="2">Вася</option>
		</select>
        <ButtonGroup>
        <Button
          outline
          onClick={() => setRSelected(1)}
          active={rSelected === 1}
        >
          Radio 1
        </Button>
        <Button
          outline
          onClick={() => setRSelected(2)}
          active={rSelected === 2}
        >
          Radio 2
        </Button>
        <Button
          outline
          onClick={() => setRSelected(3)}
          active={rSelected === 3}
        >
          Radio 3
        </Button>
      </ButtonGroup>
      </>
	);
}

export default SelectTag;