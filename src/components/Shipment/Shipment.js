import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { useProvider } from '../../assets/Provider/ProviderAPI';

const Shipment = () => {
    const provide = useProvider();
    const { auth, cartItem } = provide;
    const { deliveryDetailsHandler, getUserEmail, deliveryDetails}= cartItem;
    const {name, email, house, village, city, zipCode} = deliveryDetails;
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        deliveryDetailsHandler(data);
        getUserEmail(auth.user.email)
    };


    return (
        <div className="shipment_area my-5">

           <div style={{display:(name && email && house && village && city && zipCode)? "none":"block"}}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <input className="form-control" name="name" defaultValue={auth.user.displayName} ref={register} />

                    {/* include validation with required or other standard HTML validation rules */}
                    <input type="email" className="form-control" name="email" defaultValue={auth.user.email} ref={register({ required: true })} />
                    {errors.email && <span>This field is required</span>}
                    <input type="text" className="form-control" name="house" ref={register({ required: true })} placeholder="House or Holding No"/>
                    {errors.house && <span>House is required</span>}
                    <input className="form-control" name="village" ref={register({ required: true })}  placeholder="Village or Road No"/>
                    {errors.village && <span>village is required</span>}
                    <input type="text" className="form-control" name="city" ref={register({ required: true })} placeholder="your Present City"/>
                    {errors.city && <span>city is required</span>}
                    <input type="number" className="form-control" name="zipCode" ref={register({ required: true })} placeholder="Zip Code"/>
                    {errors.zipCode && <span>zip-code is required</span>}
                    

                    <button className="form-control btn btn-danger" type="submit"  >Save & Continue</button>
                </Form>
           </div>
           <div style={{display:(name && email && house && village && city && zipCode)?"block":"none"}}>
                This is Payment
           </div>
        </div>
    );
};

export default Shipment;