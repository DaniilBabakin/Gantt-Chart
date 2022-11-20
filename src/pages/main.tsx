import { Calendar } from "components/calendar/calendar"
import { Header } from "components/header/header"

import "./main.scss"
export const MainPage = () => {
  return (
    <main className="main">
      <Header />
      <Calendar />
    </main>
  )
}
