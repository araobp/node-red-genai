const BASE_URL = "http://127.0.0.1:5050";

const chat = async (context, query, k) => {
    const userMessage = encodeURIComponent(query);
    const response = await fetch(`${BASE_URL}/chat?context=${context}&user_message=${userMessage}&k=${k}`);
    const data = await response.json();
    //console.log(data);
    return data.answer;
}

(async () => {
        const message = await chat('hansaplatz', 'Where is Hanzaplatz?', 3);
        console.log(message);
})();
