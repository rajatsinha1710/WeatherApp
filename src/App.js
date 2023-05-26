import React from 'react';
import WeatherApp from './WeatherApp';

function App() {
  return (
    <div className="w-full h-screen relative bg-black/[.4] text-white before:content-[''] before:bg-sun-set  before:bg-no-repeat before:bg-center 
    before:bg-cover before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-[-1] overflow-y-hidden">
      <WeatherApp />
    </div>
  );
}

export default App;
