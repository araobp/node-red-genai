const BASE_URL = "http://127.0.0.1:5050";

const hello = async () => {
    const response = await fetch(`${BASE_URL}/hello`);
    const data = await response.json();
    //console.log(data.message);
    return data.message;
}

(async () => {
        const message = await hello();
        console.log(message);
})();

