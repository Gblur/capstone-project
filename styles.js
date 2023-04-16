import {createGlobalStyle} from "styled-components";

export default createGlobalStyle`
  :root{
    --color-node-parent-bg: #ffd17d;
    --color-node-child-bg: #7dafff;
    --color-node-unbound-bg: #ffa8ba;
    --color-node-border: #f2f7f5;
    --color-node-border--selected:  #00332c;
    --color-node-text: #475d5b;
    --color-node-icon-success: #38fc41;
    --color-node-icon-pending: #ffef61;
    --color-node-icon-danger: #ff3838;
    --color-dashboard-border: #000;


  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: system-ui;
    padding: 50px;
  }
`;
