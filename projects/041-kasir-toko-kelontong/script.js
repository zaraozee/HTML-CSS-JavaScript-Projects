const produkData = [
    { id: 1, nama: "Buku Tulis", harga: 5000, kategori: "Alat Tulis" },
    { id: 2, nama: "Pensil 2B", harga: 2000, kategori: "Alat Tulis" },
    { id: 3, nama: "Pulpen Pilot", harga: 3000, kategori: "Alat Tulis" },
    { id: 4, nama: "Penghapus", harga: 1500, kategori: "Alat Tulis" },
    { id: 5, nama: "Penggaris 30cm", harga: 4000, kategori: "Alat Tulis" },
    { id: 6, nama: "Stapler", harga: 25000, kategori: "Peralatan Kantor" },
    { id: 7, nama: "Gunting", harga: 15000, kategori: "Peralatan Kantor" },
    { id: 8, nama: "Map Plastik", harga: 2000, kategori: "Peralatan Kantor" },
    { id: 9, nama: "Tipe-X", harga: 5000, kategori: "Alat Tulis" },
    { id: 10, nama: "Kertas HVS A4", harga: 35000, kategori: "Kertas" },
    { id: 11, nama: "Post-it Note", harga: 12000, kategori: "Peralatan Kantor" },
    { id: 12, nama: "Binder Clip", harga: 8000, kategori: "Peralatan Kantor" },
];

let cart = [];
let categories = [];

const produkListEl = document.querySelector('.produk-list');
const cartItemsEl = document.getElementById('cart-items');
const totalAmountEl = document.getElementById('total-amount');
const changeAmountEl = document.getElementById('change-amount');
const resetBtn = document.getElementById('reset-btn');
const bayarBtn = document.getElementById('bayar-btn');
const printBtn = document.getElementById('print-btn');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const categorySelect = document.getElementById('category-select');
const paymentAmountInput = document.getElementById('payment-amount');
const calculateBtn = document.getElementById('calculate-btn');
const receiptModal = document.getElementById('receipt-modal');
const receiptContent = document.getElementById('receipt-content');
const printReceiptBtn = document.getElementById('print-receipt-btn');
const closeBtn = document.querySelector('.close-btn');

