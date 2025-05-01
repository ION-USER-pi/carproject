document.addEventListener('DOMContentLoaded', function() {
  // Define car data
  const baseCars = [
    {
      image: 'images/1.png',
      title: 'BMW M4 Competition',
      text: 'Идеальный баланс скорости и стиля. BMW M4 Competition — 510 л.с. и драйв, созданный для покорения трасс и городских улиц.',
      prices: [1450, 1300, 1100],
    },
    {
      image: 'images/2.png',
      title: 'BMW M5',
      text: 'Бизнес-класс с душой гонщика. BMW M5: 600 л.с., интеллектуальный полный привод и комфорт для самых требовательных.',
      prices: [1600, 1450, 1250],
    },
    {
      image: 'images/3.png',
      title: 'Lamborghini Huracan Spyder Green',
      text: 'Воплощение скорости и страсти. Зеленый Lamborghini Huracan Spyder — мощь 640 л.с. и открытый верх для ярких приключений.',
      prices: [3200, 2900, 2600],
    },
    {
      image: 'images/4.png',
      title: 'Ferrari F8 Spider',
      text: 'Мечта на колесах. Ferrari F8 Spider: 720 л.с., аэродинамика F1 и открытая кабина для тех, кто живет на полной скорости.',
      prices: [3500, 3200, 2900],
    },
    {
      image: 'images/5.png',
      title: 'Porsche 911 Targa 4S Yellow',
      text: 'Элегантная мощь в ярком цвете. Porsche 911 Targa 4S: полный привод, 450 л.с. и уникальный стиль Targa.',
      prices: [1800, 1650, 1450],
    },
    {
      image: 'images/6.png',
      title: 'Mercedes SL 55 AMG',
      text: 'Классика спортивного шика. Mercedes SL 55 AMG: роскошь, кабриолет и мощь 469 л.с. для незабываемых поездок.',
      prices: [1700, 1550, 1350],
    },
    {
      image: 'images/7.png',
      title: 'BMW Z4',
      text: 'Компактный кабриолет для стильных путешествий. BMW Z4: идеальный союз маневренности, мощности и элегантного дизайна.',
      prices: [1200, 1100, 950],
    },
    {
      image: 'images/8.png',
      title: 'Mercedes C180 Convertible',
      text: 'Идеальный выбор для солнечного дня. Mercedes C180 Convertible: кабриолет для легкого и комфортного вождения.',
      prices: [1000, 900, 800],
    },
    {
      image: 'images/9.png',
      title: 'Chevrolet Corvette Orange',
      text: 'Яркий, мощный, незабываемый. Chevrolet Corvette в оранжевом цвете: 495 л.с. и стиль, который говорит сам за себя.',
      prices: [1400, 1250, 1100],
    },
    {
      image: 'images/10.png',
      title: 'Audi R8 Blue',
      text: 'Суперкар, созданный для влюбленных в скорость. Audi R8 Blue: полный привод, 570 л.с. и потрясающий дизайн.',
      prices: [2000, 1850, 1600],
    },
    {
      image: 'images/11.png',
      title: 'Chevrolet Corvette White',
      text: 'Классическая мощь в изысканном цвете. Chevrolet Corvette White: мощность, динамика и стиль для настоящих ценителей.',
      prices: [1350, 1200, 1000],
    },
    {
      image: 'images/12.png',
      title: 'Ford Mustang Convertible Black',
      text: 'Легенда в открытом формате. Ford Mustang Convertible Black: 450 л.с., культовый стиль и свобода под открытым небом.',
      prices: [1250, 1150, 1000],
    },
  ];

  const carsFilter = [
    {
      active: true,
      name: 'Все марки',
    },
    {
      active: false,
      name: 'Lamborghini',
    },
    {
      active: false,
      name: 'Ferrari',
    },
    {
      active: false,
      name: 'Porsche',
    },
    {
      active: false,
      name: 'BMW',
    },
    {
      active: false,
      name: 'Mercedes',
    },
    {
      active: false,
      name: 'Chevrolet',
    },
    {
      active: false,
      name: 'Audi',
    },
    {
      active: false,
      name: 'Ford',
    },
  ];

  let cars = [...baseCars];

  // Create filter elements
  const filterContainer = document.querySelector('.cars-filter ul');
  if (filterContainer) {
    filterContainer.innerHTML = '';
    carsFilter.forEach((filter, index) => {
      const li = document.createElement('li');
      li.className = filter.active ? 'active' : '';
      li.textContent = filter.name;
      li.addEventListener('click', () => changeFilter(filter, index));
      filterContainer.appendChild(li);
    });
  }

  // Load cars initially
  updateCarsDisplay();

  // Scroll effects
  window.addEventListener('scroll', function() {
    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
      const offsetRight = -576 + window.scrollY * 0.2;
      mainImage.style.right = offsetRight + 'px';
    }
  });

  // Mouse move effects for order image
  document.addEventListener('mousemove', function(e) {
    const orderImg = document.querySelector('.order img');
    if (orderImg) {
      orderImg.style.transform = 'translate3d(' + 
        (e.clientX * 0.3) / 8 + 'px,' + 
        (e.clientY * 0.3) / 8 + 'px,0px)';
    }
  });

  // Handle form validation
  const orderForm = {
    car: document.getElementById('car'),
    name: document.getElementById('name'),
    phone: document.getElementById('phone'),
    button: document.getElementById('order-action')
  };

  if (orderForm.button) {
    orderForm.button.addEventListener('click', function() {
      sendOrder();
    });
  }

  // Check form inputs for validity
  ['name', 'phone', 'car'].forEach(field => {
    const element = orderForm[field];
    if (element) {
      element.addEventListener('input', function() {
        validateForm();
      });
    }
  });

  // Event listeners for booking buttons
  document.querySelectorAll('.car-action .button').forEach(button => {
    button.addEventListener('click', function(e) {
      const carTitle = this.closest('.car').querySelector('h4').textContent;
      if (orderForm.car) {
        orderForm.car.value = carTitle;
        validateForm();
      }
    });
  });

  // Filter change function
  function changeFilter(filter, index) {
    // Update active state
    carsFilter.forEach(f => f.active = false);
    carsFilter[index].active = true;
    
    // Update UI
    document.querySelectorAll('.cars-filter ul li').forEach((li, i) => {
      li.className = i === index ? 'active' : '';
    });

    const filterText = filter.name.toLowerCase();
    
    if (filterText === 'все марки') {
      cars = [...baseCars];
    } else {
      cars = baseCars.filter(item => 
        item.title.toLowerCase().includes(filterText)
      );
    }
    
    updateCarsDisplay();
    
    // Scroll into view
    const carsContent = document.getElementById('cars-content');
    if (carsContent) {
      carsContent.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Update cars display
  function updateCarsDisplay() {
    const carsItems = document.querySelector('.cars-items');
    if (!carsItems) return;
    
    carsItems.innerHTML = '';
    
    cars.forEach(car => {
      const carElement = document.createElement('article');
      carElement.className = 'car';
      
      const periods = ["на 1 сутки", "на 1-3 суток", "на 3+ суток"];
      let priceList = '';
      
      periods.forEach((period, i) => {
        priceList += `
          <li>
            <div class="car-period">${period}</div>
            <div class="car-price">
              ${car.prices[i]} $ ${i > 0 ? '<span>/сут</span>' : ''}
            </div>
          </li>
        `;
      });
      
      carElement.innerHTML = `
        <img src="${car.image}" alt="car" />
        <div class="car-details">
          <h4>${car.title}</h4>
          <p>${car.text}</p>
          <div class="car-action">
            <ul>${priceList}</ul>
            <a href="#order" class="button white-button">Забронировать</a>
          </div>
        </div>
      `;
      
      // Add event listener to the booking button
      const bookButton = carElement.querySelector('.button');
      bookButton.addEventListener('click', function() {
        if (orderForm.car) {
          orderForm.car.value = car.title;
          validateForm();
        }
      });
      
      carsItems.appendChild(carElement);
    });
  }

  // Form validation
  function validateForm() {
    const isValid = orderForm.car.value && 
                    orderForm.name.value && 
                    orderForm.phone.value && 
                    orderForm.phone.value.length >= 10;
    
    if (orderForm.button) {
      orderForm.button.disabled = !isValid;
    }
    
    // Add error class to invalid fields
    ['car', 'name', 'phone'].forEach(field => {
      const element = orderForm[field];
      if (element) {
        if ((field === 'phone' && element.value && element.value.length < 10) || 
            (!element.value && element.classList.contains('touched'))) {
          element.classList.add('error');
        } else {
          element.classList.remove('error');
        }
        
        // Mark as touched when user interacts
        element.addEventListener('blur', function() {
          this.classList.add('touched');
          validateForm();
        });
      }
    });
    
    return isValid;
  }

  // Send order function
  function sendOrder() {
    if (validateForm()) {
      alert('Спасибо за заявку! Мы скоро свяжемся с вами!');
      // Reset form
      orderForm.car.value = '';
      orderForm.name.value = '';
      orderForm.phone.value = '';
      orderForm.button.disabled = true;
      
      // Remove touched class
      ['car', 'name', 'phone'].forEach(field => {
        const element = orderForm[field];
        if (element) {
          element.classList.remove('touched');
          element.classList.remove('error');
        }
      });
    }
  }
});