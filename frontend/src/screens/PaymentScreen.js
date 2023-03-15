import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = () => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	if (!shippingAddress) {
		navigate('/shipping');
	}

	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	// const userLogin = useSelector((state) => state.userLogin);
	// const { userInfo } = userLogin;

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate('/placeorder');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'></Form.Label>

					<Col>
						<Form.Check
							type='radio'
							label='PayPal or Credit Card'
							id='PayPal'
							name='paymentMethod'
							value='PayPal'
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
							className='mb-2'
						></Form.Check>

						{/* <Form.Check
							type='radio'
							label='Stripe'
							id='Stripe'
							name='paymentMethod'
							value='Stripe'
							onChange={(e) => setPaymentMethod(e.target.value)}
							className='mb-2'
						></Form.Check> */}
					</Col>
				</Form.Group>

				<Button type='submit' variant='primary' className='mt-3'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
