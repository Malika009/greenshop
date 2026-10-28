import React, { useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, Heart, UserRound, ChevronDown, SlidersHorizontal, Trash2, Plus, Minus, CheckCircle2, Leaf, Sprout, Droplets, Sun, Mail, MapPin, Phone, Facebook, Instagram, Youtube, ArrowRight, Star, ChevronLeft } from "lucide-react";
import { products, categories } from "./data/products";

const money = (n) => `$${Number(n).toFixed(2)}`;

function Header({ cartCount, onCart, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  return <header className="site-header container">
    <Link className="brand" to="/"><span className="brand-mark"><Sprout size={22}/></span><span>GREEN<span>SHOP</span></span></Link>
    <button className="icon-btn mobile-menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    <nav className={menuOpen ? "main-nav open" : "main-nav"}>
      <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
      <NavLink to="/shop" onClick={() => setMenuOpen(false)}>Shop</NavLink>
      <NavLink to="/cart" onClick={() => setMenuOpen(false)}>Plant Care</NavLink>
      <NavLink to="/blog" onClick={() => setMenuOpen(false)}>Blog</NavLink>
    </nav>
    <div className="header-actions">
      {searchOpen && <input className="header-search" placeholder="Search plants..." onChange={e => onSearch(e.target.value)} autoFocus/>}
      <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Search size={19}/></button>
      <button className="icon-btn cart-icon" aria-label="Open cart" onClick={onCart}><ShoppingCart size={20}/>{cartCount > 0 && <span className="cart-count">{cartCount}</span>}</button>
      <Link to="/login" className="login-btn"><UserRound size={15}/> Login</Link>
    </div>
  </header>;
}

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  return <footer className="footer">
    <div className="footer-perks">
      <div className="perk"><Sprout/><h4>Garden Care</h4><p>We are an online plant shop offering a wide range of cheap and trendy plants.</p></div>
      <div className="perk"><Leaf/><h4>Plant Renovation</h4><p>We help your plants thrive with practical care tips and quality products.</p></div>
      <div className="perk"><Droplets/><h4>Watering Garden</h4><p>Find the right plant for every corner of your home and garden.</p></div>
      <form className="newsletter" onSubmit={e => {e.preventDefault(); if(email.includes("@")) setSubscribed(true);}}>
        <h4>Would you like to join newsletters?</h4><p>Get updates about new plants, special offers and helpful gardening advice.</p>
        <div className="subscribe-row"><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email address..."/><button>{subscribed ? "Joined ✓" : "Join"}</button></div>
        {subscribed && <small className="success-text">Thanks for subscribing!</small>}
      </form>
    </div>
    <div className="footer-contact"><Link className="brand" to="/"><span className="brand-mark"><Sprout size={22}/></span><span>GREEN<span>SHOP</span></span></Link><span><MapPin size={15}/> 70 West Buckingham Ave. Farmingdale, NY 11735</span><span><Mail size={15}/> contact@greenshop.com</span><span><Phone size={15}/> +88 01911 717 490</span></div>
    <div className="footer-links">
      <div><h4>My Account</h4><Link to="/login">My Account</Link><Link to="/cart">Our stores</Link><Link to="/cart">Contact us</Link><Link to="/blog">Career</Link><Link to="/blog">Specials</Link></div>
      <div><h4>Help & Guide</h4><Link to="/blog">Help Center</Link><Link to="/blog">How to Buy</Link><Link to="/blog">Shipping & Delivery</Link><Link to="/blog">Product Policy</Link><Link to="/blog">How to Return</Link></div>
      <div><h4>Categories</h4>{categories.slice(0,5).map(c=><Link key={c.name} to="/shop">{c.name}</Link>)}</div>
      <div><h4>Social Media</h4><div className="socials"><a href="#facebook" aria-label="Facebook"><Facebook/></a><a href="#instagram" aria-label="Instagram"><Instagram/></a><a href="#youtube" aria-label="YouTube"><Youtube/></a></div><h4 className="accept-title">We accept</h4><div className="payment-logos"><span>PayPal</span><span>●●</span><span>VISA</span><span>▰</span></div></div>
    </div>
    <div className="copyright">© 2024 GreenShop. All Rights Reserved.</div>
  </footer>;
}

