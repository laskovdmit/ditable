const getZero = (num) => num < 10 ? `0${num}` : num;

const getColour = (priority) => {
    switch (priority) {
        case '5':
            return '#8B0000';
        case '4':
            return '#DC143C';
        case '3':
            return '#FF4500';
        case '2':
            return '#FFA500';
        default:
            return '#FA8072';
    }
};

const getCalendarDate = (date) => {
    return `${date.slice(6)}-${date.slice(3, 5)}-${date.slice(0, 2)}`;
};

const getTextPriority = (priority) => {
    switch (priority) {
        case '5':
            return 'Очень высокий';
        case '4':
            return 'Высокий';
        case '3':
            return 'Средний';
        case '2':
            return 'Ниже среднего';
        default:
            return 'Низкий';
    }
};

export {
    getZero,
    getColour,
    getCalendarDate,
    getTextPriority
}

export default class DitableService {
    _apiBase = 'http://localhost:3000';

    async getResources(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Нет доступа к ${url}, статус: ${res.status}`);
        }

        return await res.json();
    };

    async changeData(url, method, data = '') {
        const res = await fetch(`${this._apiBase}${url}`, {
            method: method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log(res);

        if (!res.ok) {
            throw new Error(`Нет доступа к ${url}, статус: ${res.status}`);
        }

        return await res.json();
    }

    async getTasks() {
        return await this.getResources('/tasks');
    }

    async postTask(data) {
        return await this.changeData('/tasks', 'POST', data);
    }
};