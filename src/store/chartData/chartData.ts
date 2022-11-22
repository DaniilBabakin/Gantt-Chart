import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import chartDataJson from "./chartData.json"

export type ChartsBodyType = {
  endDate: string
  nestedLvl: number
  startDate: string
  title: string
}

export type ChartsDataState = {
  data: ChartDataType
  chartBody: ChartsBodyType[]
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
    updateChartBody: (state, action: PayloadAction<ChartsBodyType[]>) => {
      state.chartBody = action.payload
    },
  },
})

export const { updateChartsData, updateChartBody } = chartsDataSlice.actions

export default chartsDataSlice.reducer
