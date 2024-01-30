function solve() {
    document.querySelector("#btnSend").addEventListener("click", onClick);

    function onClick() {
        let restaurants = {};
        const newRestaurants = JSON.parse(document.querySelector("#inputs textarea").value);
        newRestaurants.forEach((restaurant) => {
            let [restaurantName, restaurantWorkers] = restaurant.split(" - ");
            // console.log("name", restaurantName, "workers", restaurantWorkers);
            if (!restaurants.hasOwnProperty(restaurantName)) {
                restaurants[restaurantName] = [];
            }
            restaurantWorkers.split(", ").forEach((worker) => {
                let [workerName, salary] = worker.split(" ");
                const newWorker = { name: workerName, salary: Number(salary) };
                restaurants[restaurantName].push(newWorker);
            });
        });

        let getBestRestaurant = function () {
            let bestRestaurant;
            let bestAvgSalary = 0;

            Object.entries(restaurants).forEach((restaurant) => {
                let avgSalary = 0;
                let bestIndividualSalary = 0;
                restaurant[1].forEach((worker) => {
                    avgSalary += worker.salary;
                    if (worker.salary > bestIndividualSalary) {
                        bestIndividualSalary = worker.salary;
                    }
                });
                avgSalary /= restaurant[1].length;
                restaurant.avgSalary = avgSalary;
                restaurant.bestIndividualSalary = bestIndividualSalary;

                if (restaurant.avgSalary > bestAvgSalary) {
                    bestAvgSalary = restaurant.avgSalary;
                    bestRestaurant = restaurant;
                }
            });
            return bestRestaurant;
        };

        let bestRestaurant = getBestRestaurant();
        let restaurantInfo = `Name: ${bestRestaurant[0]} Average Salary: ${bestRestaurant.avgSalary.toFixed(
            2
        )} Best Salary: ${bestRestaurant.bestIndividualSalary.toFixed(2)}`;

        let restaurantWorkers = [];
        Object.entries(bestRestaurant[1])
            .sort(([, a], [, b]) => b.salary - a.salary)
            .forEach(([, worker]) => {
                restaurantWorkers.push(`Name: ${worker.name} With Salary: ${worker.salary}`);
            });

        document.querySelector("#bestRestaurant p").textContent = restaurantInfo;
        document.querySelector("#workers p").textContent = restaurantWorkers.join(" ");
    }
}

// TESTS:
// ["PizzaHut - Peter 500, George 300, Mark 800","TheLake - Bob 1300, Joe 780, Jane 1660","TheLake2 - Bob 1300, Joe 780, Jane 1660"]
