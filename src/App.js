// import logo from './logo.svg';
import './App.css';
import AddNote from './components/AddNote';
function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          <code>React Notes App for Playbook (Please hire me!!)</code>
        </p>
      </header>
      <br />
      <AddNote />
    </div>
  );
}

export default App;
