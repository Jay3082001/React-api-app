import './App.css';
import './Globle.scss'
import AppRouter from './AppRouter';
import { AccessModeProvider } from './helper/AccessModeContext';

function App() {
  return (
    <AccessModeProvider>
      <AppRouter/>
    </AccessModeProvider>
  );
}

export default App; 
