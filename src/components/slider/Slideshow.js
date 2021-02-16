import React from 'react';
import SimpleImageSlider from "react-simple-image-slider";

class Slider extends React.Component {
    render() {
        const images = [
            { url: this.props.images[0] },
            { url: this.props.images[1] },
            { url: this.props.images[2] },
            { url: this.props.images[3] }
           
        ];

        return (
            <div className='slider-container'>
                <SimpleImageSlider
                    width={280}
                    height={450}
                    images={images}
                    showNavs={true}
                    bgColor={'#a5efef'}
                    showBullets={true}
                    
                />
            </div>
        );
    }
}

export default Slider; 

//https://www.npmjs.com/package/react-simple-image-slider