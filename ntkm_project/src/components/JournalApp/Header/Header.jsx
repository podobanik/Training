import SelectUser from '../SelectUser/SelectUser';
import SelectTag from '../SelectTag/SelectTag';
import styles from './Header.module.css'

function Header() {

	return (
		<>
      <h1 className={styles['logo']}>Заметки</h1>
			<SelectUser />
      <SelectTag />
		</>
	);
}

export default Header;