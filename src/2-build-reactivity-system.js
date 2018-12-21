// How JavaScript usually works

/*
let price = 5
let quantity = 2
let total = price * quantity

console.log(`Total is ${total}`) // Total is 10

quantity = 3

// Change the 'quantity' value doesn't update the total value
console.log(`Total is ${total}`) // Total is 10
*/

// How can we create a more scalable solution,
// a class to store our dependencies?

/*
class Dep {
  constructor () {
    this.subscribers = []
  }
  depend () {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target)
    }
  }
  notify () {
    this.subscribers.forEach(sub => sub())
  }
}

const dep = new Dep()

let price = 5
let quantity = 2
let total = 0

let target = () => { total = price * quantity }

dep.depend()
target()
*/

let data = { price: 5, quantity: 2 }
let target = null

class Dep {
  constructor () {
    this.subscribers = []
  }
  depend () {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target)
    }
  }
  notify () {
    this.subscribers.forEach(sub => sub())
  }
}

Object.keys(data).forEach(key => {
  let internalValue = data[key]

  const dep = new Dep()

  Object.defineProperty(data, key, {
    get () {
      dep.depend()
      return internalValue
    },
    set (newValue) {
      internalValue = newValue
      dep.notify()
    }
  })
})

function watcher (myFunc) {
  target = myFunc
  target()
  target = null
}

watcher(() => { data.total = data.price * data.quantity })
