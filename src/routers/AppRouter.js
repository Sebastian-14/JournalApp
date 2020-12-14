import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { firebase,  } from '../firebase/firebase-config'
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch()

    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            // console.log(user)
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setIsLoggedIn(true)
                // const notes = await loadNotes(user.uid)
                dispatch(startLoadingNotes(user.uid))
            } else {
                setIsLoggedIn(false)
            }
            setChecking(false)
        })
    }, [dispatch])

    if (checking) {
        return (
            <h1>Espere...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={isLoggedIn}
                    />

                    <PrivateRoute
                        exact
                        path="/"
                        component={ JournalScreen }
                        isAuthenticated={ isLoggedIn }
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
