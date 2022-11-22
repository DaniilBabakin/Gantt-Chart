declare global {
  export type Nullable<T> = T | null

  export type Keys<T extends Record<string, unknown>> = keyof T
  export type Values<T extends Record<string, unknown>> = T[Keys<T>]

  export type ChartDataType = {
    project:string
    period:string
    chart:ChartType
  }

  export type ChartType = {
    id: number
    title: string
    period_start: string
    period_end: string
    sub?: ChartType[]
  }

  type DispatchStateHandler<TAction> = (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: TAction
  ) => Promise<void>
  
  module "*.png"
  module "*.svg"
  module "*.jpeg"
  module "*.jpg"
}
export {}
