/* eslint-disable import/no-anonymous-default-export */

import Code from "../../components/Code";

export default {
  render: Code,
  attributes: {
    language: {
      type: String,
      description:
        "The programming language of the code block. Place it after the backticks.",
    },
  },
};
