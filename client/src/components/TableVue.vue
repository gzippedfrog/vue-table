<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import PaginatorVue from "./PaginatorVue.vue";
import { formateDate } from "@/utils";

const store = useStore();

const items = computed(() => store.state.items);
const sortBy = computed(() => store.state.sortBy);

function setSortBy(column) {
    if (column === sortBy.value) {
        store.commit("toggleDescending");
    } else {
        store.commit("setSortBy", column);
    }
}

function computeClasses(column) {
    return ["user-select-none", sortBy.value === column ? "text-primary" : ""];
}
</script>

<template>
    <PaginatorVue />
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Дата</th>
                <th
                    :class="computeClasses('name')"
                    role="button"
                    @click="() => setSortBy('name')"
                >
                    Название
                </th>
                <th
                    :class="computeClasses('amount')"
                    role="button"
                    @click="() => setSortBy('amount')"
                >
                    Количество
                </th>
                <th
                    :class="computeClasses('distance')"
                    role="button"
                    @click="() => setSortBy('distance')"
                >
                    Расстояние
                </th>
            </tr>
        </thead>
        <tbody>
            <template v-if="Object.keys(items).length">
                <tr v-for="item in items" :key="item.name">
                    <td>{{ formateDate(item.date) }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.amount }}</td>
                    <td>{{ item.distance }}</td>
                </tr>
            </template>
            <tr v-else>
                <td class="text-center" colspan="4">Не найдено</td>
            </tr>
        </tbody>
    </table>
</template>
