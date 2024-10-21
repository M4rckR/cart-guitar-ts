

import type { GuitarApp } from "./types/types";
import { Guitar } from "./Components/Guitar";
import { Header } from "./Components/Header";
import { useCart } from "./hooks/useCart";

export function App() {
  
  const {data, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, vaciarCarrito, carTotal, isEmpty} = useCart();

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        vaciarCarrito={vaciarCarrito}
        carTotal={carTotal}
        isEmpty={isEmpty}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
        {data.map((guitar:GuitarApp) => (
            <Guitar 
              key={guitar.id} 
              guitar={guitar} 
              addToCart={addToCart}
            />
        ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}
