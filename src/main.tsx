
import ReactDOM, { createRoot, hydrateRoot } from 'react-dom/client';
import './styles/tailwind.css';
import App from './App';

// Ensure that the container element exists before calling createRoot
const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
} else {
    console.error("Container element with id 'app' not found in the document.");
}
