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

    async deleteTask(data) {
        return await this.changeData('/tasks', 'DELETE', data);
    }
};