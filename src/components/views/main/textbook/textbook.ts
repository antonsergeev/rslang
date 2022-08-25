import { Word } from '../../../types';
import { Control } from '../../control';
import { Card } from './card/card';

import './textbook.scss';

interface PageButtons {
    first: Control<HTMLButtonElement>;
    previous: Control<HTMLButtonElement>;
    currentPage: Control;
    next: Control<HTMLButtonElement>;
    last: Control<HTMLButtonElement>;
}

export class Textbook extends Control {
    groupNumber: number;
    pageNumber: number;
    cards: Control;
    pageButtons!: PageButtons;
    pageNumberControl!: Control;
    onNewWordsPage!: (groupNumber: number, pageNumber: number) => void;

    constructor(parentNode: HTMLElement, groupNumber = 0, pageNumber = 0) {
        super(parentNode, 'main', 'main textbook');
        this.groupNumber = groupNumber;
        this.pageNumber = pageNumber;

        const container = new Control(this.node, 'div', 'container textbook__container');

        new Control(container.node, 'h2', 'textbook__heading', 'Учебник');
        this.renderGroupButtons(container.node);
        this.cards = new Control(container.node, 'div', 'textbook__cards');
        new Control(this.cards.node, 'p', 'textbook__preloading', 'Слова загружаются...');
        this.renderPageButtons(container.node);
    }

    renderGroupButtons(parentNode: HTMLElement): void {
        const buttons = new Control(parentNode, 'div', 'textbook__group-buttons');
        Array.from(Array(6), (_, i) => {
            const button = new Control<HTMLButtonElement>(
                buttons.node,
                'button',
                'textbook__group-button',
                `Раздел ${i + 1}`
            );
            button.node.type = 'button';
            button.node.style.backgroundColor = `rgb(255, ${220 - i * 20}, ${220 - i * 20})`;
            button.node.onclick = () => this.onNewWordsPage(i, 0);
        });
    }

    renderPageButtons(parentNode: HTMLElement): void {
        const buttons = new Control(parentNode, 'div', 'textbook__page-buttons');
        this.pageButtons = {
            first: new Control<HTMLButtonElement>(buttons.node, 'button', 'textbook__page-button', '<<'),
            previous: new Control<HTMLButtonElement>(buttons.node, 'button', 'textbook__page-button', '<'),
            currentPage: new Control(buttons.node, 'span', 'textbook__page-number'),
            next: new Control<HTMLButtonElement>(buttons.node, 'button', 'textbook__page-button', '>'),
            last: new Control<HTMLButtonElement>(buttons.node, 'button', 'textbook__page-button', '>>'),
        };

        this.pageButtons.first.node.onclick = () => {
            this.pageNumber = 0;
            this.onNewWordsPage(this.groupNumber, this.pageNumber);
        };
        this.pageButtons.previous.node.onclick = () => this.onNewWordsPage(this.groupNumber, --this.pageNumber);
        this.pageButtons.next.node.onclick = () => this.onNewWordsPage(this.groupNumber, ++this.pageNumber);
        this.pageButtons.last.node.onclick = () => {
            this.pageNumber = 29;
            this.onNewWordsPage(this.groupNumber, this.pageNumber);
        };

        this.updateCurrentPageElement();
    }

    updateCurrentPageElement(): void {
        this.pageButtons.currentPage.node.textContent = `Страница ${this.pageNumber + 1} из 30`;
    }

    renderCards(words: Word[]): void {
        this.cards.node.innerHTML = '';
        words.forEach((word) => new Card(this.cards.node, word));
        this.updateCurrentPageElement();
    }
}
