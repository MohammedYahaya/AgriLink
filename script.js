function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

document.querySelectorAll('[data-section]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const section = e.target.getAttribute('data-section');
    showSection(section);
    if (section === 'products') {
      loadAllProducts();
    }
  });
});

// Sign Up
document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  const res = await fetch('register.php', {
    method: 'POST',
    body: formData
  });

  const text = await res.text();
  if (text === 'success') {
    alert('Account created successfully. Please login.');
    showSection('login');
  } else {
    alert('Signup failed. Try again.');
  }
});

// Login
document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  const res = await fetch('login.php', {
    method: 'POST',
    body: formData
  });

  const text = await res.text();
  if (text === 'success') {
    alert('Login successful.');
    showDashboard();
  } else {
    alert('Invalid credentials.');
  }
});

// Show Dashboard
function showDashboard() {
  fetch('get_products.php')
    .then(res => res.json())
    .then(data => {
      const user = data.find(p => p.user_id);
      document.getElementById('userName').textContent = user?.full_name || "Farmer";
    });

  showSection('dashboard');
  document.getElementById('logoutBtn').classList.remove('hidden');
  document.getElementById('loginLink').classList.add('hidden');

  loadUserProducts();
}

// Upload Product
document.getElementById("uploadForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  const res = await fetch('upload_product.php', {
    method: 'POST',
    body: formData
  });

  const text = await res.text();
  if (text === 'success') {
    alert('Product uploaded!');
    this.reset();
    loadUserProducts();
  } else {
    alert('Upload failed.');
  }
});

// Load user products
function loadUserProducts() {
  fetch('get_products.php')
    .then(res => res.json())
    .then(data => {
      const grid = document.getElementById('productList');
      grid.innerHTML = '';
      data.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="uploads/${product.image}" style="max-width:100%; border-radius:8px;" />
          <h3>${product.name}</h3>
          <p>by ${product.full_name}</p>
        `;
        grid.appendChild(card);
      });
    });
}

// Load all products (Marketplace)
function loadAllProducts() {
  fetch('get_products.php')
    .then(res => res.json())
    .then(data => {
      const grid = document.getElementById('marketProducts');
      grid.innerHTML = '';
      data.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="uploads/${product.image}" style="max-width:100%; border-radius:8px;" />
          <h3>${product.name}</h3>
          <p>by ${product.full_name}</p>
        `;
        grid.appendChild(card);
      });
    });
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  fetch('logout.php').then(() => {
    showSection('home');
    document.getElementById('logoutBtn').classList.add('hidden');
    document.getElementById('loginLink').classList.remove('hidden');
  });
});

// Load homepage
window.onload = () => {
  showSection('home');
};
