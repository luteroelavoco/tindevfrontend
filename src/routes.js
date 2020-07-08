import React from "react";
import {HashRouter, Route} from "react-router-dom";
import Login from "./pages/login";
import Main from "./pages/main"
export default function Routes(){
    return(
        <HashRouter>
            <Route exact path="/" component={Login} />
            <Route path="/devs/:id" component={Main} />
        </HashRouter>
    )
}
