import { React } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
const VotingApp = () => {
	return (
		<Router>
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/result" element={<Result />} />
				</Routes>
			</div>
		</Router>
	);
};

render(<VotingApp />, document.querySelector('#root'));
