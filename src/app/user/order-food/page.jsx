'use client'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import NavigationBar from '@/components/NavigationBar'
import CartBody from '@/components/CartBoday'
import CartModal from '@/components/CartModal'


const OrderFoodPage = () => {
    const modal = useRef()
    const [foodItems, setFoodItems] = useState([])

    function handlePressCart() {
        modal.current.showModal()
    }

    function emptyItems() {
        setFoodItems([])
    }

    function handlePlusItem(item) {
        setFoodItems(prev => {
            return prev.map(ele => {
                if (ele.name === item.name) {
                    return { ...ele, quantity: ele.quantity + 1 };
                }
                return ele;
            });
        });
    }

    function handleMinusItem(item) {
        setFoodItems(prev => {
            return prev
                .map(ele => {
                    if (ele.name === item.name) {
                        if (ele.quantity > 1) {
                            return { ...ele, quantity: ele.quantity - 1 };
                        } else {
                            return null; // Mark for removal
                        }
                    }
                    return ele;
                })
                .filter(ele => ele !== null); // Remove items marked for removal
        });
    }


    function handleAddItem(item) {
        setFoodItems(prev => {
            const exist = prev.filter(ele => ele.name === item.name)
            console.log(exist)
            if (exist.length > 0) {
                console.log('item already selected')
                return prev
            }
            return [{ ...item, quantity: 1 }, ...prev]
        })
    }
    console.log(foodItems)


    return (
        <>
            <NavigationBar currentItems={foodItems} onPressCart={handlePressCart} route={'customer'} />
            <CartBody onAddItem={handleAddItem} />
            <CartModal
                ref={modal}
                currentItems={foodItems}
                onPlus={handlePlusItem}
                onMinus={handleMinusItem}
                emptyItems={emptyItems}
            />
        </>

    )
}

export default OrderFoodPage
