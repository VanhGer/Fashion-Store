import React from 'react'
import { Link } from 'react-router-dom'

import '../../styles/Jumbotron.scss'

const Jumbotron = () => {
    return (
        <section className="jumbotron">
            <div className="jumbo_container">
                <div className="jumbo_grid">
                    <div className="jumbo_grid_item jumbo_dresses">
                        <div className="jumbo_img jumbo_dresses_img">
                            <img src="https://res.cloudinary.com/hopetomiwa/image/upload/v1643146074/Store/Gown_black_remove_qghjoh.png" alt="Slim patterned party gown" />
                        </div>
                        <div className="jumbo_info jumbo_dresses_info">
                        <h2>Váy Secondhand</h2>
                        <h1><span>Thời Trang Cao Cấp</span></h1>
                        <p>Chúng tôi chuyên cung cấp các loại váy dự tiệc, chân váy, áo, vest và jumpsuit nữ đã qua sử dụng với chất lượng tốt. 
                            Cam kết mang đến sản phẩm chất lượng tốt với mức giá hợp lý.</p>
                        <Link to="/category/dresses">Mua Ngay</Link>
                        </div>
                    </div>
                    <div className="jumbo_grid_item jumbo_sneakers">
                        <div className="jumbo_img jumbo_sneakers_img">
                            <img src="https://res.cloudinary.com/hopetomiwa/image/upload/v1643146075/Store/jordan-ma2-remove_wuxkkc.png" alt="Jordan's MA2" />
                        </div>
                        <div className="jumbo_info jumbo_sneakers_info">
                        <h2>Giày Thể Thao Secondhand</h2>
                            <h1><span>Thoải Mái</span></h1>
                            <p>Phá vỡ chuẩn mực với đôi giày chất lượng tốt và giá cả phải chăng. Được làm từ sự kết hợp giữa nhiều loại vải khác nhau.</p>
                            <Link to="/category/sneakers">Mua Ngay</Link>
                        </div>
                    </div>
                    <div className="jumbo_grid_item jumbo_shirts">
                        <div className="jumbo_img jumbo_shirts_img">
                            <img src="https://res.cloudinary.com/hopetomiwa/image/upload/v1643140972/Store/Vintage-removebg_p4bwdv.png" alt="Vintage Shirt" />
                        </div>
                        <div className="jumbo_info jumbo_shirts_info">
                        <h2>Áo Secondhand</h2>
    <h1><span>Phong Cách</span></h1>
    <p>Bạn là một tín đồ thời trang? Bạn thích tạo dấu ấn riêng? Đừng lo lắng, chiếc áo này có tất cả những gì bạn cần và hơn thế nữa.</p>
    <Link to="/category/shirts">Mua Ngay</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Jumbotron;
