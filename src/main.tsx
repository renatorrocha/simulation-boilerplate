import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./global.css";
import SimulationForm from "./simulation-form";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<SimulationForm />
	</StrictMode>,
);
