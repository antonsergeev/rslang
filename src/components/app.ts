import { Controller } from './controllers/controller';
import { Model } from './models/model';
import { View } from './views/view';
// import { MainPage } from './views/pages/main';

export class App {
    controller: Controller;

    constructor() {
        const model = new Model();
        const view = new View();
        this.controller = new Controller(model, view);
    }

    start(): void {
        this.controller.start();
    }
}
