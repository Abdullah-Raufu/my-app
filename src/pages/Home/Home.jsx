import React from "react"
import "./Home.css"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import Backgroundimg from '../../assets/images/Backgroundimg.jpg'
import playicon from '../../assets/icons/playicon.png'
import infoicon from '../../assets/icons/infoicon.png'
import TitleCard from "../../components/TitleCards/TitleCard"

const Home = () => {
  return (
    <div className='home'>
        <Navbar/>
        <div className="hero">
          <img src={Backgroundimg} alt="hero" height={500} width={400} className="banner-img" />
          <div className="hero-caption">
            <h1>Welcome to Arabic Made Simple <br/>
              ...for the Non-speakers</h1>
              <p>Discover the beauty of the Arabic language with our comprehensive courses and resources.
              Whether you're a beginner or looking to enhance your skills, we have something for everyone.
              Join our community and start your journey to fluency today !
              </p>

              <div className="hero-btns">
                <button className='btn'><img src={playicon} alt="" />Play Video</button>
                <button className='btn dark-btn' alt=""><img src={infoicon} alt="" />More Videos</button>
              </div>
        <TitleCard/>
          </div>
    </div>
    <div className="more-cards">
      <TitleCard title={"Grammar"}/>
      <TitleCard title={"Semantics"}/>
      <TitleCard title={"Upcoming..."}/>
      <TitleCard title={"Top picks for you"}/>
    </div>
    <Footer/>
    </div>
  )
}

export default Home
