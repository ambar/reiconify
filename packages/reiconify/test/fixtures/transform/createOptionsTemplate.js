module.exports = function createTemplate({ baseTemplatePath, filePath }) {
  return function(data) {
    const jsxWithProps = data.jsxString
      .replace(/<svg([\s\S]*?)>/, (match, group) => `<Icon${group} {...props}>`)
      .replace(/<\/svg>$/, "</Icon>");

    return `
    import React from 'react'
    import Icon from '${baseTemplatePath}'

    const ${data.name} = props => ${jsxWithProps}

    ${data.name}.defaultProps = ${JSON.stringify(
      Object.assign(
        {
          name: data.name
        },
        data.defaultProps
      )
    )}
    
    ${
      filePath
        ? `
    export default ${filePath}`
        : ""
      }
    
    export const ReactComponent = ${data.name}
  `;
  };
};
