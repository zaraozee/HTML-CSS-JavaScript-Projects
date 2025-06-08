// Data produk
const produkData = [
    { id: 1, nama: "Buku Tulis", harga: 5000 },
    { id: 2, nama: "Pensil", harga: 2000 },
    { id: 3, nama: "Pulpen", harga: 3000 },
    { id: 4, nama: "Penghapus", harga: 1500 },
    { id: 5, nama: "Penggaris", harga: 4000 },
    { id: 6, nama: "Stapler", harga: 25000 },
    { id: 7, nama: "Gunting", harga: 15000 },
    { id: 8, nama: "Map Plastik", harga: 2000 },
];

// Variabel keranjang belanja
let cart = [];

// DOM Elements
const produkListEl = document.querySelector('.produk-list');
const cartItemsEl = document.getElementById('cart-items');
const totalAmountEl = document.getElementById('total-amount');
const resetBtn = document.getElementById('reset-btn');
const bayarBtn = document.getElementById('bayar-btn');

// Render daftar produk
function renderProdukList() {
    produkListEl.innerHTML = '';
    
    produkData.forEach(produk => {
        const produkEl = document.createElement('div');
        produkEl.className = 'produk-item';
        produkEl.innerHTML = `
            <div class="produk-nama">${produk.nama}</div>
            <div class="produk-harga">Rp ${produk.harga.toLocaleString()}</div>
        `;
        
        produkEl.addEventListener('click', () => addToCart(produk));
        produkListEl.appendChild(produkEl);
    });
}

// Tambah produk ke keranjang
function addToCart(produk) {
    const existingItem = cart.find(item => item.id === produk.id);
    
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            id: produk.id,
            nama: produk.nama,
            harga: produk.harga,
            qty: 1
        });
    }
    
    renderCart();
}

// Render keranjang belanja
function renderCart() {
    cartItemsEl.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<tr><td colspan="5" style="text-align: center;">Keranjang kosong</td></tr>';
        totalAmountEl.textContent = 'Rp 0';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const subtotal = item.harga * item.qty;
        total += subtotal;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.nama}</td>
            <td>Rp ${item.harga.toLocaleString()}</td>
            <td>
                <div class="qty-control">
                    <button class="qty-btn minus" data-id="${item.id}">-</button>
                    ${item.qty}
                    <button class="qty-btn plus" data-id="${item.id}">+</button>
                </div>
            </td>
            <td>Rp ${subtotal.toLocaleString()}</td>
            <td><button class="delete-btn" data-id="${item.id}">Hapus</button></td>
        `;
        
        cartItemsEl.appendChild(row);
    });
    
    totalAmountEl.textContent = `Rp ${total.toLocaleString()}`;
    
    // Tambahkan event listener untuk tombol + dan -
    document.querySelectorAll('.qty-btn.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            updateQty(id, -1);
        });
    });
    
    document.querySelectorAll('.qty-btn.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            updateQty(id, 1);
        });
    });
    
    // Tambahkan event listener untuk tombol hapus
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(id);
        });
    });
}

// Update jumlah produk
function updateQty(id, change) {
    const item = cart.find(item => item.id === id);
    
    if (item) {
        item.qty += change;
        
        if (item.qty <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
    }
    
    renderCart();
}

// Hapus produk dari keranjang
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

// Reset transaksi
function resetTransaction() {
    cart = [];
    renderCart();
}

// Bayar
function bayar() {
    if (cart.length === 0) {
        alert('Keranjang belanja kosong!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);
    alert(`Terima kasih telah berbelanja!\nTotal pembayaran: Rp ${total.toLocaleString()}`);
    resetTransaction();
}

// Event Listeners
resetBtn.addEventListener('click', resetTransaction);
bayarBtn.addEventListener('click', bayar);

// Inisialisasi
renderProdukList();
renderCart();