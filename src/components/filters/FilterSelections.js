import React from 'react';
import CompanyFilters from './CompanyFilter';
import PriceFilter from './PriceFilter';


const FilterSelection = () => {
    return(
        <div>
            <CompanyFilters />
            <PriceFilter />
        </div>
    )
}

export default FilterSelection;