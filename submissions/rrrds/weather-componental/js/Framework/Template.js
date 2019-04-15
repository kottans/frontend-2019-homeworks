/* eslint-disable no-cond-assign */
import ComponentFactory from './ComponentFactory';
import { createElement } from './jsx';

export function parse(tpl) {
  // node = {tag, child, props }
  const re = new RegExp('<[^>]+>', 'g');
  let matches = null;
  const lifo = [];
  const all = [];
  let parent;

  while ((matches = re.exec(tpl)) !== null) {
    const element = {
      tag: '',
      selfClosed: false,
      customComponent: false,
      children: []
    };

    const tag = matches[0];
    element.selfClosed = tag.charAt(tag.length - 2) === '/';
    const endTag = tag.charAt(1) === '/';

    if (!endTag) {
      element.tag = tag.match(/<(\w+)/)[1];
      element.customComponent = /^[A-Z]/.test(element.tag);
    }

    if (element.selfClosed) {
      if (!parent) {
        all.push(element);
      } else {
        parent.children.push(element);
      }
    } else if (!endTag) {
      if (!parent) {
        all.push(element);
        parent = element;
      } else {
        parent.children.push(element);
        parent = element;
      }
      lifo.push(element);
    } else {
      lifo.pop(element);
      parent = lifo[lifo.length - 1] || null;
    }

    element.props = findProps(tag);

    // Find any textnodes
    const tagEndIndex = matches.index + tag.length;
    const startNextTagIndex = tpl.indexOf('<', tagEndIndex);
    if (startNextTagIndex > 0) {
      const text = tpl.substring(tagEndIndex, startNextTagIndex).trim();
      if (text) {
        parent.children.push({
          textNode: true,
          content: text
        });
      }
    }
  }

  return all;
}

function findProps(tpl) {
  const props = {};
  let prop = tpl.match(/((\w+)=\{([^{]+)\})/);

  while (prop) {
    props[prop[2]] = prop[3];

    tpl = tpl.substring(prop.index + prop[1].length);

    prop = tpl.match(/((\w+)=\{(.+)\})/);
  }

  return props;
}

export function stringify(ast, fnName = 'createElement') {
  const res = ast.map(element => {
    if (element.textNode) {
      return `'${element.content}'`;
    }

    const parts = [];
    parts.push(`${fnName}(`);
    parts.push(element.customComponent ? element.tag : `'${element.tag}'`);
    parts.push(`, {`);

    const props = Object.keys(element.props).map(propKey => {
      return `${propKey}: ${element.props[propKey]}`;
    });
    parts.push(props.join(', '));

    parts.push('}');
    if (element.children.length > 0) {
      parts.push(', ');
      parts.push(stringify(element.children, fnName));
    }
    parts.push(')');

    return parts.join('');
  });

  return res.join(', ');
}

function findPropsTpl(tpl, values, placeholder) {
  const props = {};
  let prop = tpl.match(/(([\w-]+)=\{([^{]+)\})/);

  while (prop) {
    props[prop[2]] = prop[3] === placeholder ? values.shift() : prop[3];

    tpl = tpl.substring(prop.index + prop[1].length);

    prop = tpl.match(/(([\w-]+)=\{(.+)\})/);
  }

  return props;
}

export function parseTpl(tpl, values, placeholder) {
  const re = new RegExp('<[^>]+>', 'g');
  let matches = null;
  const lifo = [];
  const all = [];
  let parent;

  while ((matches = re.exec(tpl)) !== null) {
    const element = {
      tag: '',
      tagLength: 0,
      selfClosed: false,
      customComponent: false,
      children: []
    };

    const tag = matches[0];
    element.selfClosed = tag.charAt(tag.length - 2) === '/';
    const endTag = tag.charAt(1) === '/';

    if (!endTag) {
      element.tag = tag.match(/<(\w+)/)[1];
      element.tagLength = element.tag.length;

      if (element.tag === placeholder) {
        element.tag = values.shift();
      }

      const customComponent = ComponentFactory.get(element.tag);
      if (customComponent) {
        element.customComponent = true;
        element.tag = customComponent;
      }
    }

    if (element.selfClosed) {
      if (!parent) {
        all.push(element);
      } else {
        parent.children.push(element);
      }
    } else if (!endTag) {
      if (!parent) {
        all.push(element);
        parent = element;
      } else {
        parent.children.push(element);
        parent = element;
      }
      lifo.push(element);
    } else {
      lifo.pop(element);
      parent = lifo[lifo.length - 1] || null;
    }

    element.props = findPropsTpl(
      tag.substring(element.tagLength + 1),
      values,
      placeholder
    );

    // Find any textnodes
    const tagEndIndex = matches.index + tag.length;
    const startNextTagIndex = tpl.indexOf('<', tagEndIndex);
    if (startNextTagIndex > 0) {
      const text = tpl.substring(tagEndIndex, startNextTagIndex).trim();
      if (text) {
        parent.children.push({
          textNode: true,
          content: text === placeholder ? values.shift() : text
        });
      }
    }
  }

  return all;
}

function buildComponents(ast) {
  return ast.map(element => {
    if (element.textNode) {
      return element.content;
    }

    return createElement(
      element.tag,
      element.props,
      ...buildComponents(element.children)
    );
  });
}

export function parseJSX(strings, ...vars) {
  const placeholder = '__tplValue__';
  const fullstr = strings.join(placeholder);

  const ast = parseTpl(fullstr, vars, placeholder);
  const components = buildComponents(ast);
  return components.length > 1 ? components : components[0];
}
