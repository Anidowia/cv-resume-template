import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Inner from "./pages/Inner/Inner";

import styles from "./App.scss";

function App() {
	return (
		<div className={styles["App"]}>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<Inner />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
