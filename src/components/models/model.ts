import { Word } from '../types';
import { Features } from './features';
import { Games } from './games';
import { Menu } from './menu';
import { Devs } from './devs';

export class Model {
    private backendBaseURL: string;
    menu: Menu;
    developers: Devs;
    features: Features;
    games: Games;

    constructor(backendBaseURL = '') {
        this.backendBaseURL = backendBaseURL;
        this.menu = new Menu();
        this.developers = new Devs();
        this.features = new Features();
        this.games = new Games();
    }

    setBackendBaseURL(backendBaseURL: string) {
        this.backendBaseURL = backendBaseURL;
    }

    async getWord(id: number): Promise<Word> {
        const url = `${this.backendBaseURL}words/${id}`;
        const response = await fetch(url);
        let word: Word = await response.json();
        word = this.addBaseURLToImageAndAudio(word);
        return word;
    }

    async getWords(group: number, page: number): Promise<Word[]> {
        const url = `${this.backendBaseURL}words?group=${group}&page=${page}`;
        const response = await fetch(url);
        let words: Word[] = await response.json();
        words = words.map((word) => this.addBaseURLToImageAndAudio(word));
        return words;
    }

    addBaseURLToImageAndAudio(word: Word): Word {
        const newWord = { ...word };
        const fieldsToChange: Array<keyof Word> = ['image', 'audio', 'audioMeaning', 'audioExample'];
        fieldsToChange.forEach((field) => {
            (newWord[field] as string) = `${this.backendBaseURL}${word[field]}`;
        });
        return newWord;
    }
}
