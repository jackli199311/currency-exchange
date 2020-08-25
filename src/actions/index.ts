import * as consts from '../actions/consts';

export function updateCurrentRate(newMessage: any) {
    return {
      type: consts.UPDATE_CURRENT_RATE_ACTION,
      payload: newMessage
    }
}

export function updateHistoryData(newMessage: any) {
    return {
      type: consts.UPDATE_HISTORY_DATA_ACTION,
      payload: newMessage
    }
}

export function updateRefreshRate(newMessage: any) {
    return {
      type: consts.UPDATE_REFRESH_RATE_ACTION,
      payload: newMessage
    }
}

export function updateSourceCurrency(newMessage: any) {
    return {
      type: consts.UPDATE_SOURCE_CURRENCY_ACTION,
      payload: newMessage
    }
}

export function addToCurrentList(newMessage: any) {
    return {
      type: consts.ADD_TO_CURRENT_LIST_ACTION,
      payload: newMessage
    }
}

export function removeFromCurrentList(newMessage: any) {
    return {
      type: consts.REMOVE_FROM_CURRENCY_LIST_ACTION,
      payload: newMessage
    }
}

export function resultsUpdated() {
    return {
      type: consts.RESULTS_UPDATED_ACTION
    }
}


