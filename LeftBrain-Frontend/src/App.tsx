import { DashBoard } from "./pages/DashBoard"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { BrowserRouter, Routes , Route} from "react-router-dom"
import { Tweets } from "./pages/Tweets"
import { YouTube } from "./pages/Youtube"
import { Document } from "./pages/Document"

function App() {
  return  <BrowserRouter>
      <Routes>
           <Route path="/signup" element={<Signup/>} />
           <Route path="/" element={<Signin/>} />
           <Route path="/dashboard" element={<DashBoard/>} />
           <Route path="/twitter" element={<Tweets/>} />
           <Route path="/youtube" element={<YouTube/>} />
           <Route path="/document" element={<Document/>} />
      </Routes>
  </BrowserRouter>
}


export default App
