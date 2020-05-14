import mitt from 'mitt'

// Создаём глобальную шину событий
const eventBus = mitt();

export default eventBus;