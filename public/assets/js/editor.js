let inputsContainer = document.getElementById('inputsContainer');

let trashSvg = `<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
<path d="m15.854,10.854l-3.146,3.146,3.146,3.146c.195.195.195.512,0,.707-.098.098-.226.146-.354.146s-.256-.049-.354-.146l-3.146-3.146-3.146,3.146c-.098.098-.226.146-.354.146s-.256-.049-.354-.146c-.195-.195-.195-.512,0-.707l3.146-3.146-3.146-3.146c-.195-.195-.195-.512,0-.707s.512-.195.707,0l3.146,3.146,3.146-3.146c.195-.195.512-.195.707,0s.195.512,0,.707Zm7.146-6.354c0,.276-.224.5-.5.5h-1.5c0,.015,0,.03-.002.046l-1.37,14.867c-.215,2.33-2.142,4.087-4.481,4.087h-6.272c-2.337,0-4.263-1.754-4.48-4.08l-1.392-14.873c-.001-.016-.002-.031-.002-.047h-1.5c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h5.028c.25-2.247,2.16-4,4.472-4h2c2.312,0,4.223,1.753,4.472,4h5.028c.276,0,.5.224.5.5Zm-15.464-.5h8.928c-.243-1.694-1.704-3-3.464-3h-2c-1.76,0-3.221,1.306-3.464,3Zm12.462,1H4.002l1.387,14.826c.168,1.81,1.667,3.174,3.484,3.174h6.272c1.82,0,3.318-1.366,3.485-3.179l1.366-14.821Z"/>
</svg>`


function createElement(tag,attributes,html = null){
    let element = document.createElement(tag);
    attributes.forEach(attribute => {
        element.setAttribute(attribute.name,attribute.value);
    });
    if(html){
        element.innerHTML = html;
    }
    return element;
}

function getInputContainer(){
    let div = createElement(
        'div',
        [
            {
                name:'class',
                value:'position-relative'
            }
        ]
    )
    let button = createElement(
        'button',
        [
            {
                name : 'class',
                value:'position-absolute bg-transparent border-0 p-1 rounded-2 removeInputBtn'
            },
            {
                name : 'style',
                value:'right:0;top:0;'
            },
            {
                name : 'onclick',
                value:'removeInput(this)'
            },
            
        ],
        trashSvg
    )

    div.appendChild(button);
    return div;
}

function newH1(){
    let div = getInputContainer();
    let h1 = createElement(
        'input',
        [
            {
                name: 'type',
                value:'text'
            },
            {
                name: 'name',
                value:'header1'
            },
            {
                name: 'placeholder',
                value:'Header 1'
            },
            {
                name: 'placeholder',
                value:'Header 1'
            },
            {
                name: 'class',
                value:'w-100 rounded-3 border-0 px-2 p-1 fs-3 article-content'
            },
            
        ]
    )
    div.appendChild(h1);
    inputsContainer.appendChild(div);
    toggleOptions();
}
function newH2(){
    let div = getInputContainer();
    let h1 = createElement(
        'input',
        [
            {
                name: 'type',
                value:'text'
            },
            {
                name: 'name',
                value:'header2'
            },
            {
                name: 'placeholder',
                value:'Header 2'
            },
            {
                name: 'class',
                value:'w-100 rounded-3 border-0 px-2 p-1 fs-4 article-content'
            },
            
        ]
    )
    div.appendChild(h1);
    inputsContainer.appendChild(div);
    toggleOptions();
}
function newH3(){
    let div = getInputContainer();
    let h1 = createElement(
        'input',
        [
            {
                name: 'type',
                value:'text'
            },
            {
                name: 'name',
                value:'header3'
            },
            {
                name: 'placeholder',
                value:'Header 3'
            },
            {
                name: 'class',
                value:'w-100 rounded-3 border-0 px-2 p-1 fs-5 article-content'
            },
            
        ]
    )
    div.appendChild(h1);
    inputsContainer.appendChild(div);
    toggleOptions();
}
function newP(){
    let div = getInputContainer();
    let h1 = createElement(
        'textarea',
        [
            {
                name: 'rows',
                value:'4'
            },
            {
                name: 'name',
                value:'paragraph'
            },
            {
                name: 'placeholder',
                value:'Paragraph'
            },
            {
                name: 'class',
                value:'w-100 rounded-3 border-0 px-2 p-1 fs-6 article-content'
            },
            
        ]
    )
    div.appendChild(h1);
    inputsContainer.appendChild(div);
    toggleOptions();
}
function newImg(){
    let div = getInputContainer();
    let h1 = createElement(
        'input',
        [
            {
                name: 'type',
                value:'file'
            },
            {
                name: 'onchange',
                value:'imageChanged(event)'
            },
            {
                name: 'class',
                value:'w-100 rounded-3 border-0 px-2 p-1'
            },
            
        ]
    )
    div.appendChild(h1);
    inputsContainer.appendChild(div);
    toggleOptions();
}
function newList(){
    let div = getInputContainer();
    let h1 = createElement(
        'input',
        [
            {
                name: 'type',
                value:'text'
            },
            {
                name: 'name',
                value:'listItem'
            },
            {
                name: 'placeholder',
                value:'List item'
            },
            {
                name: 'class',
                value:'w-100 rounded-3 border-0 px-2 p-1 fs-6 article-content'
            },
            
        ]
    )
    div.appendChild(h1);
    inputsContainer.appendChild(div);
    toggleOptions();
}

