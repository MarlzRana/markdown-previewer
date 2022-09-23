//Tells marked to include line breaks and to highlight javascript code
marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  },
});

//The editors initial default text
const initialEditorDefaultText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

//The main app
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: initialEditorDefaultText,
      isEditorExpanded: false,
      isPreviewerExpanded: false,
    };

    this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
    this.handleEditorExpandCompress =
      this.handleEditorExpandCompress.bind(this);
    this.handlePreviewerExpandCompress =
      this.handlePreviewerExpandCompress.bind(this);
  }

  handleMarkdownChange(e) {
    this.setState({
      markdown: e.target.value,
    });
  }

  handleEditorExpandCompress() {
    this.setState((prevState) => ({
      isEditorExpanded: !prevState.isEditorExpanded,
    }));
  }

  handlePreviewerExpandCompress() {
    this.setState((prevState) => ({
      isPreviewerExpanded: !prevState.isPreviewerExpanded,
    }));
  }

  render() {
    return /*#__PURE__*/ React.createElement(
      "div",
      { id: "app-internal" } /*#__PURE__*/,
      React.createElement(Editor, {
        markdown: this.state.markdown,
        handleMarkdownChange: this.handleMarkdownChange,
        isEditorExpanded: this.state.isEditorExpanded,
        isPreviewerExpanded: this.state.isPreviewerExpanded,
        handleEditorExpandCompress: this.handleEditorExpandCompress,
      }) /*#__PURE__*/,
      React.createElement(Previewer, {
        markdown: this.state.markdown,
        isEditorExpanded: this.state.isEditorExpanded,
        isPreviewerExpanded: this.state.isPreviewerExpanded,
        handlePreviewerExpandCompress: this.handlePreviewerExpandCompress,
      })
    );
  }
}

//The editor component
class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        id: "editor-window",
        style: this.props.isPreviewerExpanded
          ? { display: "none" }
          : this.props.isEditorExpanded
          ? { height: "100vh" }
          : {},
      } /*#__PURE__*/,
      React.createElement(
        "div",
        { id: "editor-header" } /*#__PURE__*/,
        React.createElement("i", {
          className: "fa-brands fa-free-code-camp",
        }) /*#__PURE__*/,
        React.createElement("h1", null, "Editor") /*#__PURE__*/,
        React.createElement("i", {
          className:
            "fas " +
            (this.props.isEditorExpanded ? "fa-compress" : "fa-expand"),
          onClick: this.props.handleEditorExpandCompress,
        })
      ) /*#__PURE__*/,

      React.createElement(
        "div",
        { id: "editor-input" } /*#__PURE__*/,
        React.createElement("textarea", {
          value: this.props.markdown,
          onChange: this.props.handleMarkdownChange,
          id: "editor",
        })
      )
    );
  }
}

//The Previewer component
class Previewer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/ React.createElement(
      "div",
      {
        id: "previewer",
        style: this.props.isEditorExpanded
          ? { display: "none" }
          : this.isPreviewerExpanded
          ? { height: "100vh" }
          : {},
      } /*#__PURE__*/,
      React.createElement(
        "div",
        { id: "previewer-header" } /*#__PURE__*/,
        React.createElement("i", {
          className: "fa-brands fa-free-code-camp",
        }) /*#__PURE__*/,
        React.createElement("h1", null, "Previewer") /*#__PURE__*/,
        React.createElement("i", {
          className:
            "fas " +
            (this.props.isPreviewerExpanded ? "fa-compress" : "fa-expand"),
          onClick: this.props.handlePreviewerExpandCompress,
        })
      ) /*#__PURE__*/,

      React.createElement("div", {
        id: "preview",
        dangerouslySetInnerHTML: { __html: marked.parse(this.props.markdown) },
      })
    );
  }
}

//Renders the main app to the DOM
ReactDOM.render(
  /*#__PURE__*/ React.createElement(App, null),
  document.getElementById("app")
);