function initCategories() {
    categories = [...new Set(produkData.map(produk => produk.kategori))];
    categorySelect.innerHTML = '<option value="all">Semua Kategori</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

function renderProdukList(searchTerm = '', category = 'all') {
    produkListEl.innerHTML = '';
    
    let filteredProduk = produkData;
    if (searchTerm) {
        filteredProduk = filteredProduk.filter(produk => 
            produk.nama.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    if (category !== 'all') {
        filteredProduk = filteredProduk.filter(produk => 
            produk.kategori === category
        );
    }
    
    if (filteredProduk.length === 0) {
        produkListEl.innerHTML = '<div class="no-product">Tidak ada produk yang ditemukan</div>';
        return;
    }
    
    filteredProduk.forEach(produk => {
        const produkEl = document.createElement('div');
        produkEl.className = 'produk-item';
        produkEl.innerHTML = `
            <div class="produk-nama">${produk.nama}</div>
            <div class="produk-harga">Rp ${produk.harga.toLocaleString()}</div>
            <div class="produk-kategori">${produk.kategori}</div>
        `;
        
        produkEl.addEventListener('click', () => addToCart(produk));
        produkListEl.appendChild(produkEl);
    });
}

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
    showNotification(`${produk.nama} ditambahkan ke keranjang`);
}

function renderCart() {
    cartItemsEl.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<tr><td colspan="5" style="text-align: center;">Keranjang kosong</td></tr>';
        totalAmountEl.textContent = 'Rp 0';
        changeAmountEl.textContent = 'Rp 0';
        paymentAmountInput.value = '';
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
                    <button class="qty-btn minus" data-id="${item.id}"><i class="fas fa-minus"></i></button>
                    ${item.qty}
                    <button class="qty-btn plus" data-id="${item.id}"><i class="fas fa-plus"></i></button>
                </div>
            </td>
            <td>Rp ${subtotal.toLocaleString()}</td>
            <td><button class="delete-btn" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button></td>
        `;
        
        cartItemsEl.appendChild(row);
    });
    
    totalAmountEl.textContent = `Rp ${total.toLocaleString()}`;

    document.querySelectorAll('.qty-btn.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            updateQty(id, -1);
        });
    });
    
    document.querySelectorAll('.qty-btn.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            updateQty(id, 1);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            removeFromCart(id);
        });
    });
}

function updateQty(id, change) {
    const item = cart.find(item => item.id === id);
    
    if (item) {
        item.qty += change;
        
        if (item.qty <= 0) {
            cart = cart.filter(item => item.id !== id);
            showNotification("Produk dihapus dari keranjang");
        }
    }
    
    renderCart();
}

function removeFromCart(id) {
    const item = cart.find(item => item.id === id);
    cart = cart.filter(item => item.id !== id);
    renderCart();
    showNotification(`${item.nama} dihapus dari keranjang`);
}

function calculateChange() {
    const paymentAmount = parseFloat(paymentAmountInput.value);
    const total = getTotalAmount();
    
    if (isNaN(paymentAmount)) {
        showNotification("Masukkan jumlah pembayaran yang valid");
        return;
    }
    
    if (paymentAmount < total) {
        showNotification("Jumlah pembayaran kurang");
        changeAmountEl.textContent = "Rp 0";
        return;
    }
    
    const change = paymentAmount - total;
    changeAmountEl.textContent = `Rp ${change.toLocaleString()}`;
}

function getTotalAmount() {
    return cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);
}

function resetTransaction() {
    cart = [];
    renderCart();
    paymentAmountInput.value = '';
    showNotification("Transaksi direset");
}

function bayar() {
    if (cart.length === 0) {
        showNotification('Keranjang belanja kosong!');
        return;
    }
    
    const paymentAmount = parseFloat(paymentAmountInput.value);
    const total = getTotalAmount();
    
    if (isNaN(paymentAmount)) {
        showNotification("Masukkan jumlah pembayaran terlebih dahulu");
        return;
    }
    
    if (paymentAmount < total) {
        showNotification("Jumlah pembayaran kurang");
        return;
    }
    
    const change = paymentAmount - total;

    generateReceipt(total, paymentAmount, change);
    openReceiptModal();
    resetTransaction();
}

function generateReceipt(total, paymentAmount, change) {
    const now = new Date();
    const dateTime = now.toLocaleString();
    
    let receiptText = `=== TOKO KELONTONG ===\n`;
    receiptText += `Tanggal: ${dateTime}\n`;
    receiptText += `========================\n`;
    receiptText += `ITEM          QTY   SUBTOTAL\n`;
    receiptText += `------------------------\n`;
    
    cart.forEach(item => {
        const subtotal = item.harga * item.qty;
        receiptText += `${item.nama.padEnd(15)} ${item.qty.toString().padEnd(5)} Rp ${subtotal.toLocaleString()}\n`;
    });
    
    receiptText += `========================\n`;
    receiptText += `TOTAL: Rp ${total.toLocaleString()}\n`;
    receiptText += `BAYAR: Rp ${paymentAmount.toLocaleString()}\n`;
    receiptText += `KEMBALI: Rp ${change.toLocaleString()}\n`;
    receiptText += `========================\n`;
    receiptText += `Terima kasih telah berbelanja!\n`;
    receiptText += `=== www.tokokelontong.com ===`;
    
    receiptContent.textContent = receiptText;
}

function openReceiptModal() {
    receiptModal.style.display = 'block';
}

function closeReceiptModal() {
    receiptModal.style.display = 'none';
}

function printReceipt() {
    const printContent = receiptContent.textContent;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = `<pre>${printContent}</pre>`;
    window.print();
    document.body.innerHTML = originalContent;
    renderCart();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

resetBtn.addEventListener('click', resetTransaction);
bayarBtn.addEventListener('click', bayar);
printBtn.addEventListener('click', generateReceipt.bind(null, getTotalAmount(), parseFloat(paymentAmountInput.value) || 0, parseFloat(changeAmountEl.textContent.replace('Rp ', '').replace(/\./g, '') || 0)));
printBtn.addEventListener('click', openReceiptModal);
searchBtn.addEventListener('click', () => {
    renderProdukList(searchInput.value, categorySelect.value);
});
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        renderProdukList(searchInput.value, categorySelect.value);
    }
});
categorySelect.addEventListener('change', () => {
    renderProdukList(searchInput.value, categorySelect.value);
});
calculateBtn.addEventListener('click', calculateChange);
paymentAmountInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        calculateChange();
    }
});
closeBtn.addEventListener('click', closeReceiptModal);
printReceiptBtn.addEventListener('click', printReceipt);

window.addEventListener('click', (e) => {
    if (e.target === receiptModal) {
        closeReceiptModal();
    }
});

initCategories();
renderProdukList();
renderCart();

const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #2ecc71;
        color: white;
        padding: 12px 24px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slide-in 0.5s ease-out;
    }
    
    .fade-out {
        animation: fade-out 0.5s ease-out forwards;
    }
    
    @keyframes slide-in {
        from { bottom: -50px; opacity: 0; }
        to { bottom: 20px; opacity: 1; }
    }
    
    @keyframes fade-out {
        from { bottom: 20px; opacity: 1; }
        to { bottom: -50px; opacity: 0; }
    }
`;
document.head.appendChild(notificationStyle);