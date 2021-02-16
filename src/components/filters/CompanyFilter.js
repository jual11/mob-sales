import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {fetchBrands, filterBrandsAdd, filterBrandsRemove} from '../../actions/index'



const ComapnyFilter = (props) => {
    useEffect( () => {
        props.fetchBrands();
    },[])

    const addBrandFilters = (event) => {
        if(event.target.checked) {
            const addBrand = props.phones.filter(item => item.brand === event.target.value);
            props.filterBrandsAdd(addBrand)
        } else if (!event.target.checked) {
            props.filterBrandsRemove(event.target.value)
        } 
    }

    const renderComapanys = () => {
        if(props.brands.length === 0) return <p>...Loading</p>
        return props.brands.map((brand) => {
            return (
                <div key={brand} className="form-check">
                    <input onClick={((event) => {addBrandFilters(event)})} value={brand} className="form-check-input" type="checkbox" itemID="flexCheckIndeterminate" />
                    <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                        {brand}
                    </label>
                </div>
            )     
        })
    } 

    return(
        <div className='brand-container'>
            <h5>ComapnyFilter</h5>
            <div className='brand-container-wrap'>{renderComapanys()}</div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        brands: state.brands,
        phones: state.phones, 
        filter: state.filter.brandFilter
    }
}


export default connect(mapStateToProps, {fetchBrands, filterBrandsAdd, filterBrandsRemove }) (ComapnyFilter);