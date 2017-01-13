import { sayHello } from './greet';

function showHello(elementId: string, name: string) {
    const el = document.getElementById(elementId);
    el.innerText = sayHello(name);
}

showHello('greeting', 'TypeScript');