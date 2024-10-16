import { createContext, useEffect } from 'react';
import { useState } from 'react';

export const TagContext = createContext({
    tagName: 'Все записи'
});

export const TagContextProvider = ({ children, items }) => {
	const [tagName, setTagName] = useState('Все записи');

	return <TagContext.Provider value={{ tagName, setTagName, items }}>
		{children}
	</TagContext.Provider>;
};