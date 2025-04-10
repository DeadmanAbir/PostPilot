export const getTextFromHTML= (html)=> {
    // Create a temporary element
    const temp = document.createElement('div');
    
    // Set the HTML content
    temp.innerHTML = html;
    
    // Get the text content (removes all HTML tags and preserves only text)
    return temp.textContent || temp.innerText || '';
  }
  