function ProductCard({ product, addToCart, onQuickView }) {
  const [liked, setLiked] = useState(false);
  return <article className="product-card">
    <div className="product-image-wrap">
      {product.tag && <span className="sale-tag">{product.tag}</span>}
      <Link to={`/product/${product.id}`} className="product-image"><img src={product.image} alt={product.name}/></Link>
      <div className="product-tools">
        <button title="Add to cart" onClick={() => addToCart(product)}><ShoppingCart size={17}/></button>
        <button title="Quick view" onClick={() => onQuickView(product)}><Search size={17}/></button>
        <button title="Add to wishlist" className={liked ? "liked" : ""} onClick={() => setLiked(!liked)}><Heart size={17} fill={liked ? "currentColor" : "none"}/></button>
      </div>
    </div>
    <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>
    <div className="product-price">{money(product.price)} {product.oldPrice && <del>{money(product.oldPrice)}</del>}</div>
  </article>;
}

function Hero({ onShop }) {
  return <section className="hero container">
    <div className="hero-copy"><p className="eyebrow">WELCOME TO GREENSHOP</p><h1>LET'S MAKE A<br/>BETTER <span>PLANET</span></h1><p>We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create a unique Urban Jungle. Order your favorite plants!</p><button className="primary-btn" onClick={onShop}>SHOP NOW</button></div>
    <div className="hero-visual"><img className="hero-plant" src="https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1000&q=90" alt="Lush green indoor plant"/><span className="hero-dot">●</span></div>
  </section>;
}

function HomePage({ addToCart, onQuickView, searchTerm }) {
  const navigate = useNavigate();
  const shown = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0,8);
  return <>
    <Hero onShop={() => navigate("/shop")}/>
    <section className="shop-layout container home-shop">
      <Sidebar onCategory={c => navigate(`/shop?category=${encodeURIComponent(c)}`)}/>
      <div className="shop-main"><ProductToolbar/><div className="product-grid">{shown.map(p=><ProductCard key={p.id} product={p} addToCart={addToCart} onQuickView={onQuickView}/>)}</div><div className="pagination"><button className="active">1</button><button onClick={()=>navigate("/shop")}>2</button><button onClick={()=>navigate("/shop")}>3</button><button onClick={()=>navigate("/shop")}>→</button></div></div>
    </section>
    <section className="promo-row container">
      <Promo image="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=80" title="SUMMER CACTUS & SUCCULENTS" text="We are an online plant shop offering a wide range of cheap and trendy plants."/>
      <Promo image="https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=500&q=80" title="STYLING TRENDS & MUCH MORE" text="We are an online plant shop offering a wide range of cheap and trendy plants."/>
    </section>
    <BlogSection/>
  </>;
}

function Promo({image,title,text}) { return <article className="promo"><img src={image} alt="Indoor plant"/><div><h3>{title}</h3><p>{text}</p><Link to="/shop" className="small-green-btn">Find More <ArrowRight size={13}/></Link></div></article>; }

function Sidebar({ onCategory, selected = "" }) {
  const [maxPrice,setMaxPrice] = useState(500);
  return <aside className="sidebar"><h3>Categories</h3><ul>{categories.map(c=><li key={c.name}><button className={selected===c.name?"selected":""} onClick={()=>onCategory(c.name)}>{c.name}<span>({c.count})</span></button></li>)}</ul><h3 className="filter-title">Price Range</h3><input aria-label="Maximum price" className="price-range" type="range" min="50" max="500" step="10" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))}/><p>Price: <b>$50 - ${maxPrice}</b></p><button className="primary-btn filter-btn" onClick={()=>onCategory(`price:${maxPrice}`)}>Filter</button><h3 className="filter-title">Size</h3>{["Small","Medium","Large"].map((s,i)=><button className="size-option" key={s} onClick={()=>onCategory("House Plants")}>{s}<span>({[119,86,78][i]})</span></button>)}<div className="sale-banner"><h2>Super Sale</h2><strong>UP TO 75% OFF</strong><img src="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=450&q=80" alt="Sale plants"/></div></aside>;
}

