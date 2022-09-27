const { faker } = require("@faker-js/faker");
const { Op } = require("sequelize");
const Item = require("./models/Item");

function generateRandomItems(n) {
    const arr = [];
    for (let i = 0; i < n; i++) {
        const date = faker.date.past();
        arr.push({
            name: faker.random.alpha(10),
            date: Math.floor(date.getTime() / 1000),
            amount: faker.random.numeric(2),
            distance: faker.random.numeric(3),
        });
    }
    return arr;
}

async function findItemsAndCountPages({
    sortBy = "name",
    descending = false,
    page = 1,
    perPage = 10,
    column,
    condition,
    value,
}) {
    const allowedOperands = {
        more: "gt",
        less: "lt",
        equals: "eq",
        contains: "substring",
    };

    const operand = allowedOperands[condition];

    const query = {
        order: [[sortBy, descending ? "DESC" : "ASC"]],
        offset: (page - 1) * perPage,
        limit: +perPage,
    };

    if (column && operand && value) {
        query.where = {
            [column]: {
                [Op[operand]]: value,
            },
        };
    }

    const { rows, count } = await Item.findAndCountAll(query);

    return {
        items: rows,
        pages: Math.ceil(count / perPage) || 1,
    };
}

module.exports = {
    generateRandomItems,
    findItemsAndCountPages,
};
