import Input from "./components/Input.js";

const exampleDb = {
    example: 'siema'
}
const input = new Input({
    label: 'test',
    name: 'example',
    db: exampleDb,
    type: 'text'
});

document.body.appendChild(input.init());