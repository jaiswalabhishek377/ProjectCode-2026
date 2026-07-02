import React from 'react'
import './footer.css'
const Footer = () => {
  return (
    <div>
        <footer>
            <div className="left">
                <p>Contact us at: info@mywebsite.com</p>
                <p>Follow us on social media!</p>
                <p>Xai</p>
            </div>
            <div className="right">
                <p>Fax: 123-456-7890</p>
                <p>Address: 123 Main St, Anytown USA</p>
            </div>
        </footer>
        <div className="bottom">
            <p>&copy; 2023 My Website. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer