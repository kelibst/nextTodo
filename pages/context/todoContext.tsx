import React, { createContext, useContext } from "react";

const todoContext = createContext(null);

const useTodo = () => useContext(todoContext);

// const todoProvider = ({value, children}) => {
//     return (
//         <todoContext.Provider value={value}>
//             {children}
//         </todoContext.Provider>
//     )
// }

export { todoContext, useTodo };
