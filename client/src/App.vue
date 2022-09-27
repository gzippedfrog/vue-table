<template>
    <div class="input-group mb-3">
        <select
            class="form-select"
            :value="searchColumn"
            @input="updateSearchColumn"
        >
            <option value="name">Название</option>
            <option value="amount">Количество</option>
            <option value="distance">Расстояние</option>
        </select>

        <select
            class="form-select"
            :value="searchCondition"
            @input="updateSearchCondition"
        >
            <option value="contains">содержит</option>
            <option value="equals">равно</option>
            <option value="more">больше</option>
            <option value="less">меньше</option>
        </select>

        <input
            class="form-control"
            type="text"
            :value="searchValue"
            @input="updateSearchValue"
        />
    </div>

    <TableVue />
</template>

<script setup>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { debounce } from "./utils";

import TableVue from "./components/TableVue.vue";

const store = useStore();

const page = computed(() => store.state.page);
const perPage = computed(() => store.state.perPage);
const searchColumn = computed(() => store.state.search.column);
const searchCondition = computed(() => store.state.search.condition);
const searchValue = computed(() => store.state.search.value);
const sortBy = computed(() => store.state.sortBy);
const descending = computed(() => store.state.descending);

function updateSearchColumn(e) {
    store.commit("setPage", 1);
    store.commit("setSearchColumn", e.target.value);
}

function updateSearchCondition(e) {
    store.commit("setPage", 1);
    store.commit("setSearchCondition", e.target.value);
}

const updateSearchValue = debounce(function (e) {
    store.commit("setPage", 1);
    store.commit("setSearchValue", e.target.value.trim());
}, 500);

function fetchItems(newV, oldV) {
    // if searchColumn or searchCondition changed but
    // search value is empty dont send request
    if (newV[0] !== oldV[0] && !searchValue.value) return;
    if (newV[1] !== oldV[1] && !searchValue.value) return;

    store.dispatch("fetchItems");
}

store.dispatch("fetchItems");

watch(
    [
        searchColumn,
        searchCondition,
        searchValue,
        page,
        perPage,
        sortBy,
        descending,
    ],
    fetchItems
);
</script>

<style>
html,
body,
#app {
    min-height: 100%;
}

#app {
    display: flex;
    flex-direction: column;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
}
</style>