function toggleOptions(){
    let element = document.getElementById('options-container');
    element.classList.toggle('d-none')
}

function removeInput(element){
    element.parentElement.remove();
}

function collect(csrf){
    let title = document.getElementById('article-title');
    let category = document.getElementById('article-category');
    let cover = document.querySelector('.article-cover');
    let catId = category.getAttribute('data-id');
    let article = {
        title : title.value,
        category : catId != 0 ? catId : '',
        new_category : catId == 0 ? category.value : '',
        cover : cover?.src  ? cover.src : '',
        items: []
    }
    let elements = document.querySelectorAll('.article-content');
    console.log(elements);
    elements.forEach(element =>{
        if(element.value || element.tagName === 'IMG'){
            let object = {};
            let name = element.name;
            console.log(name , element.src ? element.src : 'not image');
            switch(name){
                case 'paragraph':
                    object.type= 'paragraph';
                    object.content = element.value;
                    break;
                case 'header1':
                    object.type= 'header1';
                    object.content = element.value;
                    break;
                case 'header2':
                    object.type= 'header2';
                    object.content = element.value;
                    break;
                case 'header3':
                    object.type= 'header3';
                    object.content = element.value;
                    break;
                case 'image':
                    object.type= 'image';
                    object.content = element.src;
                    break;
                case 'listItem':
                    if(article.items.length && article.items[article.items.length-1].type == 'list'){
                        article.items[article.items.length-1].items.push(element.value)
                    }else{
                        object.type= 'list';
                        object.items = [element.value];
                    }
                    break;
                default:
                    break;
            }
            if(object.type){
                article.items.push(object)
            }
            
        }
    });
    console.log(article);
    store(article,csrf);
}

function imageChanged(event,content = true){
    let element = event.target;
    if(!hasImgAsNextSibling(element)){
        let attributes = [
            {
                name: 'name',
                value:'image'
            },
            {
                name: 'style',
                value:'height:200px;'
            },
        ];
        if(content){
            attributes.push({
                name: 'class',
                value:'article-content'
            })
        }else{
            attributes.push({
                name: 'class',
                value:'article-cover'
            })
        }
        element.parentElement.appendChild(createElement('img',attributes))
    }
    const file = element.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        hasImgAsNextSibling(element).src = reader.result;
    };
    reader.readAsDataURL(file);
}

function hasImgAsNextSibling(element){
    const nextSibling = element.nextElementSibling;
    if(nextSibling !== null && nextSibling.tagName === 'IMG'){
        return nextSibling;
    }
    return false;
}

function putCategory(element){
    if(element.value != ''){
        element.nextElementSibling.classList.remove('d-none');
        element.setAttribute('data-id',0);
    }else{
        element.nextElementSibling.classList.add('d-none');
    }
}

function chooseCategory(event,id,text){
    event.target.parentElement.classList.add('d-none');
    let input = event.target.parentElement.previousElementSibling;
    input.setAttribute('data-id',id);
    input.value = text
}

function store(articleData,csrf){
    console.log(articleData + "will be ");
    fetch(`/article`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },  
        body:  JSON.stringify({
            _csrf : csrf, 
           article : articleData
        }), 
      })
        .then((response) => {
            console.log(response);
            if (response.status == 201) {
                window.location.href = "http://127.0.0.1:3000/dashboard"; 
            } 
        })
        .then((data) => {
          // Handle the response from the server as needed
          console.log('Article stored successfully:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
}

function collectAndUpdate(csrf,id){
    let title = document.getElementById('article-title');
    let category = document.getElementById('article-category');
    let cover = document.querySelector('.article-cover');
    let catId = category.getAttribute('data-id');
    let article = {
        id: parseInt(id),
        title : title.value,
        category : catId != 0 ? catId : '',
        new_category : catId == 0 ? category.value : '',
        cover : cover?.src  ? cover.src : '',
        items: []
    }
    let elements = document.querySelectorAll('.article-content');
    console.log(elements);
    elements.forEach(element =>{
        if(element.value || element.tagName === 'IMG'){
            let object = {};
            let name = element.name;
            console.log(name , element.src ? element.src : 'not image');
            switch(name){
                case 'paragraph':
                    object.type= 'paragraph';
                    object.content = element.value;
                    break;
                case 'header1':
                    object.type= 'header1';
                    object.content = element.value;
                    break;
                case 'header2':
                    object.type= 'header2';
                    object.content = element.value;
                    break;
                case 'header3':
                    object.type= 'header3';
                    object.content = element.value;
                    break;
                case 'image':
                    object.type= 'image';
                    object.content = element.src;
                    break;
                case 'listItem':
                    if(article.items.length && article.items[article.items.length-1].type == 'list'){
                        article.items[article.items.length-1].items.push(element.value)
                    }else{
                        object.type= 'list';
                        object.items = [element.value];
                    }
                    break;
                default:
                    break;
            }
            if(object.type){
                article.items.push(object)
            }
            
        }
    });
    console.log(article);
    update(article,csrf);
}

function update(articleData,csrf){
    fetch(`/article/${articleData.id}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },  
        body:  JSON.stringify({
            _csrf : csrf, 
           article : articleData
        }), 
      })
        .then((response) => {
            console.log(response);
          if (response.status == 201) {
            window.location.href = "http://127.0.0.1:3000/dashboard";
            
          } 
          
        })
        .then((data) => {
          // Handle the response from the server as needed
        //   console.log('Article stored successfully:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
}