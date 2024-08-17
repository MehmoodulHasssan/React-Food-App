import React from 'react';

export function totalPrice(items) {
  let totalPrice = 0;
  for (const item of items) {
    totalPrice += +item.price * item.quantity;
  }
  return totalPrice.toFixed(2);
}
