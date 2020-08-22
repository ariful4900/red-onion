import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import logo from '../../assets/Images/logo2.png'
import { useForm } from 'react-hook-form';
import { useProvider } from '../../assets/Provider/ProviderAPI';

const Login = () => {
    const [returningUser, setReturningUser] = useState(false);

    const provide = useProvider();
    const { auth } = provide;
    const { signIn, signUp } = auth;
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => {
        if (returningUser) {
            if (data.email && data.password) {
                signIn(data.email, data.password);
            }
        } else {
            if (data.name && data.email && data.password && data.confirm_password) {
                
                signUp(data.email, data.confirm_password, data.name)
            }
        }
        
    }


    return (
        <div className="login_area">
            <Container>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <div className="loginBox">
                            <div className="login_lo">
                                <img src={logo} alt="" />
                            </div>
                            <div className="loginForm">
                                {
                                    returningUser ?
                                        <Form onSubmit={handleSubmit(onSubmit)}>
                                            {
                                                auth.user != null && <p className="text-danger">* {auth.user.error}</p>
                                            }
                                            <input className="form-control" type="email" name="email" ref={register({ required: true })} placeholder="name@company.com" />
                                            {errors.email && <span>This field is required</span>}

                                            <input className="form-control" type="password" name="password" ref={register({ required: true })} placeholder="Password" />
                                            {errors.password && <span>This field is required</span>}
                                            <br />
                                            <input className="form-control" type="submit" value="Login" />
                                            <br />
                                            <div className="text-center text-danger">
                                                <label onClick={() => setReturningUser(false)}>Create A New Account</label>
                                            </div>
                                        </Form>
                                        :
                                        <Form onSubmit={handleSubmit(onSubmit)}>
                                            {
                                                auth.user != null && <p className="text-danger">* {auth.user.error}</p>
                                            }
                                            <input className="form-control" type="text" name="name" ref={register} placeholder="Your full Name" />
                                            {errors.name && <span>This field is required</span>}

                                            <input className="form-control" type="email" name="email" ref={register} placeholder="Your email" />
                                            {errors.email && <span>This field is required</span>}

                                            <input className="form-control" type="password" name="password" ref={register} placeholder="Your Password" />
                                            {errors.password && <span>This field is required</span>}

                                            <input className="form-control" type="password" name="confirm_password" ref={register({ validate: (value) => value === watch('password') })} placeholder="Your Password" />
                                            {errors.confirm_password && <span>Password Didn't Match</span>}

                                            <br />
                                            <input className="form-control" type="submit" value="Sing Up" />
                                            <br />
                                            <div className="text-center text-danger">
                                                <label onClick={() => setReturningUser(true)}>Already Have an Account</label>
                                            </div>
                                        
                                        </Form>
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;