import * as actionTypes from "../constants/productConstants";

export const getProductsReducer = (state = { products: {} }, action) => {
    switch(action.type) {
        case actionTypes.GET_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: [],
            }
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            }
        case actionTypes.GET_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
};

export const getCategoryProductsReducer = (state = { categoryProducts: {} }, action) => {
    switch(action.type) {
        case actionTypes.GET_CATEGORY_PRODUCTS_REQUEST:
            return {
                loading: true,
                categoryProducts: [],
            }
        case actionTypes.GET_CATEGORY_PRODUCTS_SUCCESS:
            return {
                loading: false,
                categoryProducts: action.payload,
            }
        case actionTypes.GET_CATEGORY_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
};

export const getProductDetailsReducer = (state = {productDetails: {}}, action) => {
    switch(action.type) {
        case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                productDetails: {},
            }
        case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                productDetails: action.payload,
            }
        case actionTypes.GET_PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case actionTypes.GET_PRODUCT_DETAILS_RESET:
            return {
                productDetails: {},
            }
        default: {
            return state;
        }
    }
};


export const getTopProductsReducer = (state = { topProducts: [] }, action) => {
    switch(action.type) {
        case actionTypes.GET_TOP_PRODUCTS_REQUEST:
            return {
                loading: true,
                topProducts: [],
            }
        case actionTypes.GET_TOP_PRODUCTS_SUCCESS:
            return {
                loading: false,
                topProducts: action.payload,
            }
        case actionTypes.GET_TOP_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
};


export const addProductReviewReducer = (state = { }, action) => {
    switch(action.type) {
        case actionTypes.ADD_PRODUCT_REVIEW_REQUEST:
            return {
                loading: true,
            }
        case actionTypes.ADD_PRODUCT_REVIEW_SUCCESS:
            return {
                loading: false,
                success: true,
                review: action.payload,
            }
        case actionTypes.ADD_PRODUCT_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
};


export const newProductReducer = (state = { newProduct: {} }, action) => {
    switch(action.type) {
        case actionTypes.NEW_PRODUCT_REQUEST:
            return {
                loading: true,
                newProduct: {},
            }
        case actionTypes.NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                newProduct: action.payload,
            }
        case actionTypes.NEW_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
};


export const deleteProductReducer = (state = { }, action) => {
    switch(action.type) {
        case actionTypes.DELETE_PRODUCT_REQUEST:
            return {
                loading: true,
            }
        case actionTypes.DELETE_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case actionTypes.DELETE_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
};



export const updateProductReducer = (state = { }, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_PRODUCT_REQUEST:
            return {
                loading: true,
            }
        case actionTypes.UPDATE_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case actionTypes.UPDATE_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
};