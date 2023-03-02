const {
  client,
  createUser,
  User,
  Product,
  Order
  // declare your model imports here
  // for example, User
} = require('./');

async function buildTables() {
  try {
    console.log("Starting to build tables...")
    client.connect();

    // drop tables in correct order

    // build tables in correct order

    await client.query(`
      DROP TABLE IF EXISTS order_items;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
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
        "userId" INTEGER REFERENCES users(id),
        "orderDate" DATE NOT NULL DEFAULT CURRENT_DATE,
        "isCheckedOut" BOOLEAN
      );

      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "userId" INTEGER REFERENCES users(id),
        "text" text NOT NULL
      );

      CREATE TABLE order_items (
        id SERIAL PRIMARY KEY,
        "orderId" INTEGER REFERENCES orders(id),
        "productId" INTEGER REFERENCES products(id),
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
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
    console.log("Starting to create users...");
    const user1 = await User.createUser({
      firstName: 'Clayton',
      lastName: 'Carver',
      email: 'clayton@testemail.com',
      password: 'password',
      isAdmin: true
    });

    const user2 = await User.createUser({
      firstName: 'Ulysses',
      lastName: 'Cortez',
      email: 'ulysses@testemail.com',
      password: 'alsopassword',
      isAdmin: true
    });

    const user3 = await User.createUser({
      firstName: 'Kirk',
      lastName: 'Bogle',
      email: 'kirk@testemail.com',
      password: 'athirdpassword',
      isAdmin: true
    });

    console.log("Finished creating users!");

    const product1 = await Product.createProduct({
      title: 'Computer',
      description: 'This is a computer',
      price: 1,
      quantity: 1,
      category: 'Electronics',
      image: 'something'
    });

    const product2 = await Product.createProduct({
      title: 'Desk',
      description: 'This is a desk',
      price: 5,
      quantity: 1,
      category: 'Furniture',
      image: 'something'
    });

    const product3 = await Product.createProduct({
      title: 'Mug',
      description: 'This is a mug',
      price: 5,
      quantity: 1,
      category: 'Drinkware',
      image: 'something'
    });

    console.log("Finished creating products!");

    console.log("Starting to create orders...");
    const order1 = await Order.createOrder({
      userId: 1,
      productId: 1,
      orderDate: "",
      isCheckedOut: true,
    });

    const order2 = await Order.createOrder({
      userId: 2,
      productId: 2,
      orderDate: "",
      isCheckedOut: true,
    });

    console.log("Finished creating orders!")

  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
