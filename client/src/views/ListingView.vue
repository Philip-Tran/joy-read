<template>
    <div class="book-listing">
        <!-- Toggle Button -->
        <div class="view-toggle">
            <button :class="{ active: viewMode === 'list' }" @click="viewMode = 'list'">
                List View
            </button>
            <button :class="{ active: viewMode === 'card' }" @click="viewMode = 'card'">
                Card View
            </button>
        </div>

        <!-- Book Listing -->
        <div>
            <!-- List View -->
            <div v-if="viewMode === 'list'" class="list-view">
                <ul>
                    <li v-for="book in books" :key="book.id" class="list-item">
                        <div>
                            <h3>{{ book.title }}</h3>
                            <p>{{ book.author }}</p>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Card View -->
            <div v-if="viewMode === 'card'" class="card-view">
                <div v-for="book in books" :key="book.id" class="card-item">
                    <h3>{{ book.title }}</h3>
                    <p>{{ book.author }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            viewMode: "list", // Default to list view
            books: [
                { id: 1, title: "Book 1", author: "Author 1" },
                { id: 2, title: "Book 2", author: "Author 2" },
                { id: 3, title: "Book 3", author: "Author 3" },
            ],
        };
    },
};
</script>

<style scoped>
/* Styles for Toggle Buttons */
.view-toggle button {
    padding: 10px 20px;
    margin: 5px;
    cursor: pointer;
}

.view-toggle button.active {
    background-color: #007bff;
    color: #fff;
}

/* Styles for List View */
.list-view .list-item {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #ddd;
}

/* Styles for Card View */
.card-view {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.card-view .card-item {
    flex: 1 1 calc(33.333% - 10px);
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
