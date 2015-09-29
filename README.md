#Mimicking Zorg's Social Count Request Service using React.js

// Build a form to submit via XHR
// Form sends a URL to Zorg SCRS
// Parse JSON response & add data to a table
// Notify if error
// Default message when no data

// Dispatcher = XHR method
// Store = URL
// View = title, form, initial message
// Action = click / clear handler



// https://facebook.github.io/react/docs/jsx-in-depth.html
// https://facebook.github.io/react/docs/multiple-components.html
// http://facebook.github.io/react/docs/working-with-the-browser.html
// https://github.com/reactjs/react-tutorial/blob/master/public/scripts/example.js
// http://blog.arkency.com/2014/10/react-dot-js-and-dynamic-children-why-the-keys-are-important/
// http://tutorialzine.com/2014/07/5-practical-examples-for-learning-facebooks-react-framework/
// https://zorg.builtvisible.com/tools/scrs
// http://maketea.co.uk/2014/05/22/building-robust-web-apps-with-react-part-3.html


### Up to now:
* See if you can get tests working
* Using Jasmine, Jasmine-jQuery (probably should remove that. It required JSDom so that can go, too) and React-test-utils (try using this first).