import checkForURL from './URLChecker'

/// to post url to backend on same origin (localhost) & different port as json obj.
/// async call to backend waiting trigger that backend replied to back to handleSubmit function

const post = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors', // to solve origin cors problem
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try {
        /// waiting response from backend..
        return await response.json()
    } catch (exception) {
        /// for debugging
        console.log(exception)
    }
}
/*
/ get input URL from user,
/ process validation function on URL,
/ notify user for invalid URLs,
/ use post function above to send request to backend to fetch data from meancloud API
/ update form result table with fetched data once available.
*/
export const handleSubmit = async (event) => {
    /// to remove default refresh action setup by event.
    event.preventDefault()
    /// for debugging, to notify developer that form is submitted successfully
    console.log("::: Form Submitted :::");

    // get URL entered by user to do NLP ..
    let urlText = document.getElementById('basic-url').value;
    // for debugging and assuring that URL is going through validation function
    console.log(' URL VALIDATION = ' + checkForURL(urlText));

    /// either notifying user with "invalid URL" msg or passing URL to backend to fetch data.
    if (!checkForURL(urlText)) {
        /// notifying user that entered URL isn't valid.
        alert("Please enter valid URL!");

    } else {
        // working when server is up & running on port 8081 on localhost.
        // passing urlText param which contains the valid URL that passed by user to url-analysis route.
        await post('http://localhost:8081/url-analysis', {
            urlText
        }).then(data => {
            //  console.log(data);

            /// updating form result with fetched result from meancloud API.. 
            document.getElementById('score_tag').textContent = data.score_tag;
            document.getElementById('agreement').textContent = data.agreement;
            document.getElementById('subjectivity').textContent = data.subjectivity;
            document.getElementById('irony').textContent = data.irony;
            document.getElementById('confidence').textContent = data.confidence;
            /// access sentence_list to get text which is found at param[0] always.
            document.getElementById('text').textContent = data.sentence_list[0].text;

            /// updating model used.. special case to be upper case
            var modelVar = data.model;
            var upperCaseModel = modelVar.toUpperCase();
            document.getElementById('model').textContent = upperCaseModel;

            /// updating remaing checks with used registered key..
            document.getElementById('remaining_credits').textContent = data.status.remaining_credits;
        }
        );
    }

}