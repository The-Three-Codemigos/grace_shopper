const {
  client,
  User,
  Product,
  Order,
  Review
} = require("./");

const { phones, tablets, laptops, watches } = require('../db/seedData.json')

async function buildTables() {
  try {
    console.log("Starting to build tables...");
    client.connect();

    await client.query(`
    DROP TABLE IF EXISTS order_items;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    `);

    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title varchar(255) NOT NULL,
        description text NOT NULL,
        price decimal(10,2) NOT NULL,
        quantity integer NOT NULL,
        category varchar(255) NOT NULL,
        image varchar(255) NOT NULL
      );

      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false
      );

      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        orderDate DATE DEFAULT CURRENT_DATE,
        "isCheckedOut" BOOLEAN DEFAULT false
      );

      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        user_id INTEGER REFERENCES users(id),
        title text NOT NULL,
        description text NOT NULL,
        rating INTEGER NOT NULL
      );

      CREATE TABLE order_items (
        id SERIAL PRIMARY KEY,
        "orderId" INTEGER REFERENCES orders(id),
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL
      );
    `);
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function populateInitialData() {
  console.log("Starting to create users...");

  await User.createUser({
    firstName: "Clayton",
    lastName: "Carver",
    email: "clayton@testemail.com",
    password: "password",
    isAdmin: true,
  });

  await User.createUser({
    firstName: "Ulysses",
    lastName: "Cortez",
    email: "ulysses@testemail.com",
    password: "alsopassword",
    isAdmin: true,
  });

  await User.createUser({
    firstName: "Kirk",
    lastName: "Bogle",
    email: "kirk@testemail.com",
    password: "athirdpassword",
    isAdmin: true,
  });

  console.log("Finished creating users!");

  await Promise.all(
    phones.map(async (phone) => {
      await Product.createProduct(phone);
    })
  );
  await Promise.all(
    tablets.map(async (tablet) => {
      await Product.createProduct(tablet);
    })
  );
  await Promise.all(
    laptops.map(async (laptop) => {
      await Product.createProduct(laptop);
    })
  );
  await Promise.all(
    watches.map(async (watch) => {
      await Product.createProduct(watch);
    })
  );

  console.log("Finished creating products!");

  // console.log("Starting to create orders...");
  // const order1 = await Order.createOrder({
  //   user_id: 1,
  //   product_id: 1,
  //   orderDate: "",
  //   isCheckedOut: true,
  // });

  // const order2 = await Order.createOrder({
  //   user_id: 2,
  //   product_id: 2,
  //   orderDate: "",
  //   isCheckedOut: true,
  // });

  // console.log("Finished creating orders!");

  console.log("Starting to create reviews...");
  await Review.createReview({
    product_id: 1,
    user_id: 1,
    title: "Great Product",
    description: "I love this product",
    rating: 5,
  });

  await Review.createReview({
    product_id: 2,
    user_id: 2,
    title: "Not a Great Product",
    description: "Its not great",
    rating: 5,
  });

  console.log("Finished creating reviews!");
}


buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
