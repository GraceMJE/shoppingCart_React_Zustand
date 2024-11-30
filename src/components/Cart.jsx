import React from 'react';
import useCartStore from '../store/cartStore';
import { CartIcon, ChevronDown, ChevronUp } from '../constants/icons';
import styled from 'styled-components';

const CartWrapper = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 20px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  flex-grow: 1;
`;

const ItemTitle = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const ItemSinger = styled.p`
  font-size: 14px;
  color: #555;
`;

const ItemPrice = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

const AmountWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
  }

  span {
    font-size: 16px;
  }
`;

const RemoveButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 20px;

  &:hover {
    background-color: #ff1f25;
  }
`;

const CartIconWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #ff7f50;
  padding: 15px;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const Cart = () => {
  const { cart, removeItem, updateAmount } = useCartStore();

  const handleAmountChange = (id, amount) => {
    if (amount > 0) {
      updateAmount(id, amount);
    }
  };

  return (
    <CartWrapper>
      <Title>Your Cart</Title>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <CartItems>
          {cart.map((item) => (
            <CartItem key={item.id}>
              <ItemImage src={item.img} alt={item.title} />
              <ItemDetails>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemSinger>{item.singer}</ItemSinger>
                <ItemPrice>${item.price}</ItemPrice>
                <AmountWrapper>
                  <button onClick={() => handleAmountChange(item.id, item.amount - 1)}>
                    <ChevronDown />
                  </button>
                  <span>{item.amount}</span>
                  <button onClick={() => handleAmountChange(item.id, item.amount + 1)}>
                    <ChevronUp />
                  </button>
                </AmountWrapper>
              </ItemDetails>
              <RemoveButton onClick={() => removeItem(item.id)}>
                Remove
              </RemoveButton>
            </CartItem>
          ))}
        </CartItems>
      )}
      <CartIconWrapper>
        <CartIcon />
      </CartIconWrapper>
    </CartWrapper>
  );
};

export default Cart;
