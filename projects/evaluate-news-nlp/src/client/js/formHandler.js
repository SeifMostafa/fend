import checkForURL from './URLChecker'

function handleSubmit(event) {
    event.preventDefault()
    console.log("::: Form Submitted :::");
    
    let formText = document.getElementById('basic-url').value;
    console.log(checkForURL(formText));

    if(!checkForURL(formText)){
        alert("Please enter valid URL!");
        
    }else{
        fetch('http://localhost:8081/')
        .then(res => res.json())
        .then(function(res) {
            document.getElementById('results').innerHTML = res.message
        });
    }

   

    
}

export { handleSubmit }
