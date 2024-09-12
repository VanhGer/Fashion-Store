import { Link } from 'react-router-dom'

import '../../styles/Footer.scss'

const Footer = () => {
    return (
      <footer className='footer'>
        <div className="footer_container">
            <div className="footer_about">
                <Link to="/"><h2>Boo2nd</h2></Link>
                <p>
                BOO (Bò Sữa) là thương hiệu thời trang nổi tiếng được giới trẻ Việt Nam ưa thích, bởi sản phẩm không đơn thuần đẹp, 
                phong cách mà còn phần nào thể hiện được tinh thần của thanh niên Việt Nam.
                </p>
            </div>
            <div className="footer_categories">
                <h2>Categories</h2>
                <div>
                    <Link to="/gender/unisex">Unisex</Link>
                    <Link to="/gender/for-women">For Women</Link>
                    <Link to="/gender/for-men">For Men</Link>
                    <Link to="/category/shirts">Shirts</Link>
                    <Link to="/category/gym">Gym</Link>
                    <Link to="/category/jackets-and-hoodies">Jackets and Hoodies</Link>
                </div>
            </div>

            <div className="footer_customer_care">
                <h2>Customer Care</h2>
                <div className="customer_care_links">
                    <Link to="/">Return Policy</Link>
                    <Link to="/">Lodge A Compliant</Link>
                    <Link to="/">Track Your Order</Link>
                    <Link to="/">How To Buy</Link>
                    <Link to="/">Terms and Conditions</Link>
                </div>
            </div>

            <div className="footer_contact">
                <h2>Contact Us</h2>
                <div className="footer_contact_methods">
                    <div className="contact_method">
                        <span>A.</span>
                        <p>19A Đặng Trần Côn, P.Quốc Tử Giám, Q.Đống Đa, Tp.Hà Nội, Việt Nam.</p>
                    </div>
                    <div className="contact_method">
                        <span>E.</span>
                        <p><a href="mailto:online@boo.vn">online@boo.vn</a></p>
                    </div>
                    <div className="contact_method">
                        <span>T.</span>
                        <p><a href="tel:+84936303632">+84093 630 36 32</a></p>
                    </div>
                </div>
            </div>
        </div>
      </footer>
    )
}

export default Footer;
