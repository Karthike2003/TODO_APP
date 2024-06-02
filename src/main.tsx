
import  { createRoot } from 'react-dom/client';
import './styles/tailwind.css';
import App from './App';
import AppContainer from './components/AppContainer';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <AppContainer>
            <App />
        </AppContainer>
    );
} else {
    console.error("Container element with id 'app' not found in the document.");
}
