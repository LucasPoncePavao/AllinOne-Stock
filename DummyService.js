const users = {
  usuario1: {
    categories: ['Caixa', 'Caixa 2', 'Caixa 3', 'Caixa 4', 'Caixa 5'],
    products: [],
    sales: [],
  },
  usuario2: {
    categories: ['Estante', 'Estante 2', 'Estante 3', 'Estante 4', 'Estante 5'],
    products: [],
    sales: [],
  },
}

for (let user in users) {
  for (let i = 1; i <= 25; i++) {
    const product = {
      id: i,
      name: `${users[user].categories[0]} ${i}`,
      price: Math.floor(Math.random() * 100) + 1,
      category:
        users[user].categories[
          Math.floor(Math.random() * users[user].categories.length)
        ],
      stock: Math.floor(Math.random() * 200) + 1,
      maxStock: Math.floor(Math.random() * 200) + 1,
      minStock: Math.floor(Math.random() * 200) + 1,
    }
    users[user].products.push(product)
  }

  for (let year of [2019, 2020, 2021, 2022, 2023]) {
    for (let month = 1; month <= 12; month++) {
      for (let sale = 1; sale <= 2; sale++) {
        const saleItem = {
          id: users[user].sales.length + 1,
          productId:
            Math.floor(Math.random() * users[user].products.length) + 1,
          quantity: Math.floor(Math.random() * 10) + 1,
          date: `${year}-${month.toString().padStart(2, '0')}-${
            Math.floor(Math.random() * 28) + 1
          }`,
        }
        users[user].sales.push(saleItem)
      }
    }
  }
}

export default users
