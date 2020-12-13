import { firebase, googleAuthProvider } from '../firebase/firebase-config'
import { types } from "../types/types"
import { startLoading, finishLoading } from './ui'

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading())
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                console.log(user)
                dispatch(
                    login(user.uid, user.displayName)
                )
                dispatch(finishLoading())
            })
            .catch(e => {
                console.log(e)
                dispatch(finishLoading())
            })

        // setTimeout(() => {
        //     dispatch(finishLoading())
        // }, 3500)
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name })
                console.log(user)
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch(e => {
                console.log(e)
            })
    }
}

export const startGoogleLogin = () => {
    return(dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                // console.log(user)
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut()
        dispatch(logout())
    }
}

export const logout = () => ({
    type: types.logout
})
