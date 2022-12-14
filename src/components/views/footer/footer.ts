import { Control } from '../control';
import { Model } from '../../models/model';
import './footer.scss';

export class Footer extends Control {
    onTextbook!: () => void;
    onStartPage!: () => void;
    model: Model;
    constructor(parentNode: HTMLElement) {
        super(parentNode, 'footer', 'footer');
        this.model = new Model();
        const container = new Control(this.node, 'div', 'container');
        const wrapper = new Control(container.node, 'div', 'footer__wrapper');
        const topBlock = new Control(wrapper.node, 'div', 'footer__top-block');
        const firstColumnDiv = new Control(topBlock.node, 'div');
        const logoContainer = new Control(firstColumnDiv.node, 'div', 'footer__logo-container');
        const logoImg = new Control<HTMLImageElement>(logoContainer.node, 'img', 'footer__logo');
        logoImg.node.src = './img/rsschool.png';
        logoImg.node.alt = 'RS School logo';
        const secondColumnDiv = new Control(topBlock.node, 'div');
        new Control(secondColumnDiv.node, 'h3', 'footer__heading', 'Меню');
        const menuList = new Control<HTMLUListElement>(secondColumnDiv.node, 'ul', 'footer__list');
        // for (let i = 0; i < this.model.menu.menu.length; i++) {
        const menuItem1 = new Control<HTMLElement>(menuList.node, 'li');
        const menuLink1 = new Control<HTMLAnchorElement>(menuItem1.node, 'a', 'nav__list-link', `Главная`);
        menuLink1.node.onclick = () => this.onStartPage();
        menuLink1.node.href = '#';
        const menuItem2 = new Control<HTMLElement>(menuList.node, 'li');
        const menuLink2 = new Control<HTMLAnchorElement>(menuItem2.node, 'a', 'nav__list-link', `Учебник`);
        menuLink2.node.onclick = () => this.onTextbook();
        menuLink2.node.href = '#';
        const menuItem3 = new Control<HTMLElement>(menuList.node, 'li');
        const menuLink3 = new Control<HTMLAnchorElement>(menuItem3.node, 'a', 'nav__list-link', `Игры`);
        menuLink3.node.onclick = () => this.onStartPage();
        menuLink3.node.href = '#games';
        const menuItem4 = new Control<HTMLElement>(menuList.node, 'li');
        const menuLink4 = new Control<HTMLAnchorElement>(menuItem4.node, 'a', 'nav__list-link', `Статистика`);
        menuLink4.node.onclick = () => this.onTextbook();
        menuLink4.node.href = '#';
        // menuLink.node.href = this.model.menu.menu[i].link;
        // }
        const thirdColumnDiv = new Control(topBlock.node, 'div');
        new Control(thirdColumnDiv.node, 'h3', 'footer__heading', 'Разработчики');
        const devList = new Control<HTMLUListElement>(thirdColumnDiv.node, 'ul', 'footer__list');
        for (let i = 0; i < this.model.developers.devs.length; i++) {
            const devItem = new Control<HTMLElement>(devList.node, 'li');
            const devLink = new Control<HTMLAnchorElement>(
                devItem.node,
                'a',
                'nav__list-link',
                `${this.model.developers.devs[i].name}`
            );
            devLink.node.href = this.model.developers.devs[i].link;
        }
        const bottomBlock = new Control(wrapper.node, 'div', 'footer__bottom-block', '©2022 RS LANG. ');
        const courseLink = new Control<HTMLAnchorElement>(bottomBlock.node, 'a', '', 'RS School Course.');
        courseLink.node.href = 'https://rs.school';
    }
}
