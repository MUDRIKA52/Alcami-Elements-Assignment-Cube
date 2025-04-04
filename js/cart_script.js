/* add to cart left section js */
const images = [
    "assets/images/white alcami ingredients.webp", 
    "assets/images/alcami bottles.avif", 
    "assets/images/spoon image.avif", 
    "assets/images/stirrer image.avif", 
    "assets/images/white alcami with mushrooms.webp", 
    "assets/images/mushrooms.webp", 
    "assets/images/alcami brown front.avif", 
    "assets/images/alcami brown back.avif",
    "assets/images/alcami green front.avif",
    "assets/images/alcami green black.avif",
    "assets/images/alcami bottle and spoon.jpeg",
   " assets/images/brown alcami elements image.jpeg"
   ];
let currentIndex = 0;

const mainImage = document.getElementById("mainImage");
const thumbnails = document.getElementById("thumbnails");
const indicators = document.getElementById("indicators");

function updateSlider() {
    mainImage.src = images[currentIndex];
    document.querySelectorAll(".thumbnail").forEach((thumb, index) => {
        thumb.classList.toggle("active", index === currentIndex);
    });
    document.querySelectorAll(".indicator").forEach((ind, index) => {
        ind.classList.toggle("active", index === currentIndex);
    });
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
}

images.forEach((img, index) => {
    const thumb = document.createElement("img");
    thumb.src = img;
    thumb.classList.add("thumbnail");
    thumb.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
    });
    thumbnails.appendChild(thumb);

    const ind = document.createElement("div");
    ind.classList.add("indicator");
    ind.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
    });
    indicators.appendChild(ind);
});

updateSlider();
document.addEventListener("DOMContentLoaded", function () {
const flavorInputs = document.querySelectorAll('input[name="flavor"]');
const subscriptionImages = document.querySelectorAll(".every30 img");

function updateSubscriptionImages() {
    const selectedFlavor = document.querySelector('input[name="flavor"]:checked');
    if (selectedFlavor) {
        const selectedImage = selectedFlavor.closest(".flavor").querySelector("img").src;
        subscriptionImages.forEach(img => {
            img.src = selectedImage;
        });
    }
}

// Event Listener for all radio buttons
flavorInputs.forEach(input => {
    input.addEventListener("change", updateSubscriptionImages);
});

// Initialize with the default selected flavor
updateSubscriptionImages();
});


document.addEventListener("DOMContentLoaded", function () {
let cartItems = [];

function updateCart() {
    const cartContent = document.getElementById('cartContent');
    cartContent.innerHTML = "";

    if (cartItems.length === 0) {
        cartContent.innerHTML = "<p>Cart is empty.</p>";
    } else {
        cartItems.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.innerHTML = `
                <p><strong>Flavor:</strong> ${item.flavor}</p>
                <p><strong>Subscription:</strong> ${item.subscription}</p>
                <p><strong>Price:</strong> $${item.price}</p>
                <button class="remove-item" data-index="${index}" style="background:red; color:white; padding:5px; border:none; border-radius:5px; cursor:pointer;">Remove</button>
                <hr>
            `;
            cartContent.appendChild(itemElement);
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute("data-index");
                cartItems.splice(index, 1);
                updateCart();
            });
        });
    }

    const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    document.getElementById('totalAmount').innerText = `Total: $${totalPrice}`;
}

document.getElementById('cartButton').addEventListener('click', function () {
    const selectedFlavor = document.querySelector('input[name="flavor"]:checked').parentElement.innerText.trim();
    const selectedSubscription = document.querySelector('.option.active .option-header');

    if (!selectedSubscription) {
        alert("⚠️ Please select a subscription option before adding to cart!");
        return;
    }

    const priceText = selectedSubscription.querySelector("span").textContent;
    const price = priceText.match(/\d+/)[0]; // Extract numeric price
    const subscriptionText = selectedSubscription.innerText.split('$')[0].trim();

    cartItems.push({
        flavor: selectedFlavor,
        subscription: subscriptionText,
        price: price
    });

    updateCart();
    document.getElementById('cartSidebar').classList.add('active');
});

document.getElementById('closeCart').addEventListener('click', function () {
    document.getElementById('cartSidebar').classList.remove('active');
});

document.querySelector('.order-now').addEventListener('click', function () {
    if (cartItems.length === 0) {
        alert("⚠️ Your cart is empty! Add items before proceeding.");
        return;
    }

    this.innerText = "Proceeding to Checkout...";
    this.style.background = "#555";
    this.disabled = true;

    setTimeout(() => {
        this.innerText = "Order Now";
        this.style.background = "#ff6600";
        this.disabled = false;
        alert("✅ Redirecting to checkout...");
    }, 3000);
});
});
function toggleDetails(index) {
        const options = document.querySelectorAll('.option');
        options.forEach((option, i) => {
            const details = option.querySelector('.details');
            if (i === index) {
                details.style.display = details.style.display === 'block' ? 'none' : 'block';
                option.classList.toggle('active');
            } else {
                details.style.display = 'none';
                option.classList.remove('active');
            }
        });
    }