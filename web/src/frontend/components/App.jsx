import '../Styles/App.css'
import Hero from "./Hero.jsx";
import Hub from "./Hub.jsx";
import AboutUs from "./AboutUs.jsx";
import BubbleBG from "./BubbleBG.jsx";

function App() {

  return (
    <>
        {/* Background global contínuo */}
        <BubbleBG />
        
        {/* Conteúdo das seções */}
        <Hero />
        <Hub />
        <AboutUs />
    </>
  )
}

export default App
