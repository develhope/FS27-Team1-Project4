import React from 'react';
import styles from '../css/Banner.module.css';
import image1 from '../images/1st image.jpg'
import image2 from '../images/2nd image.png'
import image3 from '../images/3rd image.png'
import image4 from '../images/4th image.jpg'
import image5 from '../images/5th Image.jpg'
import image6 from '../images/6th image.jpg'
import image7 from '../images/7th image.jpg'
import image8 from '../images/8th image.jpg'
import image9 from '../images/9th image.jpg'
import image10 from '../images/10th image.jpg'
import image11 from '../images/11th image.png'

function Banner(){
const images = [image3, image2, image7, image4, image9, image1, image11] 
    

return (
        <div className={styles.banner}>
            
            <div className={styles.slider} style={{ '--quantity': 5 }}>
               
                {images.map((image, index) => (
               
               <div className={styles.item} key={index} style={{ '--position': index + 1 }}>
              
                        <img src={image} alt={`test ${index + 1}`} />
               
                </div>
                
                ))}
            </div>
            
         
        </div>
    );
};

export default Banner;
