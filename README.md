# THIS ONE DEPRECATED
Actual -> https://github.com/OrangutanJS/ojs-store

# ojs
Open source JavaScript library for creating Object-oriented Web user interfaces. Quick and easy :) 
#### Quick start
##### input:
```javascript
o('div').class(['container', 'section']).id('first_section').add([
    o('h1').class('section__header').text('Header 1').init(),
    o('p').class('section__paragraph').text('Hello world!').init()
]).init()
```
It's important to init() all o' objects after declare and define.

##### output:
```html
<div class="container section" id="first_section">
    <h1 class="section__header">Header1</h1>
    <p class="section__paragraph">Hello world!</p>
</div>
```

#### Our library has a couple of objects oriented elements of html like Input
It's simple to use them. They work great with javascript objects with data;
```javascript
const store = {
    exampleKey: 'exampleValue'
}
const exampleInput = new Input({
    label: 'Example text',
    type: 'text',
    name: 'exampleKey',
    db: store,
})
```
If we want use this input in our code just init it like that:
```javascript
o('div').id('input_container').add([
    exampleInput.init()
]).init();
```
Output code would looks:
```html
<div id="input_container">
    <div class="input">
        <label for="exampleKey--input">
            <div class="input__label">
                <p>Example text</p>
                <span>text field</span>
                <span class="text-warning hidden">Invalid text</span>
            </div>
        </label>
        <input class="input__field" id="exampleKey--input" type="text" name="exampleKey" placeholder="" required="true">
    </div>
</div>
```
Value in the store object will be replaced everytime when input value changes   
This is very cool thing when we want to asynchronously send a couple of data. We don't need to get values from every field, just send the store object. 