function ProductToolbar() { const [sort,setSort]=useState("Default sorting"); return <div className="product-toolbar"><div className="sort-tabs"><button className="current">All Plants</button><button>New Arrivals</button><button>Sale</button></div><label>Sort by: <select value={sort} onChange={e=>setSort(e.target.value)}><option>Default sorting</option><option>Name A-Z</option><option>Price low-high</option><option>Price high-low</option></select><ChevronDown size={13}/></label></div>; }

function ShopPage({ addToCart, onQuickView, searchTerm }) {
  const params = new URLSearchParams(window.location.search);
  const [category,setCategory] = useState(params.get("category") || "");
  const [sort,setSort] = useState("Default sorting");
  const [maxPrice,setMaxPrice] = useState(500);
  const list = useMemo(()=> {
    let result = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) && (!category || p.category===category) && p.price<=maxPrice);
    if(sort==="Name A-Z") result.sort((a,b)=>a.name.localeCompare(b.name));
    if(sort==="Price low-high") result.sort((a,b)=>a.price-b.price);
    if(sort==="Price high-low") result.sort((a,b)=>b.price-a.price);
    return result;
  },[category,sort,maxPrice,searchTerm]);
  return <main className="container page-main"><div className="breadcrumbs"><Link to="/">Home</Link> / Shop</div><section className="shop-layout">
    <aside className="sidebar"><h3>Categories</h3><ul>{categories.map(c=><li key={c.name}><button className={category===c.name?"selected":""} onClick={()=>setCategory(category===c.name?"":c.name)}>{c.name}<span>({c.count})</span></button></li>)}</ul><h3 className="filter-title">Price Range</h3><input className="price-range" type="range" min="50" max="500" step="10" value={maxPrice} onChange={e=>setMaxPrice(+e.target.value)}/><p>Price: <b>$50 - ${maxPrice}</b></p><button className="primary-btn filter-btn" onClick={()=>setCategory("")}>Reset filters</button><div className="sale-banner"><h2>Super Sale</h2><strong>UP TO 75% OFF</strong><img src="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=450&q=80" alt="Plants"/></div></aside>
    <div className="shop-main"><div className="product-toolbar"><div className="sort-tabs"><button className={!category?"current":""} onClick={()=>setCategory("")}>All Plants</button><button onClick={()=>setSort("Name A-Z")}>New Arrivals</button><button onClick={()=>setSort("Price low-high")}>Sale</button></div><label>Sort by: <select value={sort} onChange={e=>setSort(e.target.value)}><option>Default sorting</option><option>Name A-Z</option><option>Price low-high</option><option>Price high-low</option></select></label></div><p className="results-count">{list.length} plants found</p>{list.length ? <div className="product-grid">{list.map(p=><ProductCard key={p.id} product={p} addToCart={addToCart} onQuickView={onQuickView}/>)}</div> : <div className="empty-state"><Sprout size={42}/><h3>No plants found</h3><p>Try a different category or price range.</p><button className="primary-btn" onClick={()=>{setCategory("");setMaxPrice(500)}}>Clear filters</button></div>}</div>
  </section></main>;
}

