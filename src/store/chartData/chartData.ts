import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import chartDataJson from "./chartData.json"
export interface ChartsDataState {
  data: ChartDataType
}

const initialState: ChartsDataState = {
  data: chartDataJson,
}

export const chartsDataSlice = createSlice({
  name: "@@CHART_DATA",
  initialState,
  reducers: {
    updateChartsData: (state, action: PayloadAction<ChartDataType>) => {
      state.data = action.payload
    },
  },
})

export const { updateChartsData } = chartsDataSlice.actions

export default chartsDataSlice.reducer
