$(document).ready(function () {

  let cart = {};




  $('.card button').on('click', function () {
    const card = $(this).closest('.card');
    const name = card.find('h2').text().trim();
    const priceText = card.find('p').last().text().replace('$', '');
    const price = parseFloat(priceText);

    if (cart[name]) {
      cart[name].qty += 1;
    } else {
      cart[name] = {
        price: price,
        qty: 1
      };
    }

    alert(name + ' has been added to your cart.');
    renderCart();
  });







function renderCart() {
  let total = 0;
  $('.cart-items').html('');

  $.each(cart, function (name, item) {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    $('.cart-items').append(`
      <div class="cart-item">
        <span class="item-name">${name} x${item.qty}</span>
        <span class="item-price">$${itemTotal}</span>
        <span class="remove-item" data-name="${name}">&times;</span>
      </div>
    `);
  });

  $('#cartTotal').text(total);


  $('.remove-item').css({
    color: '#e35302',
    cursor: 'pointer',
    fontWeight: 'bold'
  });
}







  $(document).on('click', '.remove-item', function () {
    const name = $(this).data('name');

    if (cart[name].qty > 1) {
      cart[name].qty -= 1;
    } else {
      delete cart[name];
    }

    renderCart();
  });





  $('#cart').on('click', function (e) {
    e.preventDefault();
    $('.cart-modal').fadeIn(200);
  });





  $('.close-cart').on('click', function () {
    $('.cart-modal').fadeOut(200);
  });






  $('#approveOrder').on('click', function () {
    if ($.isEmptyObject(cart)) {
      alert('Your cart is empty!');
      return;
    }

    alert('Your order will be at your door in 30 minutes.');

    cart = {};
    renderCart();
    $('.cart-modal').fadeOut(200);
  });








  $('#openRegister').on('click', function (e) {
    e.preventDefault();
    $('#loginModal').fadeOut();
    $('#registerModal').fadeIn();
  });

  $('#openLogin').on('click', function (e) {
    e.preventDefault();
    $('#registerModal').fadeOut();
    $('#loginModal').fadeIn();
  });

  $('.modal-overlay').on('click', function (e) {
    if (e.target === this) {
      $(this).fadeOut();
    }
  });

  $('.close-modal').on('click', function () {
    $('#registerModal').fadeOut();
  });

  $('.close-login').on('click', function () {
    $('#loginModal').fadeOut();
  });

  $('#registerForm').on('submit', function (e) {
    e.preventDefault();
    alert('Account created successfully!');
    $('#registerModal').fadeOut();
    this.reset();
  });

  $('#loginForm').on('submit', function (e) {
    e.preventDefault();
    alert('Logged in successfully!');
    $('#loginModal').fadeOut();
    this.reset();
  });









  $('a[data-category]').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const category = $(this).data('category');
    $('.menu-section').hide();
    $('#' + category).fadeIn(250);
  });

  $('.menu-close').on('click', function (e) {
    e.stopPropagation();
    $(this).closest('.menu-section').fadeOut(200);
  });

});
