import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'

import { getProductDetails } from '../redux/actions/productActions'
import { addToCart, updateQty } from '../redux/actions/cartActions'

// Components
import Ratings from '../components/Products/Ratings'
import ProductCard from '../components/Products/ProductCard'
import ProductCarousel from '../components/Products/ProductCarousel'
import ProductTypeSelect from '../components/Products/ProductTypeSelect'

import "../styles/ProductPage.scss"



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        className="tab_panel"
        {...other}
      >
        {value === index && (
          <div className="tab_panel_container">
            {children}
          </div>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}




const ProductPage = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const alert = useAlert()

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const { productDetails, loading, error } = useSelector(state => state.productDetails)
    const { cartItems } = useSelector((state) => state.cart)
    let { product, brandProducts, categoryProducts } = productDetails

    if (brandProducts) {
        brandProducts = brandProducts.filter((item) => item._id !== product._id)
        categoryProducts = categoryProducts.filter((item) => item._id !== product._id)
    }


    var productListDetails = []

    if (product?.details) {
        productListDetails = product.details.split(".")
    }

    // Check if item is already in cart and do the needful
    const addedItems = cartItems.filter((item) => item.product === id)
    var reducedAddedItems = addedItems.reduce((count, item) => item.qty + count, 0)

    const disable = {
        backgroundColor: "gray",
        pointerEvents: "none"
    }


    const [showVariation, setShowVariation] = useState(false)

    const closeVariation = () => setShowVariation(false)
    const displayVariation = () => setShowVariation(true)

    const handleCart = (id, qty, size, count) => {
        dispatch(addToCart(id, qty, size, count))
        alert.show(`${product.name} added to cart successfully`)
    }

    const handleQty = (item, size, unit) => {
        dispatch(updateQty(item, size, unit))
    }

    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [id, dispatch])

    if(loading) {
        return <div className='loading'>Loading...</div>
    }

    if (error) {
        return <div className="loading">{error}</div>
    }

    return (
        <main className="product_page">
            <div className="product_page_container">
                <div className="product_basic_info">
                        <div className="product_images">
                            {product?.images && <ProductCarousel images={product?.images} title={product?.name} />}
                        </div>
                        <div className="product_title">
                            <h1 className="product_name">{product?.name}</h1>
                            <div className='product_title_double'><h4>Brand:</h4> <h2>{product?.brand}</h2></div>
                            <div className='product_title_double'><h4>Ratings:</h4> <Ratings value={product?.ratings} /></div>
                            <h2 className='price'>₦{product?.price}</h2>

                            <div className="sizes">
                                <h3>Please select a variation</h3>
                                <div className="sizes_buttons">
                                    {
                                        product?.sizes.map((currentSize) => (
                                            <button 
                                                key={currentSize.name}
                                                style={
                                                    currentSize.count < 1 ? disable : null
                                                }
                                                onClick={displayVariation}

                                            >{currentSize.name}</button>
                                        ))
                                    }
                                </div>
                            </div>
                            
                            {addedItems.length > 0 && 
                                <div className="type_item_btns">
                                    <div>
                                        <button className='type_item_btn' onClick={displayVariation}>-</button>
                                        <p>{reducedAddedItems}</p>
                                        <button className='type_item_btn' onClick={displayVariation}>+</button>
                                    </div>
                                </div>
                            }

                            {addedItems.length === 0 && <button className="show_variations_btn" onClick={displayVariation}>Add to Cart <ShoppingCartOutlinedIcon /></button>}

                            {showVariation && <ProductTypeSelect 
                                data={product?.sizes} 
                                cartItems={addedItems}
                                item={product} 
                                handleCart={handleCart} 
                                updateQty={handleQty} 
                                close={closeVariation}
                            />}
                        </div>
                </div>

                <div className="product_info">
                        <div className="product_info_tabs">
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="product details tabs">
                                        <Tab label="Product Details" {...a11yProps(0)} />
                                        <Tab label="Product Review" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={tabValue} index={0}>
                                    <div className="product_description">
                                        <p>{product?.description}</p>
                                    </div>
                                    {product?.details && (
                                        <div className="product_details">
                                            {product.details.map((detail, i) => (
                                                <li key={i}>{detail}</li>
                                            ))}
                                        </div>
                                    )}
                                </TabPanel>
                                <TabPanel value={tabValue} index={1}>
                                    Product Reviews
                                </TabPanel>
                            </Box>
                        </div>
                </div>
                {brandProducts?.length > 0 && 
                    (
                        <div className="related_items">
                            <h2>More from {product?.brand}</h2>
                            <div className="related_items_grid">
                                {brandProducts.map((product) => (<ProductCard key={product._id} product={product} />))}
                            </div>
                        </div>
                    )
                }
                {categoryProducts?.length > 0 && 
                    (
                        <div className="related_items">
                            <h2>Related Items</h2>
                            <div className="related_items_grid">
                                {categoryProducts.map((product) => (<ProductCard key={product._id} product={product} />))}
                            </div>
                        </div>
                    )
                }
            </div>
        </main>
    )
}



export default ProductPage