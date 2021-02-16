import React from 'react';
import Products from './Products';
import FilterSelection from './filters/FilterSelections';


const MainPage = () => {
    return(
        <div className='mainPage-container'>
            <FilterSelection />
            <Products />
        </div>
    )
}

export default MainPage;