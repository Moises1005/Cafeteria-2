import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";

// Mock data for products
const products = [
  { id: 1, name: "Café Latte", price: 50, image: "https://www.cuisinart.com/dw/image/v2/ABAF_PRD/on/demandware.static/-/Sites-us-cuisinart-sfra-Library/default/dwae845f23/images/recipe-Images/cafe-latte1-recipe.jpg?sw=1200&sh=1200&sm=fit" },
  { id: 2, name: "Cappuccino", price: 60, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Cappuccino_PeB.jpg/1200px-Cappuccino_PeB.jpg" },
  { id: 3, name: "Espresso", price: 40, image: "https://www.cafe-mx.com/blog/app/assets/media/2018/08/cafe-expreso.jpg" },
  { id: 4, name: "Mocha", price: 65, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-pesjWnkw4noNqA1WXxZ8ZbbGeTo_KCnMyg&s" },
  { id: 5, name: "Café Americano", price: 45, image: "https://www.somoselcafe.com.ar/img/novedades/47.jpg" },
  { id: 6, name: "Flat White", price: 55, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR_kXfG-HDXpM2DhbDwL0RyR6263lNmr7Vuw&s" },
];

const App = () => {
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const calculateTotal = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    return total - discount;
  };

  const applyPromoCode = () => {
    if (promoCode === "CAFE20") {
      setDiscount(20);
    } else {
      alert("Código promocional inválido");
    }
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Cafetería Buen Sabor</h1>
          <nav>
            <Link to="/">Inicio</Link> | <Link to="/catalog">Catálogo</Link> | <Link to="/about">Sobre nosotros</Link> | <Link to="/cart">Carrito</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/catalog"
              element={<Catalog products={products} addToCart={addToCart} />}
            />
            <Route
              path="/about"
              element={<About />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  removeFromCart={removeFromCart}
                  calculateTotal={calculateTotal}
                  promoCode={promoCode}
                  setPromoCode={setPromoCode}
                  applyPromoCode={applyPromoCode}
                />
              }
            />
          </Routes>
        </main>

        <footer>
          <p>© 2024 Cafetería React. Todos los derechos reservados.</p>
        </footer>
      </div>
    </Router>
  );
};

const Home = () => (
  <div className="home">
    <h2>Bienvenido a nuestra Cafetería</h2>
    <p>Descubre los mejores sabores de café aquí.</p>
    <p>
      En Cafetería React, ofrecemos una amplia selección de bebidas artesanales,
      cuidadosamente elaboradas con los mejores granos de café. Ya sea que
      prefieras un espresso fuerte o un latte cremoso, tenemos algo para cada
      amante del café.
    </p>
    <img
      src="https://ingenieriademenu.com/wp-content/uploads/2022/04/Como-decorar-una-cafeteria-pequena-con-poco-dinero.jpg"
      alt="Cafetería"
      className="hero-image"
    />
  </div>
);

const Catalog = ({ products, addToCart }) => (
  <div className="catalog">
    <h2>Catálogo de Productos</h2>
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button onClick={() => addToCart(product)}>Agregar al carrito</button>
        </div>
      ))}
    </div>
  </div>
);

const About = () => (
  <div className="about">
    <h2>Sobre Nosotros</h2>
    <p>
      Bienvenido a Cafetería Buen Sabor. Nuestra misión es ofrecer experiencias
      inolvidables a través del café. Desde nuestros humildes comienzos, hemos
      trabajado para crear un espacio donde los amantes del café puedan
      disfrutar de bebidas de alta calidad y un ambiente acogedor.
    </p>
    <img
      src="https://cursoslibres.url.edu.gt/wp-content/uploads/2022/08/Barista-1920x1280.jpg"
      alt="Historia de la Cafetería"
      className="about-image"
    />
    <p>
      En cada taza servida, encontrarás nuestra pasión por el café y nuestro
      compromiso con la excelencia. Únete a nosotros y forma parte de nuestra
      historia.
    </p>
  </div>
);

const Cart = ({ cart, removeFromCart, calculateTotal, promoCode, setPromoCode, applyPromoCode }) => (
  <div className="cart">
    <h2>Carrito de Compras</h2>
    {cart.length === 0 ? (
      <p>El carrito está vacío</p>
    ) : (
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <div className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <span>{item.name} - ${item.price}</span>
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    )}
    <div className="promo-code">
      <input
        type="text"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
        placeholder="Código promocional"
      />
      <button onClick={applyPromoCode}>Aplicar</button>
    </div>
    <h3>Total: ${calculateTotal()}</h3>
    <button className="checkout-button">Comprar</button>
  </div>
);

export default App;