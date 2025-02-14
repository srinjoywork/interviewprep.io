import TextDiffBinding from "./TextDiffBinding";

class StringBinding extends TextDiffBinding {
  constructor(component, doc, path, localPresence) {
    super(component.editor, doc, path);
    this.compoThis = component;
    this.doc = doc;
    this.localPresence = localPresence;
  }

  setup = () => {
    if (!this.doc || !this.doc.data) {
      console.error("Document data is not available yet.");
      return;
    }

    this.update(true);

    let state = this.compoThis.state;
    let docData = this.doc.data;

    this.updateInputOutput(state.input, docData.input?.[0] || "", "input");
    this.updateInputOutput(state.output, docData.output?.[0] || "", "output");

    this.attachDoc();
    this.attachElement();
  };

  attachElement = () => {
    // Editor onChange listener
    this._inputListener = (newValue, e) => {
      if (!this.doc) {
        console.warn("Document not initialized, skipping input sync.");
        return;
      }
      this.onInput(newValue, e);
    };

    // I/O input onChange listener
    this._inoutListener = (before, after, key) => {
      if (!this.doc) {
        console.warn("Document not initialized, skipping I/O sync.");
        return;
      }
      this._insertInOut(before, after, key);
    };
  };

  attachDoc = () => {
    if (!this.doc) {
      console.warn("Cannot attach document listener: doc is undefined.");
      return;
    }
    this.doc.on("op", this.onListener);
  };

  onListener = (op, source) => {
    if (source === this) return;
    if (!op || op.length === 0) return;

    if (op.length > 1) {
      console.error("Op with multiple components emitted, expected only one.");
      return;
    }

    let component = op[0];

    if (["output", "input", "lang"].includes(component.p[0])) {
      this.updateInputOutput(component.ld, component.li, component.p[0]);
    } else if (this.isSubpath(this.path, component.p)) {
      this._parseInsertRemoveOp(component, "si", "onInsert");
      this._parseInsertRemoveOp(component, "sd", "onRemove");
    } else if (this.isSubpath(component.p, this.path)) {
      this._parseParentOp();
    }
  };

  _parseInsertRemoveOp(component, key, onHandler) {
    if (!component[key]) return;
    let rangeOffset = component.rangeOffset;
    let length = component[key].length;
    this[onHandler](rangeOffset, length);
  }

  _parseParentOp = () => {
    this.update();
  };

  _insertInOut = (before, after, key) => {
    if (!this.doc) {
      console.error("Cannot submit operation, document is undefined.");
      return;
    }
    let path = [key, 0];
    let op = { p: path, ld: before, li: after };
    this.doc.submitOp(op, { source: this });
  };

  isSubpath = (path, testPath) => {
    for (let i = 0; i < path.length; i++) {
      if (testPath[i] !== path[i]) return false;
    }
    return true;
  };

  updateInputOutput(before, after, key) {
    if (before === after || !this.compoThis) return;
    this.compoThis.setState({ [key]: after });
  }
}

export default StringBinding;
