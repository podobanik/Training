import SelectUser from '../SelectUser/SelectUser';
import styles from './Header.module.css'

function Header() {

	return (
		<>
      <h1 className={styles['logo']}>Заметки</h1>
			<SelectUser />
		</>
	);
}

export default Header;