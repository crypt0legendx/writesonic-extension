import { useEffect, useState } from 'react'
import Welcome from 'components/popup/Welcome'
import Navbar from 'components/popup/Navbar'
import Info from 'components/popup/Info'
import Footer from 'components/popup/Footer'
import Feedback from 'components/popup/Feedback'
import Share from 'components/popup/Share'

function Popup() {
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [activeSites, setActiveSites] = useState<string[]>([])
  const [activePage, setActivePage] = useState<number>(1)

  useEffect(() => {
    chrome.storage.local.get(
      ['isLogged', 'activeSites'],
      ({ isLogged, activeSites }) => {
        setIsLogged(isLogged)
        setActiveSites(activeSites)
        console.log(activeSites)

        if (!activeSites) {
          chrome.storage.local.set({ activeSites: [] })
          setActiveSites([])
        }
      }
    )
  }, [])

  return (
    <div>
      <Navbar />
      {!isLogged && <Welcome />}
      {isLogged && activePage === 1 && (
        <Info activeSites={activeSites} setActivePage={setActivePage} />
      )}
      {isLogged && activePage === 2 && <Feedback />}
      {isLogged && activePage === 3 && <Share />}
      {isLogged && <Footer />}
    </div>
  )
}

export default Popup
