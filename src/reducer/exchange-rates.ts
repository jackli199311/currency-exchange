import {
    SettingsState,
    DisplayState
  } from './index';
import * as consts from '../actions/consts';

const initialSettingsState: SettingsState = {
    sourceCurrency: 'CNY',
    currencyList: ['USD', 'JPY'],
    updateFrequency: 1,
    isNew: true
}

const initialDisplayState: DisplayState = {
    currentRates: {},
    historyRates: {}
}
  
export function dataReducer (
    state = initialDisplayState,
    action: any
  ) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case consts.UPDATE_CURRENT_RATE_ACTION:
            newState.currentRates = action.payload;
            return newState;
        case consts.UPDATE_HISTORY_DATA_ACTION:
            newState.historyRates = action.payload;
            return newState;
        default:
            return state;
    }
}

export function settingsReducer(
    state = initialSettingsState,
    action: any
  ) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case consts.ADD_TO_CURRENT_LIST_ACTION:
            newState.currencyList = action.payload;
            newState.isNew = true;
            return newState;
        case consts.UPDATE_SOURCE_CURRENCY_ACTION:
            newState.sourceCurrency = action.payload;
            newState.isNew = true;
            return newState;
        case consts.UPDATE_REFRESH_RATE_ACTION:
            newState.updateFrequency = action.payload;
            newState.isNew = true;
            return newState;
        case consts.REMOVE_FROM_CURRENCY_LIST_ACTION:
            let filteredList = state.currencyList.filter(curr => curr !== action.payload);
            newState.currencyList = [...filteredList];
            newState.isNew = true;
            return newState;
        case consts.RESULTS_UPDATED_ACTION:
            newState.isNew = false;
            return newState;
        default: {
            return state;
        }
    }
}
