import Input from "./ojs/components/Input.js";
import "./ojs/style/input.css";
import o from "./ojs/ojs.js";
import {add} from "./utils/test";

const exampleDb = {
    example: 'test'
};
const input = new Input({
    label: 'test',
    name: 'example',
    db: exampleDb,
    type: 'text',
    event: [
        {
            name: 'keyup',
            fn: ({target: {value}}) => {
                const textContainerHandler = document.getElementById('text_container');
                if(textContainerHandler) {
                    textContainerHandler.innerText = value;
                }
            }
        }
    ]
});


console.log(add(5,4));

document.body.appendChild(
    o('div').setAttribute('style', 'width: 50%').add([
        input.init(),
        o('p').id('text_container').init()
    ]).init()
);