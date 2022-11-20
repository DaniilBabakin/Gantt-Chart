import { combineReducers } from "@reduxjs/toolkit"
import { chartsDataSlice } from "./chartData/chartData"

export const rootReducer = combineReducers({
  chartsData: chartsDataSlice.reducer,
})
