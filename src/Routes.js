import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import App from './App';

function Routes(){
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/App"/>
                </Route>
                <Route path="/App" component={App}/>
            </Switch>
        </Router>
    );
}
export default Routes;