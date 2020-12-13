import { types } from "../types/types"

export const setError = (err) => ({
    type: types.uisetError,
    payload: err
})

export const removeError = () => ({
    type: types.uiRemoveError,
})

export const startLoading = () => ({
    type: types.uiStartLoading
})

export const finishLoading = () => ({
    type: types.uiFinishLoading
})
