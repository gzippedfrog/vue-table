import { createStore } from "vuex";

export default createStore({
    state: {
        items: [],
        search: {
            column: "name",
            condition: "contains",
            value: "",
        },
        page: 1,
        pages: 1,
        perPage: 10,
        sortBy: "name",
        descending: false,
    },
    mutations: {
        setItems(state, payload) {
            state.items = payload.items;
            state.pages = payload.pages;
        },
        setSearchColumn(state, payload) {
            state.search.column = payload;
        },
        setSearchCondition(state, payload) {
            state.search.condition = payload;
        },
        setSearchValue(state, payload) {
            state.search.value = payload;
        },
        setPage(state, payload) {
            state.page = payload;
        },
        setPerPage(state, payload) {
            state.perPage = payload;
        },
        setSortBy(state, payload) {
            state.sortBy = payload;
        },
        toggleDescending(state) {
            state.descending = !state.descending;
        },
    },
    actions: {
        async fetchItems({ commit, state }) {
            try {
                const res = await fetch("http://localhost:3000/api/items", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        column: state.search.column,
                        condition: state.search.condition,
                        value: state.search.value,
                        sortBy: state.sortBy,
                        descending: state.descending,
                        page: state.page,
                        perPage: state.perPage,
                    }),
                });

                const data = await res.json();

                if (data.error) {
                    commit("setItems", [], 1);
                } else if (data.items) {
                    commit("setItems", {
                        items: data.items,
                        pages: data.pages,
                    });
                }
            } catch (error) {
                console.log(error.message);
            }
        },
    },
});
