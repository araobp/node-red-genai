const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const URL = 'https://wisdom.nec.com/ja/series/orita/2024111501/index.html';

const scrape = async (url, part) => {
    const response = await fetch(url);
    const text = await response.text();
    const dom = new JSDOM(text);
    
    var result = null;
    const doc = dom.window.document;
    
    switch(part) {
        case 'title':
            result = doc.querySelector('title').textContent;
            break;
        case 'meta':
            const description = doc.querySelector('meta[name="description"]').getAttribute('content')
            const keywords = doc.querySelector('meta[name="keywords"]').getAttribute('content');
            result = [description, keywords];
            break;
        case 'main':
            const main = doc.querySelectorAll('section.ly-section');

            main.forEach(e => {
                const childElementsToRemove = e.querySelectorAll('.link-panel');
                childElementsToRemove.forEach(child => {
                    child.remove();
                });
            });
            
            main.forEach(s => {
                result += s.outerHTML;
            });
            break;
    }
        
    return result;
}


if (require.main === module) {
    scrape(URL, 'title').then(title => {console.log(title)});
    scrape(URL, 'meta').then(title => {console.log(title)});
    scrape(URL, 'main').then(title => {console.log(title)});
}
