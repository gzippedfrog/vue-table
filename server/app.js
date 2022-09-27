const express = require("express");
const cors = require("cors");

const sequelize = require("./config/database");
const Item = require("./models/Item");

const {
    generateRandomItems,
    findAndCountItems,
    findItemsAndCountPages,
} = require("./utils");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

const initApp = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        await sequelize.sync({ force: true });

        await Item.bulkCreate(generateRandomItems(25));

        app.listen(PORT, () => {
            console.log(
                `Server is up and running at: http://localhost:${PORT}`
            );
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

app.post("/api/items", async (req, res) => {
    const { items, pages } = await findItemsAndCountPages(req.body);

    res.send({
        items,
        pages,
    });
});

initApp();
