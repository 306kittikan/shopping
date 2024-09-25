import React, { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
const products = [
  { id: 1, name: 'ข้าวผัดกุ้ง', price: 60, image: 'https://i.pinimg.com/236x/8b/52/0c/8b520ccac4a4372d62d33770ece3c529.jpg' },
  { id: 2, name: 'ต้มยำกุ้ง', price: 80, image: 'https://i.pinimg.com/236x/c6/e7/86/c6e786c0ce50d60a5a12eb7f5660e415.jpg' },
  { id: 3, name: 'ผัดไทย', price: 50, image: 'https://i.pinimg.com/236x/38/65/7c/38657ca75e8cc8ed83dfa951afc829c0.jpg' },
  { id: 4, name: 'ส้มตำ', price: 40, image: 'https://i.pinimg.com/236x/df/c2/6d/dfc26dbb30fbd30542f4180ee557549d.jpg' },
  { id: 5, name: 'แกงเขียวหวาน', price: 70, image: 'https://i.pinimg.com/236x/a6/c6/84/a6c684eaed17152e3dbdac77e420c55f.jpg' },
  { id: 6, name: 'ข้าวมันไก่', price: 55, image: 'https://i.pinimg.com/236x/bb/98/6c/bb986c0ea51c95dcfb1200db2e87f96c.jpg' },
  { id: 7, name: 'ผัดกะเพราหมู', price: 50, image: 'https://i.pinimg.com/236x/b3/a3/16/b3a3164d2e1ff1da20cd17bc58b49be5.jpg' },
  { id: 8, name: 'มัสมั่นไก่', price: 75, image: 'https://i.pinimg.com/236x/da/96/39/da96393a8aacfd4a5e385bea996363f5.jpg' },
  { id: 9, name: 'ยำวุ้นเส้น', price: 60, image: 'https://i.pinimg.com/236x/32/0d/09/320d0971e33fa53d630194857dd0c54f.jpg' },
  { id: 10, name: 'ไข่ดาว', price: 10, image: 'https://i.pinimg.com/236x/aa/fc/de/aafcde24dec876a69c6170814ef18e98.jpg' },
];
const App = () => {
    const [cart, setCart] = useState([]);
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
  
    const addToCart = (product) => {
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        setCart(cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    };
  
    const removeFromCart = (productId) => {
      setCart(cart.filter(item => item.id !== productId));
    };
  
    const updateQuantity = (productId, change) => {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0));
    };
  
    const applyCoupon = () => {
      if (coupon === 'SAVE10') {
        setDiscount(10);
      } else if (coupon === 'SAVE20') {
        setDiscount(20);
      } else {
        setDiscount(0);
      }
    };
  
    const calculateTotal = () => {
      const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
      const discountAmount = subtotal * (discount / 100);
      const shipping = 20; // ปรับค่าส่งให้เหมาะสมกับอาหาร
      return subtotal - discountAmount + shipping;
    };
  
    return (
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-orange-600 text-white p-4 sticky top-0 z-10">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold">ร้านอาหารออนไลน์</h1>
            <div className="relative">
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </div>
          </div>
        </header>
  
        <main className="container mx-auto p-4">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">เมนูอาหาร</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map(product => (
                <div key={product.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.price.toLocaleString()} บาท</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
                  >
                    เพิ่มลงตะกร้า
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">ตะกร้าสินค้า</h2>
            {cart.length === 0 ? (
              <p>ไม่มีรายการอาหารในตะกร้า</p>
            ) : (
              <div>
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between border-b py-2">
                    <div className="flex items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600">{item.price.toLocaleString()} บาท</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 bg-gray-200 rounded">
                        <Minus size={16} />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 bg-gray-200 rounded">
                        <Plus size={16} />
                      </button>
                      <button onClick={() => removeFromCart(item.id)} className="ml-2 text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="mt-4">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="รหัสคูปอง"
                    className="border p-2 mr-2 rounded"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                  >
                    ใช้คูปอง
                  </button>
                </div>
                
                <div className="mt-4">
                  <p>ส่วนลด: {discount}%</p>
                  <p>ค่าจัดส่ง: 20 บาท</p>
                  <p className="font-bold text-xl mt-2">ยอดรวมทั้งหมด: {calculateTotal().toLocaleString()} บาท</p>
                </div>
  
                <button className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors mt-4">
                  สั่งอาหาร
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  };
  
  export default App;