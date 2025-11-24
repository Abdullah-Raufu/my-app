import React from 'react'
import "./Footer.css"
import facebookIcon from "../../assets/icons/facebookIcon.png"
import Xicon from "../../assets/icons/XIcon.png"
import instagramicon from "../../assets/icons/instagramIcon.png"
import youtubeicon from "../../assets/icons/youtubeIcon.png"

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-icons'>
            <img src= {facebookIcon} alt=''/>
            <img src= {Xicon} alt=''/>
            <img src= {instagramicon} alt=''/>
            <img src= {youtubeicon} alt=''/>
        </div>

        <ul>
            <li>Video description</li>
            <li> Help Centre </li>
            <li> Gift Cards</li>
            <li> Media centre</li>
            <li> Investor Relations</li>
            <li> Jobs </li>
            <li> Privacy </li>
            <li> Legal Notices </li>
            <li> Cookie Preferences</li>
            <li> Corporate Information </li>
            <li> Contact Us</li>
            <li> Speed Test </li>
            <li> Only on My App </li>
        </ul>

        <p className='copyright-text'> @2025 My App <br/> <br/> Powered by AB DOLAR Ltd.</p>
      
    </div>
  )
}

export default Footer