import React, { useState } from 'react';
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import './FeatureItem.scss';

const FeatureItem = (props) => {
    const { title, description, icon, image } = props.feature;
    const [descriptionCollapse, setDescriptionCollapse] = useState(false)
    return (
        <div className="item_box ">
            <div className="feature_pic">
                <img src={image} alt={title} />
            </div>
            <div className="feature_content d-flex justify-content-between">
                <img src={icon} alt="" />
                <div className="feature_content_box">
                    <h5>{title}</h5>
                    <p>
                        {
                            descriptionCollapse ? description : description.substr(0, 100)
                        }
                    </p>
                    {
                        descriptionCollapse?
                        <span onClick={()=>setDescriptionCollapse(false)} className="show_btn">See Less <FaArrowCircleLeft/></span>:
                         <span onClick={()=>setDescriptionCollapse(true)} className="show_btn">See More <FaArrowCircleRight/></span>
                    }
                </div>
            </div>
        </div>
    );
};

export default FeatureItem;