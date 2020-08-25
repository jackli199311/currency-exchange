import { combineReducers } from 'redux'
import { dataReducer, settingsReducer } from './exchange-rates'

export default combineReducers({
    dataReducer,
    settingsReducer
})

export interface SettingsState {
    sourceCurrency: string,
    currencyList: string[],
    updateFrequency: number,
    isNew: boolean
}

export interface DisplayState {
    currentRates: {},
    historyRates: {}
}