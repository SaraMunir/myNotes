import './App.css';
import Notes from './components/Notes'
function App() {
  return (
    <div className="App">
      <div className="myHeader">
        <h1> <span className="myHeaderSpecial2">MY</span><span className="myHeaderSpecial">NOTES</span></h1>
      </div>
      <Notes/>

      
    </div>
  );
}

export default App;
