// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'