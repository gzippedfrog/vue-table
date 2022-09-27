<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const page = computed(() => store.state.page);
const pages = computed(() => store.state.pages);
const perPage = computed(() => store.state.perPage);

function setPage(num) {
    num = +num;
    if (num < 1 || num > pages.value) return;
    if (num === page.value) return;
    store.commit("setPage", num);
}

function setPerPage(e) {
    const num = e.target.value;
    store.commit("setPerPage", num);
}
</script>

<template>
    <div class="btn-toolbar paginator-wrapper mb-3" role="toolbar">
        <div class="input-group me-2">
            <span class="input-group-text">Кол-во элем.</span>
            <select class="form-select" :value="perPage" @input="setPerPage">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">15</option>
            </select>
            <span class="input-group-text">страница: </span>
            <input
                class="form-control"
                type="number"
                :value="page"
                @input="(e) => setPage(e.target.value)"
            />
            <span class="input-group-text">из {{ pages }}</span>
        </div>
        <div class="btn-group" role="group">
            <button class="btn btn-primary" @click="setPage(1)">
                &lt;&lt;
            </button>
            <button class="btn btn-primary" @click="setPage(page - 1)">
                &lt;
            </button>
            <button class="btn btn-primary" @click="setPage(page + 1)">
                &gt;
            </button>
            <button class="btn btn-primary" @click="setPage(pages)">
                &gt;&gt;
            </button>
        </div>
    </div>
</template>

<style scoped>
input,
select {
    min-width: 80px !important;
}

.paginator-wrapper {
    flex-wrap: nowrap;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    appearance: none;
}

input[type="number"] {
    -moz-appearance: textfield;
}
</style>
