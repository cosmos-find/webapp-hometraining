import MainPanel from '../views/MainPanel';
import ContentPanel from '../views/ContentPanel';

import './attachErrorHandler';

// react-router
import React from "react";
import { HashRouter, Routes, Route } from 'react-router-dom';

const App = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<MainPanel/>}></Route>
				<Route path="content/:id" element={<ContentPanel/>}></Route>
			</Routes>
		</HashRouter>
	);
}

export default App;