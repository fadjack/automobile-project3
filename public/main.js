const search_input = document.getElementById('search');
const results = document.getElementById('results');
let search_term = '';
let cars;
const fetchcars = async () => {
  cars = await fetch('http://localhost:3000/apisearch')
    .then(res => res.json());
	// console.log(products);
}
const showcars = async () => {
	// clearHTML
	results.innerHTML = '';
	// getting the data
	await fetchcars();
	// creating the structure
  const ul = document.createElement("ul");
  // console.log(products);
	cars.filter(
    cars => cars.name.toLowerCase().includes(search_term.toLowerCase()) 
	).forEach(cars => {
    console.log(cars);
		const li = document.createElement('li');
    let cars_name = document.createElement('a');
    cars_name.innerText = cars.name;
    cars_name.href = "/Pagesingle/" + cars.car_id;
   //cars_name.classList.add('cars-name');
		li.appendChild(cars_name);
    ul.appendChild(li);
	})
	results.appendChild(ul);
}
console.log(search_input);
// showProducts();
  search_input.addEventListener('input', (e) => {
    search_term = e.target.value;
    if (search_term.length > 0) {
          // re-display countries again based on the new search_term
    showcars();
    } else {
      results.innerHTML = '';
    }
  });
 