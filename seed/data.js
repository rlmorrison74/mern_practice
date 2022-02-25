import Product from "../models/product.js";
import User from "../models/user.js";
import db from "../db/connection.js";
import bcrypt from "bcrypt";

const insertData = async () => {
  await db.dropDatabase();

  const user1 = new User({
    email: "test@test.com",
    password_digest: await bcrypt.hash("123456", 11),
  });
  await user1.save();

  const products = [
    {
      name: "little toaster",
      description: "much brave",
      price: "100",
    },
  ];
  await Product.insertMany(products);

  console.log("Database Seeded!");
  db.close();
};

insertData();
