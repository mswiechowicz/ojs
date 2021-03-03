import Input from "./ojs/components/Input.js";
import o from "./ojs/ojs.js";

const exampleDb = {
    example: 'test'
};
const input = new Input({
    label: 'test',
    name: 'example',
    db: exampleDb,
    type: 'text'
});


document.body.appendChild(
    o('div').setAttribute('style', 'width: 50%').add([
        input.init()
    ]).init()
);