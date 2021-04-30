import React from 'react';
import './Welcome.css';

export default class App extends React.Component {
  render() {
    return (
      <>
        <header className="header">
          <h1 className="header-title">Faktury</h1>
        </header>
        <main>
          <div className="center-box">
            <div>
              <h2>Lorem, ipsum dolor.</h2>
              <p style={{ maxWidth: "60ch", marginBottom: "1.5em" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi saepe deserunt ipsa laudantium obcaecati voluptatum dolorem ipsam voluptatibus reprehenderit harum, dolorum cum ex asperiores.</p>
              <button className="button bg-primary color-white bold">Załóż konto</button>
              <button className="button bg-secoundary">Zaloguj</button>
            </div>
          </div>
        </main>
      </>
    );
  }
}
