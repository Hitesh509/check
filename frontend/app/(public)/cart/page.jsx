'use client'
import Counter from "@/components/Counter";
import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/PageTitle";
import { deleteItemFromCart } from "@/lib/features/cart/cartSlice";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ObjectDetection from "@/components/object-detection"; // ✅ Camera Component

export default function Cart() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const { cartItems } = useSelector(state => state.cart);
    const products = useSelector(state => state.product.list);
    const dispatch = useDispatch();

    const [cartArray, setCartArray] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const createCartArray = () => {
        setTotalPrice(0);
        const cartArray = [];
        for (const [key, value] of Object.entries(cartItems)) {
            const product = products.find(product => product.id === key);
            if (product) {
                cartArray.push({
                    ...product,
                    quantity: value,
                });
                setTotalPrice(prev => prev + product.price * value);
            }
        }
        setCartArray(cartArray);
    }

    const handleDeleteItemFromCart = (productId) => {
        dispatch(deleteItemFromCart({ productId }));
    }

    useEffect(() => {
        if (products.length > 0) {
            createCartArray();
        }
    }, [cartItems, products]);

    return (
        <div className="min-h-screen mx-6 text-slate-800">
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <PageTitle heading="My Cart" text="items in your cart" linkText="Shop More" path="/shop" />


                {/* ✅ Two-column layout: Left = Cart, Right = Object Detection */}
                <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* 🛒 LEFT SIDE - Cart (60%) */}
                    <div className="lg:w-[60%] bg-white rounded-xl p-5 shadow-md">
                        {cartArray.length > 0 ? (
                            <div>
                                <table className="w-full text-slate-600 table-auto">
                                    <thead>
                                        <tr className="max-sm:text-sm">
                                            <th className="text-left">Product</th>
                                            <th>Quantity</th>
                                            <th>Total Price</th>
                                            <th className="max-md:hidden">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartArray.map((item, index) => (
                                            <tr key={index} className="space-x-2">
                                                <td className="flex gap-3 my-4">
                                                    <div className="flex gap-3 items-center justify-center bg-slate-100 size-18 rounded-md">
                                                        <Image
                                                            src={item.images[0]}
                                                            className="h-14 w-auto"
                                                            alt={item.name}
                                                            width={45}
                                                            height={45}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="max-sm:text-sm">{item.name}</p>
                                                        <p className="text-xs text-slate-500">{item.category}</p>
                                                        <p>{currency}{item.price}</p>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <Counter productId={item.id} />
                                                </td>
                                                <td className="text-center">
                                                    {currency}{(item.price * item.quantity).toLocaleString()}
                                                </td>
                                                <td className="text-center max-md:hidden">
                                                    <button
                                                        onClick={() => handleDeleteItemFromCart(item.id)}
                                                        className="text-red-500 hover:bg-red-50 p-2.5 rounded-full active:scale-95 transition-all"
                                                    >
                                                        <Trash2Icon size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <OrderSummary totalPrice={totalPrice} items={cartArray} />
                            </div>
                        ) : (
                            <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-400">
                                <h1 className="text-2xl sm:text-3xl font-semibold mb-4">Your cart is empty</h1>
                            </div>
                        )}
                    </div>
                    {/* 📷 RIGHT SIDE - Object Detection (40%) */}
                    <div className="lg:w-[40%] bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-xl shadow-md border border-gray-400 p-3 flex flex-col items-center justify-start"
                        style={{ minHeight: "420px", maxHeight: "420px" }} // ✅ Fix height
                    >
                        {/* Top info */}
                        <div className="flex flex-col items-center mb-2">
                            <h2 className="text-lg font-semibold text-gray-800">Scanning Items</h2>
                            <p className="text-xs text-gray-600 text-center px-1">
                                Point your camera to detect items and add them to your cart automatically.
                            </p>
                        </div>

                        {/* Fixed-height detection block */}
                        <div className="w-full flex-1 rounded-lg overflow-hidden bg-gradient-to-tr from-gray-300 to-gray-350 flex items-center justify-center shadow-sm border border-gray-400">
                            <ObjectDetection />
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}
