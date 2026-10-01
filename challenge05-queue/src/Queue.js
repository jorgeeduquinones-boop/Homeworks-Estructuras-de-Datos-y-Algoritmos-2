export class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    return this.items.length > 0 ? this.items.shift() : null;
  }

  peek() {
    return this.items.length > 0 ? this.items[0] : null;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  getItemsSortedByArrival() {
    return [...this.items].sort((a, b) => new Date(a.arrivalDate) - new Date(b.arrivalDate));
  }
}

const getRandomArrivalDate = (minutesAgo) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutesAgo);
  return date.toISOString();
};

export const initialPeople = [
  {
    name: "Carlos Mendoza",
    amount: 200000,
    arrivalDate: getRandomArrivalDate(45)
  },
  {
    name: "Ana Lucía Gómez",
    amount: 550000,
    arrivalDate: getRandomArrivalDate(30)
  },
  {
    name: "Mateo Ortiz",
    amount: 100000,
    arrivalDate: getRandomArrivalDate(10)
  }
];