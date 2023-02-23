const {
  client,
  createUser
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
      DROP TABLE IF EXISTS carts;
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
        quantitity integer(255) NOT NULL,
        category varchar(255) NOT NULL,
        image varchar(255) NOT NULL
      );

      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        first_name varchar(255) NOT NULL,
        last_name varchar(255) NOT NULL,
        email varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL
      );

      CREATE TABLE carts (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "userId" INTEGER REFERENCES users(id)
      );

      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        price decimal(10,2) NOT NULL,
        "productId" INTEGER REFERENCES products(id),
        quantity INTEGER(255) NOT NULL
      );

      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "reviewUserId" INTEGER REFERENCES users(id),
        "reviewText" text NOT NULL
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

    await createUser({ 
      firstName: 'albert', 
      lastName: 'alberts',
      email: 'albert@email.com',
      password: 'password' 
    });
    await createUser({ 
      firstName: 'sandra', 
      lastName: 'otterson',
      email: 'sandra@email.com',
      password: 'alsopassword'
    });
    await createUser({ 
      firstName: 'glamgal',
      lastName: 'soglam',
      email: 'glamgal@email.com',
      password: 'anotherpassword'
    });

    console.log("Finished creating users!");

    await createProduct({ 
      firstName: 'albert', 
      lastName: 'alberts',
      email: 'albert@email.com',
      password: 'password' 
    });
    await createProduct({ 
      firstName: 'sandra', 
      lastName: 'otterson',
      email: 'sandra@email.com',
      password: 'alsopassword'
    });
    await createProduct({ 
      firstName: 'glamgal',
      lastName: 'soglam',
      email: 'glamgal@email.com',
      password: 'anotherpassword'
    });

    console.log("Finished creating products!");
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
