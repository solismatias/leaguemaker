import React from "react";
// libraries
import { BrowserRouter, Route, Routes } from "react-router-dom";
// pages
import { Footer } from "./components/Footer";
import { LeagueMaker } from "./pages/LeagueMaker";
import { Wellcome } from "./pages/Wellcome";
import { Login } from "./pages/Login";
// context
// import { HeroContext } from "./context/HeroContext";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/leaguemaker' element={<Wellcome />} />
          <Route path='/leaguemaker/login' element={<Login />} />
          {/* <HeroContext.Provider> */}
          <Route path='/leaguemaker/home' element={<LeagueMaker />} />
          {/* </HeroContext.Provider> */}
          <Route path='*' element={<Login />} />     {/* if we enter to an invalid URL we will be redirected to the login page  */}
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}


export { App };
