import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiFillCloseCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (ref.current.classList.contains("translate-x-0")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  const ref = useRef();

  return (
    <div className="flex flex-col md:flex-row md:justify-start md:text-xl justify-center items-center py-2 shadow-md sticky top-0 z-10 bg-white">
      <div className="logo mx-5">
        <Link href={"/"}>
          <a>
            <Image src="/logo.png" alt="logo" width={200} height={40} />
          </a>
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-6 font-bold md:text-md">
          <Link href={"/tshirts"}>
            <a>
              <li className="hover:text-orange-500">Tshirts</li>
            </a>
          </Link>
          <Link href={"/hoodies"}>
            <a>
              <li className="hover:text-orange-500">Hoodies</li>
            </a>
          </Link>
          <Link href={"/stickers"}>
            <a>
              <li className="hover:text-orange-500">Stickers</li>
            </a>
          </Link>
          <Link href={"/mugs"}>
            <a>
              <li className="hover:text-orange-500">Mugs</li>
            </a>
          </Link>
        </ul>
      </div>
      <div className="cart absolute right-0 top-4 mx-5 cursor-pointer flex">
        <Link href={"/login"}>
          <a>
            <MdAccountCircle className="text-xl md:text-3xl cursor-pointer text-orange-500 mx-2" />
          </a>
        </Link>
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="text-xl md:text-3xl cursor-pointer text-orange-500"
        />
      </div>

      <div
        ref={ref}
        className={`sideCart w-72 h-[100vh] overflow-y-scroll absolute top-0 right-0 bg-orange-200 px-8 py-10 transform transition-transform ${
          Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"
        } z-10`}
      >
        <h2 className="font-bold text-xl text-center"> Shopping cart </h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 cursor-pointer text-2xl text-orange-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length == 0 && (
            <div className="my-4 text-base font-normal">
              Your cart is Empty!
            </div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-1">
                  <div className="w-2/3 font-semibold">
                    {cart[k].name} ({cart[k].size}/{cart[k].variant})
                  </div>
                  <div className="flex items-center font-semibold justify-center w-1/3">
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].qty
                        );
                      }}
                      className="mx-1 text-3xl cursor-pointer text-orange-500"
                    />
                    {cart[k].qty}
                    <AiFillPlusCircle
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].qty
                        );
                      }}
                      className="mx-1 text-3xl cursor-pointer text-orange-500"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="font-semibold my-2"> Subtotal: ₹{subTotal}</div>

        <div className="flex">
          <Link href={"/checkout"}>
            <button className="flex mr-2 text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-sm">
              <BsFillBagCheckFill className="m-1" /> Checkout
            </button>
          </Link>
          <button
            onClick={clearCart}
            className="flex mr-2 text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-sm"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
