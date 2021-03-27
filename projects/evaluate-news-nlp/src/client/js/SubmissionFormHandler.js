import isURLValid from './URLChecker'


/*
/ get input URL from user,
/ process validation function on URL,
/ notify user for invalid URLs,
/ update form result table with fetched data once available.
*/
export const handleFormSubmission = async (event) => {
    /// to remove default refresh action setup by event.
    event.preventDefault()
    /// for debugging, to notify developer that form is submitted successfully
    console.log("::: Form Submitted :::");

    // get URL entered by user to do NLP ..
    let urlText = document.getElementById('url_to_analyze').value;
    // for debugging and assuring that URL is going through validation function
    console.log(' URL VALIDATION = ' + isURLValid(urlText));

    /// either notifying user with "invalid URL" msg or passing URL to backend to fetch data.
    if (!isURLValid(urlText)) {
        /// notifying user that entered URL isn't valid.
        alert("Please enter valid URL!");

    } else {

        // working when server is up & running on port 8081 on localhost.
        // passing urlText param which contains the valid URL that passed by user to url-analysis route.
        /// to post url to backend on same origin (localhost) & different port as json obj.
        /// async call to backend waiting trigger that backend replied to back to handleFormSubmission function
        await fetch('http://localhost:8081/url-analysis', {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors', // to solve origin cors problem
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ urlText: urlText })
        }).then(res => {
            return res.json()
        }).then(function (response) {

            //console.log(response)

            /// updating form result with fetched result from meancloud API.. 
            document.getElementById('score_tag').textContent = response.score_tag;
            /// update agreement span
            document.getElementById('agreement').textContent = response.agreement;
            /// update subjectivity span
            document.getElementById('subjectivity').textContent = response.subjectivity;
            /// update irony span
            document.getElementById('irony').textContent = response.irony;
            /// update confidence span
            document.getElementById('confidence').textContent = response.confidence;

            /// access sentence_list to get text which is found at param[0] always.
            /// could be nested texts with analysis but let's fetch first only.
            document.getElementById('text').textContent = response.sentence_list[0].text;

            /// updating model used.. special case to be upper case
            var modelVar = response.model;
            var upperCaseModel = modelVar.toUpperCase();
            document.getElementById('model').textContent = upperCaseModel;

            /// updating remaing checks with used registered key..
            document.getElementById('remaining_credits').textContent = response.status.remaining_credits;
        });
    }
}