function ProductPage({ addToCart, onQuickView }) {
  const {id} = useParams();
  const product = products.find(p=>p.id===Number(id)) || products[0];
  const [qty,setQty] = useState(1);
  const [tab,setTab] = useState("description");
  return <main className="container page-main"><div className="breadcrumbs"><Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {product.name}</div><div className="product-detail">
    <div className="detail-gallery"><div className="thumbs">{[product.image,products[1].image,products[2].image,products[3].image].map((img,i)=><button key={i}><img src={img} alt={`View ${i+1}`}/></button>)}</div><div className="detail-image"><img src={product.image} alt={product.name}/></div></div>
    <div className="detail-info"><h1>{product.name}</h1><div className="detail-price">{money(product.price)} {product.oldPrice && <del>{money(product.oldPrice)}</del>}<span className="rating"><span>★★★★★</span> 19 Customer Review</span></div><hr/><h4>Short Description:</h4><p>The perfect plant to bring a little natural beauty into your home. Easy to care for and a wonderful addition to your living room, office or bedroom.</p><h4>Size:</h4><div className="size-pills"><button className="picked">S</button><button>M</button><button>L</button></div><div className="buy-row"><div className="qty"><button onClick={()=>setQty(Math.max(1,qty-1))}><Minus size={14}/></button><span>{qty}</span><button onClick={()=>setQty(qty+1)}><Plus size={14}/></button></div><button className="primary-btn" onClick={()=>addToCart(product,qty)}>ADD TO CART</button><button className="outline-btn" onClick={()=>addToCart(product,qty)}>BUY NOW</button><button className="heart-btn" aria-label="Wishlist"><Heart size={18}/></button></div><p className="meta">SKU: <span>1995751877966</span></p><p className="meta">Categories: <span>{product.category}, Plants</span></p><p className="meta">Share this products: <span className="share-links">f　𝕏　p</span></p></div>
  </div><div className="detail-tabs"><div className="tab-buttons"><button className={tab==="description"?"tab-active":""} onClick={()=>setTab("description")}>Product Description</button><button className={tab==="reviews"?"tab-active":""} onClick={()=>setTab("reviews")}>Reviews (19)</button></div>{tab==="description"? <div className="description-copy"><h4>Living Room</h4><p>The plant is a great addition to any interior. Its natural green leaves bring freshness and create a calm, comfortable atmosphere. Place it in bright indirect light and water when the top layer of soil feels dry.</p><h4>Garden Care</h4><p>For best results, use well-draining soil and a pot with drainage holes. Clean the leaves occasionally and rotate the pot to encourage even growth.</p><h4>Benefits</h4><p>House plants can make your space feel more welcoming and add a beautiful natural accent to your home or office.</p></div>:<div className="review-panel"><h3>Customer reviews</h3><p>★★★★★ “Beautiful healthy plant and fast delivery!”</p><p>★★★★☆ “Looks lovely in my living room.”</p></div>}</div><h2 className="section-heading related-title">Related Products</h2><div className="product-grid related-grid">{products.filter(p=>p.id!==product.id).slice(0,5).map(p=><ProductCard key={p.id} product={p} addToCart={addToCart} onQuickView={onQuickView}/>)}</div></main>;
}

