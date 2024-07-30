import React from 'react';
import styles from '../css/Banner.module.css';
import image1 from '../images/M&DC (255).jpg'
import image2 from '../images/M&DC (169).jpg'



function Banner(){
const images = [image1, image2] 
    

return (
        <div className={styles.banner}>
            
            <div className={styles.slider} style={{ '--quantity': images.length }}>
               
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
