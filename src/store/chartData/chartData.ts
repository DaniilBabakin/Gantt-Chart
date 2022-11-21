import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import chartDataJson from "./chartData.json"
export interface ChartsDataState {
  data: ChartDataType
  chartBody: any[]
}

const initialState: ChartsDataState = {
  data: chartDataJson,
  chartBody: [],
}

export const chartsDataSlice = createSlice({
  name: "@@CHART_DATA",
  initialState,
  reducers: {
    updateChartsData: (state, action: PayloadAction<ChartDataType>) => {
      state.data = action.payload
    },
    updateChartBody: (state, action: PayloadAction<any>) => {
      state.chartBody = action.payload
    },
  },
})

export const { updateChartsData, updateChartBody } = chartsDataSlice.actions

export default chartsDataSlice.reducer