function CartPage({cart,setCart}) {
  const [coupon,setCoupon] = useState("");
  const [couponApplied,setCouponApplied] = useState(false);
  const subtotal = cart.reduce((sum,item)=>sum+item.price*item.qty,0);
  const discount = couponApplied ? subtotal*0.1 : 0;
  const shipping = subtotal===0 || subtotal>=500 ? 0 : 16;
  return <main className="container page-main"><div className="breadcrumbs"><Link to="/">Home</Link> / Shopping Cart</div><h1 className="page-title">Shopping Cart</h1>{cart.length===0 ? <div className="empty-state cart-empty"><ShoppingCart size={46}/><h2>Your cart is empty</h2><p>Looks like you haven't added any plants yet.</p><Link to="/shop" className="primary-btn">Continue Shopping</Link></div> : <div className="cart-layout"><div className="cart-table"><div className="cart-head"><span>Products</span><span>Price</span><span>Quantity</span><span>Total</span><span></span></div>{cart.map(item=><div className="cart-row" key={item.id}><div className="cart-product"><img src={item.image} alt={item.name}/><div><b>{item.name}</b><small>SKU: 1995751877966</small></div></div><span>{money(item.price)}</span><div className="qty"><button onClick={()=>setCart(cart.map(p=>p.id===item.id?{...p,qty:Math.max(1,p.qty-1)}:p))}><Minus size={13}/></button><span>{item.qty}</span><button onClick={()=>setCart(cart.map(p=>p.id===item.id?{...p,qty:p.qty+1}:p))}><Plus size={13}/></button></div><b>{money(item.price*item.qty)}</b><button className="remove-btn" aria-label="Remove item" onClick={()=>setCart(cart.filter(p=>p.id!==item.id))}><Trash2 size={17}/></button></div>)}<Link to="/shop" className="continue-link"><ChevronLeft size={16}/> Continue Shopping</Link></div><aside className="cart-totals"><h3>Cart Totals</h3><label>Coupon Code</label><div className="coupon-row"><input value={coupon} onChange={e=>setCoupon(e.target.value)} placeholder="Enter coupon code"/><button onClick={()=>setCouponApplied(coupon.trim().toUpperCase()==="GREEN10")}>Apply</button></div>{couponApplied&&<small className="success-text">10% discount applied!</small>}<div className="total-line"><span>Subtotal</span><b>{money(subtotal)}</b></div><div className="total-line"><span>Coupon Discount</span><b>-{money(discount)}</b></div><div className="total-line"><span>Shipping</span><b>{shipping===0?"Free":money(shipping)}</b></div><p className="shipping-note">Shipping costs calculated at checkout.</p><div className="total-line grand-total"><b>Total</b><b>{money(subtotal-discount+shipping)}</b></div><Link to="/checkout" className="primary-btn checkout-btn">Proceed To Checkout</Link><button className="text-btn" onClick={()=>setCart([])}>Clear cart</button></aside></div>}</main>;
}

function CheckoutPage({cart,setCart}) {
  const [submitted,setSubmitted] = useState(false);
  const total = cart.reduce((s,p)=>s+p.price*p.qty,0);
  const [payment,setPayment] = useState("Cash on delivery");
  if(submitted) return <main className="container checkout-success"><div className="success-card"><CheckCircle2 size={48}/><h1>Your order has been received!</h1><p>Thank you for your purchase. Your order is being processed.</p><p className="order-number">Order #GS{Math.floor(100000+Math.random()*900000)}</p><Link className="primary-btn" to="/shop">Continue shopping</Link></div></main>;
  return <main className="container page-main"><div className="breadcrumbs"><Link to="/">Home</Link> / Shop / Checkout</div><h1 className="page-title">Checkout</h1><form className="checkout-layout" onSubmit={e=>{e.preventDefault();setSubmitted(true);setCart([])}}><section className="billing"><h2>Billing Address</h2><div className="form-grid"><label>First Name *<input required placeholder="First name"/></label><label>Last Name *<input required placeholder="Last name"/></label><label className="full">Country / Region *<select required defaultValue=""><option value="" disabled>Select country</option><option>Kyrgyzstan</option><option>United States</option><option>United Kingdom</option><option>Germany</option></select></label><label className="full">Street Address *<input required placeholder="House number and street name"/></label><label>Town / City *<input required placeholder="City"/></label><label>State / Province<input placeholder="State or province"/></label><label>Zip *<input required placeholder="Postal code"/></label><label>Email Address *<input type="email" required placeholder="email@example.com"/></label><label>Phone Number *<input type="tel" required placeholder="+996"/></label></div><label className="check-label"><input type="checkbox"/> Ship to a different address?</label><label className="order-notes">Order notes (optional)<textarea rows="4" placeholder="Notes about your order, e.g. special notes for delivery."/></label></section><aside className="order-summary"><h2>Your Order</h2><div className="order-head"><span>Products</span><span>Subtotal</span></div>{cart.map(p=><div className="order-product" key={p.id}><img src={p.image} alt={p.name}/><span>{p.name} <small>× {p.qty}</small></span><b>{money(p.price*p.qty)}</b></div>)}{cart.length===0&&<p>Your cart is empty.</p>}<div className="total-line"><span>Subtotal</span><b>{money(total)}</b></div><div className="total-line"><span>Shipping</span><b>{total>=500||total===0?"Free":"$16.00"}</b></div><div className="total-line grand-total"><b>Total</b><b>{money(total+(total>=500||total===0?0:16))}</b></div><h3>Payment Method</h3>{["Direct bank transfer","Cash on delivery","PayPal / Card"].map(m=><label className="payment-option" key={m}><input type="radio" name="payment" checked={payment===m} onChange={()=>setPayment(m)}/>{m}</label>)}<label className="terms"><input type="checkbox" required/> I have read and agree to the website terms and conditions.</label><button className="primary-btn place-order" type="submit">Place Order</button></aside></form></main>;
}

function LoginPage() {
  const [mode,setMode] = useState("Login");
  const [done,setDone] = useState(false);
  return <main className="login-page"><form className="login-card" onSubmit={e=>{e.preventDefault();setDone(true)}}><button type="button" className="modal-x" onClick={()=>window.location.href="/"}><X size={17}/></button><div className="login-tabs"><button type="button" className={mode==="Login"?"chosen":""} onClick={()=>{setMode("Login");setDone(false)}}>Login</button><span>|</span><button type="button" className={mode==="Register"?"chosen":""} onClick={()=>{setMode("Register");setDone(false)}}>Register</button></div><p className="login-subtitle">{mode==="Login"?"Enter your username and password to login.":"Create an account to get started."}</p>{mode==="Register"&&<input required placeholder="Username"/>}<input required type="email" placeholder="Enter your email address"/><input required type="password" minLength="6" placeholder="Password"/>{mode==="Login"&&<a className="forgot" href="#forgot">Forgot Password?</a>}<button className="primary-btn login-submit">{mode}</button>{done&&<p className="success-text">{mode==="Login"?"Demo login successful!":"Your demo account is ready!"}</p>}<div className="login-divider">Or login with</div><button type="button" className="social-login">🌐　Login with Google</button><button type="button" className="social-login">f　Login with Facebook</button></form></main>;
}

function BlogSection() {
  const posts = [
    {title:"Cactus & Succulent Care Tips",tag:"Cactus & Succulents",date:"September 12, 2024",img:"https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=500&q=80"},
    {title:"Top 10 Succulents for Your Home",tag:"Plant Care",date:"September 08, 2024",img:"https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=500&q=80"},
    {title:"Cacti & Succulent Care Tips",tag:"Garden Ideas",date:"September 05, 2024",img:"https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=500&q=80"},
    {title:"Best Houseplants & Room Beauty",tag:"Interior Plants",date:"August 30, 2024",img:"https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=80"}
  ];
  return <section className="blog-section container"><div className="section-heading"><h2>Our Blog Posts</h2><p>We are an online plant shop offering a wide range of cheap and trendy plants.</p></div><div className="blog-grid">{posts.map((p,i)=><article className="blog-card" key={p.title}><Link to="/blog"><img src={p.img} alt={p.title}/></Link><div className="blog-body"><p className="blog-meta">{p.date}　|　{p.tag}</p><Link to="/blog"><h3>{p.title}</h3></Link><p>Discover useful tips and simple ideas to help your plants grow healthy and beautiful.</p><Link to="/blog" className="read-more">Read More <ArrowRight size={14}/></Link></div></article>)}</div></section>;
}

function BlogPage() { return <main className="container page-main"><div className="breadcrumbs"><Link to="/">Home</Link> / Blog</div><div className="section-heading"><h1>Our Blog Posts</h1><p>Plant care tips, home inspiration and everything green.</p></div><BlogSection/></main>; }

function QuickView({product,onClose,addToCart}) {
  if(!product)return null;
  return <div className="modal-backdrop" onClick={onClose}><div className="quick-modal" onClick={e=>e.stopPropagation()}><button className="modal-x" onClick={onClose}><X/></button><img src={product.image} alt={product.name}/><div><h2>{product.name}</h2><p className="detail-price">{money(product.price)}</p><p>A lovely plant for your home. Easy to care for and perfect for adding a natural touch to your space.</p><button className="primary-btn" onClick={()=>{addToCart(product);onClose()}}>ADD TO CART</button><Link className="quick-link" to={`/product/${product.id}`} onClick={onClose}>View details</Link></div></div></div>;
}

function CartDrawer({open,onClose,cart,setCart}) {
  if(!open)return null;
  const total=cart.reduce((s,p)=>s+p.price*p.qty,0);
  return <div className="drawer-backdrop" onClick={onClose}><aside className="cart-drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><h2>Your Cart ({cart.reduce((s,p)=>s+p.qty,0)})</h2><button className="icon-btn" onClick={onClose}><X/></button></div>{cart.length===0?<div className="drawer-empty"><ShoppingCart size={38}/><p>Your cart is empty</p><Link to="/shop" className="primary-btn" onClick={onClose}>Shop now</Link></div>:<><div className="drawer-items">{cart.map(p=><div className="drawer-item" key={p.id}><img src={p.image} alt={p.name}/><div><b>{p.name}</b><p>{money(p.price)}</p><div className="qty"><button onClick={()=>setCart(cart.map(x=>x.id===p.id?{...x,qty:Math.max(1,x.qty-1)}:x))}><Minus size={12}/></button><span>{p.qty}</span><button onClick={()=>setCart(cart.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x))}><Plus size={12}/></button><button className="remove-mini" onClick={()=>setCart(cart.filter(x=>x.id!==p.id))}><Trash2 size={13}/></button></div></div></div>)}</div><div className="drawer-bottom"><div className="total-line"><b>Subtotal</b><b>{money(total)}</b></div><p>Shipping and taxes calculated at checkout.</p><Link to="/cart" className="outline-btn" onClick={onClose}>View Cart</Link><Link to="/checkout" className="primary-btn" onClick={onClose}>Checkout</Link></div></>}</aside></div>;
}

export default function App() {
  const [cart,setCart] = useState([]);
  const [drawerOpen,setDrawerOpen] = useState(false);
  const [quickProduct,setQuickProduct] = useState(null);
  const [searchTerm,setSearchTerm] = useState("");
  const addToCart = (product,qty=1) => {
    setCart(old => old.some(p=>p.id===product.id) ? old.map(p=>p.id===product.id?{...p,qty:p.qty+qty}:p) : [...old,{...product,qty}]);
    setDrawerOpen(true);
  };
  const cartCount = cart.reduce((s,p)=>s+p.qty,0);
  return <><Header cartCount={cartCount} onCart={()=>setDrawerOpen(true)} onSearch={setSearchTerm}/><Routes>
    <Route path="/" element={<HomePage addToCart={addToCart} onQuickView={setQuickProduct} searchTerm={searchTerm}/>}/>
    <Route path="/shop" element={<ShopPage addToCart={addToCart} onQuickView={setQuickProduct} searchTerm={searchTerm}/>}/>
    <Route path="/product/:id" element={<ProductPage addToCart={addToCart} onQuickView={setQuickProduct}/>}/>
    <Route path="/cart" element={<CartPage cart={cart} setCart={setCart}/>}/>
    <Route path="/checkout" element={<CheckoutPage cart={cart} setCart={setCart}/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/blog" element={<BlogPage/>}/>
    <Route path="*" element={<main className="container page-main empty-state"><h1>Page not found</h1><Link to="/" className="primary-btn">Go home</Link></main>}/>
  </Routes><Footer/><CartDrawer open={drawerOpen} onClose={()=>setDrawerOpen(false)} cart={cart} setCart={setCart}/><QuickView product={quickProduct} onClose={()=>setQuickProduct(null)} addToCart={addToCart}/></>;
}