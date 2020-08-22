import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { useProvider } from '../../assets/Provider/ProviderAPI';

const Shipment = () => {
    const provide = useProvider();
    const { auth } = provide;
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    console.log(watch("example")); // watch input value by passing the name of it
    return (
        <div className="shipment_area">


            {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
            <Form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <input className="form-control" name="example" defaultValue={auth.user.displayName} ref={register} />

                {/* include validation with required or other standard HTML validation rules */}
                <input className="form-control" name="name" defaultValue={auth.user.email} ref={register({ required: true })} />
                {errors.exampleRequired && <span>This field is required</span>}
                <input className="form-control" name="exampleRequired" ref={register({ required: true })} />
                {errors.exampleRequired && <span>This field is required</span>}
                <input className="form-control" name="exampleRequired" ref={register({ required: true })} />
                {errors.exampleRequired && <span>This field is required</span>}
                <input className="form-control" name="exampleRequired" ref={register({ required: true })} />
                {errors.exampleRequired && <span>This field is required</span>}
                <input className="form-control" name="exampleRequired" ref={register({ required: true })} />
                {errors.exampleRequired && <span>This field is required</span>}
                <input className="form-control" name="exampleRequired" ref={register({ required: true })} />
                {errors.exampleRequired && <span>This field is required</span>}
                <input className="form-control" name="exampleRequired" ref={register({ required: true })} />
                {errors.exampleRequired && <span>This field is required</span>}

                <input type="submit" />
            </Form>
        </div>
    );
};

export default Shipment;