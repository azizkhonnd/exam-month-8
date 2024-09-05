import RouteController from "./routes"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"

function App() {
  return (
    <>
      <Navbar />
      <RouteController />
      <Footer />
    </>
  )
}

export default App