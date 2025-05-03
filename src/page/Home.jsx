import Banner from "../component/Banner"
import Header from "../component/Header"

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Banner />
    </div>
  )
}

export default Home