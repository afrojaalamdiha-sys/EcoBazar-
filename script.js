const products = [
  {id:1,name:"Green Apple",category:"Fresh Fruits",price:3.99,old:4.99,badge:"BEST SELLER",img:"https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=500&q=85"},
  {id:2,name:"Fresh Mango",category:"Fresh Fruits",price:5.99,old:6.99,badge:"SALE",img:"https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=500&q=85"},
  {id:3,name:"Cherry Tomato",category:"Fresh Vegetables",price:4.99,old:5.49,badge:"ORGANIC",img:"https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=500&q=85"},
  {id:4,name:"Cauliflower",category:"Fresh Vegetables",price:3.49,old:4.29,badge:"ORGANIC",img:"https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=500&q=85"},
  {id:5,name:"Fresh Broccoli",category:"Fresh Vegetables",price:2.79,old:3.49,badge:"SALE",img:"https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=500&q=85"},
  {id:6,name:"Green Bell Pepper",category:"Fresh Vegetables",price:3.99,old:4.49,badge:"FRESH",img:"https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=500&q=85"},
  {id:7,name:"Green Chili",category:"Fresh Vegetables",price:2.29,old:2.99,badge:"ORGANIC",img:"https://images.unsplash.com/photo-1588252303782-cb80119bad7d?auto=format&fit=crop&w=500&q=85"},
  {id:8,name:"Fresh Eggplant",category:"Fresh Vegetables",price:4.49,old:5.49,badge:"SALE",img:"https://images.unsplash.com/photo-1659261200825-3a1a4f4f6d6d?auto=format&fit=crop&w=500&q=85"},
  {id:9,name:"Sweet Orange",category:"Fresh Fruits",price:3.29,old:3.99,badge:"FRESH",img:"https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=500&q=85"},
  {id:10,name:"Organic Lettuce",category:"Fresh Vegetables",price:2.99,old:3.59,badge:"ORGANIC",img:"https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=500&q=85"},
  {id:11,name:"Fresh Green Beans",category:"Fresh Vegetables",price:3.59,old:4.19,badge:"FRESH",img:"https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=500&q=85"},
  {id:12,name:"Farm Fresh Carrots",category:"Fresh Vegetables",price:2.49,old:2.99,badge:"ORGANIC",img:"https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=500&q=85"}
];
let cart = [];
let activeFilter = "All";
let showAll = false;
const money = n => `$${n.toFixed(2)}`;
const card = p => `<article class="product-card"><span class="product-badge ${p.badge==='SALE'?'sale':''}">${p.badge}</span><div class="product-image"><img src="${p.img}" alt="${p.name}" loading="lazy"></div><div class="product-info"><h3>${p.name}</h3><div class="rating">★★★★★</div><div class="price">${money(p.price)} <span class="old-price">${money(p.old)}</span></div><button class="add-button" data-add="${p.id}">＋ &nbsp; Add to Cart</button></div></article>`;
function renderProducts(){
  const filtered = products.filter(p => activeFilter==="All" || p.category===activeFilter);
  const visible = showAll ? filtered : filtered.slice(0,8);
  document.getElementById("productGrid").innerHTML = visible.map(card).join("");
  document.getElementById("featuredGrid").innerHTML = [products[0],products[7],products[8],products[9],products[6]].map(card).join("");
  document.getElementById("viewAll").textContent = showAll ? "Show Less ↑" : "View All Products →";
}
function updateCart(){
  const count = cart.reduce((s,p)=>s+p.qty,0), total = cart.reduce((s,p)=>s+p.price*p.qty,0);
  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent = money(total);
  document.getElementById("drawerTotal").textContent = money(total);
  const holder = document.getElementById("cartItems");
  holder.innerHTML = cart.length ? cart.map(p=>`<div class="cart-row"><img src="${p.img}" alt=""><div class="cart-row-info"><b>${p.name}</b><small>${money(p.price)}</small><div class="qty-control"><button data-qty="${p.id}" data-change="-1">−</button><span>${p.qty}</span><button data-qty="${p.id}" data-change="1">＋</button></div></div></div>`).join("") : '<p class="empty-cart">Your cart is empty. Let’s find something fresh!</p>';
}
function toast(message){const t=document.getElementById("toast");t.textContent=message;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("drawerBackdrop").classList.add("show");document.getElementById("cartDrawer").setAttribute("aria-hidden","false")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("drawerBackdrop").classList.remove("show");document.getElementById("cartDrawer").setAttribute("aria-hidden","true")}
document.addEventListener("click",e=>{
  const add=e.target.closest("[data-add]");
  if(add){const p=products.find(x=>x.id===Number(add.dataset.add));const existing=cart.find(x=>x.id===p.id);existing?existing.qty++:cart.push({...p,qty:1});updateCart();toast(`${p.name} added to your cart`);}
  const qty=e.target.closest("[data-qty]");
  if(qty){const p=cart.find(x=>x.id===Number(qty.dataset.qty));p.qty+=Number(qty.dataset.change);if(p.qty<=0)cart=cart.filter(x=>x.id!==p.id);updateCart();}
});
document.getElementById("filters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;activeFilter=b.dataset.filter;showAll=false;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts()});
document.getElementById("viewAll").addEventListener("click",()=>{showAll=!showAll;renderProducts()});
document.getElementById("cartButton").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
document.getElementById("drawerBackdrop").addEventListener("click",closeCart);
document.getElementById("checkoutButton").addEventListener("click",()=>toast(cart.length?"Checkout demo — connect a payment provider to accept orders.":"Your cart is empty."));
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("navLinks").classList.toggle("open"));
document.getElementById("navLinks").addEventListener("click",e=>{if(e.target.tagName==="A")document.getElementById("navLinks").classList.remove("open")});
document.getElementById("searchForm").addEventListener("submit",e=>{e.preventDefault();const q=document.getElementById("searchInput").value.trim().toLowerCase();const found=products.filter(p=>p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q));document.getElementById("productGrid").innerHTML=found.length?found.map(card).join(""):'<p style="grid-column:1/-1;text-align:center;color:#888;padding:35px">No products found. Try another search.</p>';document.getElementById("products").scrollIntoView({behavior:"smooth"})});
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();toast("Thanks for subscribing!");e.target.reset()});
document.getElementById("playButton").addEventListener("click",()=>toast("Our farm story video is coming soon!"));
function countdown(){const now=new Date(),end=new Date();end.setDate(now.getDate()+5);end.setHours(23,59,59,999);let s=Math.max(0,Math.floor((end-now)/1000));const vals=[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60];document.querySelectorAll("#countdown b").forEach((el,i)=>el.textContent=String(vals[i]).padStart(2,"0"))}
renderProducts();updateCart();countdown();setInterval(countdown,1000);
