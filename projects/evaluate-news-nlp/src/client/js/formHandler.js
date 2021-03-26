import checkForURL from './URLChecker'

const post = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try {
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

export const handleSubmit = async (event) => {
    event.preventDefault()
    console.log("::: Form Submitted :::");
    
    let urlText = document.getElementById('basic-url').value;
    console.log(' URL VALIDATION = '+checkForURL(urlText));

    if(!checkForURL(urlText)){
        alert("Please enter valid URL!");
        
    }else{

       await post('http://localhost:8081/url-analysis',{
            urlText
        }).then(data =>{
          //  console.log(data);
            document.getElementById('text').textContent = data.sentence_list[0].text;
            document.getElementById('score_tag').textContent = data.score_tag;
            document.getElementById('agreement').textContent = data.agreement;
            document.getElementById('subjectivity').textContent = data.subjectivity;
            document.getElementById('irony').textContent = data.irony;
            document.getElementById('confidence').textContent = data.confidence;

        });


        // .then(res => res.json())
        // .then(function(res) {
        //     document.getElementById('results').innerHTML = res.message
        // });
    }
//  document.getElementById('results').textContent = res.tag;   
}