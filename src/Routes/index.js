import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import FirstComponent from "../components/LoginComponent/FirstComponent";
import ThirdComponent from "../components/AdmComponent/ThirdComponent";
import SecondComponent from "../components/InfoComponent/SecondComponent";

import { PrivateRoute } from "./privateRoute";

export function Rotas(){
    
    return(
        <Router>
            <Routes>
                <Route path="/" element={<FirstComponent/> } />
                
                <Route path="/info" element={<SecondComponent />} />

                <Route path="/adm" element={<PrivateRoute><ThirdComponent /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}
