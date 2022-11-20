import { useTypedSelector } from "store"
import DownloadLogo from "../../assets/Download.png"
import "./header.scss"

export const Header = () => {
  const chartsData = useTypedSelector((state) => state.chartsData.data)

  return (
    <header className="header">
      <h1 className="header__title">
        {chartsData.project} / {chartsData.period}
      </h1>
      <button className="header__button">
        <img alt="Download logo" src={DownloadLogo} className="main__header__button__image" />
        Export
      </button>
    </header>
  )
}
